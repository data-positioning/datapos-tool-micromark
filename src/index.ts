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
type BlockData = { codeContent: string[]; lang: string; meta: string };

// Constants
const ESCAPE_MAP: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };

// Classes - Micromark tool.
export default class MicromarkTool {
    private options: Options;
    private blockDataMap = new WeakMap<CompileContext, BlockData>();
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
        const map = this.blockDataMap;
        return {
            enter: {
                codeFenced(this: PresenterCompileContext) /* The entire fenced code block starts. */ {
                    console.log(1111);
                    this.buffer();
                    // this._blockData = { codeContent: [], lang: '', meta: '' }; // Temporary state for this fenced code block.
                    // console.log(1111, this._blockData);
                    map.set(this, { codeContent: [], lang: '', meta: '' });
                },
                codeFencedFence() /* The opening fence line. */ {},
                codeFencedFenceSequence() /* The opening fence characters (```). */ {},
                codeFencedFenceInfo(this: PresenterCompileContext, token: Token) /* The language identifier (json, javascript...). */ {
                    console.log(2222, this._blockData);
                    const data = map.get(this)!;
                    data.lang = this.sliceSerialize(token);
                },
                codeFencedFenceMeta(this: PresenterCompileContext, token: Token) /* The metadata after the language identifier (datapos-visual). */ {
                    const data = map.get(this)!;
                    data.meta = this.sliceSerialize(token);
                },
                codeFlowValue(this: PresenterCompileContext, token: Token) /* Each line/chunk of actual code content. */ {
                    console.log(4444);
                    const data = map.get(this)!;
                    data.codeContent.push(this.sliceSerialize(token));
                }
            },
            exit: {
                codeFlowValue() /*  Done capturing the code. */ {},
                codeFencedFenceMeta() /* Done processing the metadata. */ {},
                codeFencedFenceInfo() /* Done processing the language identifier. */ {},
                codeFencedFenceSequence() /* The closing fence characters (```). */ {},
                codeFencedFence() /* The closing fence line. */ {},
                codeFenced(this: PresenterCompileContext) /* The entire code block is complete, replacement can happen now. */ {
                    // const { codeContent, lang, meta } = this._blockData || { codeContent: [], lang: '', meta: '' };
                    const data = map.get(this)!;
                    this.resume(); // Discard the captured code text.
                    const rawContent = data.codeContent.join('\n');
                    const language = data.lang || 'plain';
                    const metaAttr = data.meta || '';
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
                }
            }
        };
    }
}
