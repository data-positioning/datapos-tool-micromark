/**
 * Micromark tool class.
 */

// Dependencies - Micromark.
import { micromark } from 'micromark';
import type { CompileContext, HtmlExtension, Options, Token } from 'micromark-util-types';
import { gfm, gfmHtml } from 'micromark-extension-gfm'; // Adds 21.2KB when gzipped. Base 79.16KB.
import { math, mathHtml } from 'micromark-extension-math'; // Adds 148.88KB when gzipped. Base 79.16KB.

// Dependencies - Prism.
import 'prismjs/components/prism-json.js';
import Prism from 'prismjs';

// Types/Interfaces
interface PresenterCompileContext extends CompileContext {
    _blockData: { codeContent: string[]; lang: string; meta: string };
}

// Constants
const ESCAPE_MAP: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };

// Classes - Micromark tool.
export default class MicromarkTool {
    private options: Options;

    constructor() {
        this.options = {
            allowDangerousHtml: false,
            extensions: [gfm(), math()],
            htmlExtensions: [gfmHtml(), mathHtml(), this.createPresenterCodeBlockHtmlExtension()]
        };
    }

    // Operations - Render.
    render(markdown: string): string {
        return micromark(markdown, this.options);
    }

    // Utilities - Create presenter code block.
    private createPresenterCodeBlockHtmlExtension(): HtmlExtension {
        return {
            enter: {
                codeFenced(this: any) /* The entire fenced code block starts. */ {
                    let blockData: { codeContent: string[]; lang: string; meta: string } = { codeContent: [], lang: '', meta: '' };
                    this.buffer();
                    blockData = { codeContent: [], lang: '', meta: '' }; // Temporary state for this fenced code block.

                    this.enterCodeFencedFence = () => /* The opening fence line. */ {};
                    this.enterCodeFencedFenceSequence = () => /* The opening fence characters (```). */ {};
                    this.codeFencedFenceInfo = (token: Token) => /* The language identifier (json, javascript...). */ {
                        blockData.lang = this.sliceSerialize(token);
                    };
                    this.enterCodeFencedFenceMeta = (token: Token) => /* The metadata after the language identifier (datapos-visual). */ {
                        blockData.meta = this.sliceSerialize(token);
                    };
                    this.enterCodeFlowValue = (token: Token) => /* Each line/chunk of actual code content. */ {
                        blockData.codeContent.push(this.sliceSerialize(token));
                    };
                    this.exitCodeFlowValue = () => /*  Done capturing the code. */ {};
                    this.exitCodeFencedFenceMeta = () => /* Done processing the metadata. */ {};
                    this.exitCodeFencedFenceInfo = () => /* Done processing the language identifier. */ {};
                    this.exitCodeFencedFenceSequence = () => /* The closing fence characters (```). */ {};
                    this.exitCodeFencedFence = () => /* The closing fence line. */ {};
                    this.exitCodeFenced = () => /* The entire code block is complete, replacement can happen now. */ {
                        const { codeContent, lang, meta } = blockData || { codeContent: [], lang: '', meta: '' };
                        this.resume(); // Discard the captured code text.
                        const rawContent = codeContent.join('\n');
                        const language = lang || 'plain';
                        const metaAttr = meta || '';
                        let html = '';
                        if (language === 'json' && metaAttr === 'datapos-visual') {
                            html = `<div class="${metaAttr}" data-options="${encodeURIComponent(rawContent)}"></div>`;
                        } else if (Prism.languages[language]) {
                            const highlighted = Prism.highlight(rawContent, Prism.languages[language], language);
                            html = `<pre class="language-${language}"><code>${highlighted}</code></pre>`;
                        } else {
                            const escaped = rawContent.replace(/[&<>"']/g, (char: string) => ESCAPE_MAP[char]);
                            html = `<pre class="language-text"><code>${escaped}</code></pre>`;
                        }
                        this.raw(html);
                        this._blockData = undefined;
                    };
                }
            }
        };
    }
}
