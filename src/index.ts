/**
 * Micromark tool class.
 */

// Dependencies - Micromark.
import { micromark } from 'micromark';
import type { CompileContext, HtmlExtension, Options, Token } from 'micromark-util-types';
import { gfm, gfmHtml } from 'micromark-extension-gfm'; // Adds 21.2KB when gzipped. Base 79.16KB.
import { math, mathHtml } from 'micromark-extension-math'; // Adds 148.88KB when gzipped. Base 79.16KB.

// Dependencies - Prism.
import Prism from 'prismjs';

// Dependencies - Prism languages. Must be after Prism import.
// import 'prismjs/components/prism-json.js'; // TODO: Example usage if required in the future.

// Constants
const ESCAPE_MAP: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };

// // Initialisation
// if (typeof document !== 'undefined' && !document.querySelector('link[data-katex]')) {
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css';
//     link.dataset.katex = 'true';
//     document.head.appendChild(link);
// }

// Classes - Micromark tool.
class MicromarkTool {
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
        let currentBlockData: { codeContent: string[]; lang: string; meta: string } | undefined = undefined;
        return {
            enter: {
                codeFenced(this: CompileContext) /* The entire fenced code block starts. */ {
                    this.buffer();
                    currentBlockData = { codeContent: [], lang: '', meta: '' };
                },
                codeFencedFence() /* The opening fence line. */ {},
                codeFencedFenceSequence() /* The opening fence characters (```). */ {},
                codeFencedFenceInfo(this: CompileContext, token: Token) /* The language identifier (json, javascript...). */ {
                    if (currentBlockData) currentBlockData.lang = this.sliceSerialize(token);
                },
                codeFencedFenceMeta(this: CompileContext, token: Token) /* The metadata after the language identifier (datapos-visual). */ {
                    if (currentBlockData) currentBlockData.meta = this.sliceSerialize(token);
                },
                codeFlowValue(this: CompileContext, token: Token) /* Each line/chunk of actual code content. */ {
                    if (currentBlockData) currentBlockData.codeContent.push(this.sliceSerialize(token));
                }
            },
            exit: {
                codeFlowValue() /*  Done capturing the code. */ {},
                codeFencedFenceMeta() /* Done processing the metadata. */ {},
                codeFencedFenceInfo() /* Done processing the language identifier. */ {},
                codeFencedFenceSequence() /* The closing fence characters (```). */ {},
                codeFencedFence() /* The closing fence line. */ {},
                codeFenced(this: CompileContext) /* The entire code block is complete, replacement can happen now. */ {
                    const blockData = currentBlockData || { codeContent: [], lang: '', meta: '' };
                    this.resume(); // Discard the captured code text.
                    const rawContent = blockData.codeContent.join('\n');
                    const language = blockData.lang || 'plain';
                    const metaAttr = blockData.meta || '';
                    let html = '';
                    if (language === 'json' && metaAttr === 'datapos-visual') {
                        html = `<div class="${metaAttr}" data-options="${encodeURIComponent(rawContent)}"></div>`;
                    } else if (Prism?.languages[language]) {
                        const highlighted = Prism.highlight(rawContent, Prism.languages[language], language);
                        html = `<pre class="language-${language}"><code>${highlighted}</code></pre>`;
                    } else {
                        const escaped = rawContent.replace(/[&<>"']/g, (char: string) => ESCAPE_MAP[char]);
                        html = `<pre class="language-text"><code>${escaped}</code></pre>`;
                    }
                    this.raw(html);
                    currentBlockData = undefined;
                }
            }
        };
    }
}

export { MicromarkTool };
