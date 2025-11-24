/**
 * Micromark tool class.
 */

// Dependencies - Micromark.
import { micromark } from 'micromark';
import type { CompileContext, HtmlExtension, Options, Token } from 'micromark-util-types';

// Dependencies - Speed Highlight.
import type * as SpeedHighlight from '@speed-highlight/core';

// Types/Interfaces
type RenderOptions = { tables?: boolean };

// Constants
const ESCAPE_MAP: Record<'&' | '<' | '>' | '"' | "'", string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };

// Module Variables
let tableExtensionIsLoaded: boolean = false;
let tableExtensionPromise: Promise<void> | undefined = undefined;
let speedHighlight: typeof SpeedHighlight | undefined = undefined;
let speedHighlightPromise: Promise<typeof SpeedHighlight> | undefined = undefined;

// Classes - Micromark tool.
class MicromarkTool {
    private readonly options: Options;

    constructor() {
        this.options = {
            allowDangerousHtml: false,
            allowDangerousProtocol: false,
            extensions: [],
            htmlExtensions: [createPresenterCodeBlockHtmlExtension()]
        };
    }

    // Operations - Highligh previously rendered markdown.
    async highlight(renderTo: HTMLElement, colorModeId: string): Promise<void> {
        if (typeof document === 'undefined') return;

        const { highlightElement } = await loadSpeedHighlight(colorModeId);

        renderTo.querySelectorAll<HTMLDivElement>('div[class^="shj-lang-"]').forEach((element) => {
            const lang = (/shj-lang-([^\s]+)/.exec(element.className) || [])[1];
            if (lang === 'javascript') {
                highlightElement(element, 'js', 'multiline', { hideLineNumbers: true });
                Object.assign(element.style, {
                    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, Liberation Mono, monospace",
                    fontSize: '16px'
                });
            }
        });
    }

    // Operations - Render markdown.
    async render(markdown: string, options?: RenderOptions): Promise<string> {
        if (options?.tables ?? false) {
            if (!tableExtensionIsLoaded && !tableExtensionPromise) {
                tableExtensionPromise = (async (): Promise<void> => {
                    const module = await import('micromark-extension-gfm-table');
                    this.options.extensions?.push(module.gfmTable());
                    this.options.htmlExtensions?.push(module.gfmTableHtml());
                    tableExtensionIsLoaded = true;
                    tableExtensionPromise = undefined;
                })();
            }
            await tableExtensionPromise;
        }
        return micromark(markdown, this.options);
    }

    // Operations - Set color mode.
    setColorMode(colorModeId: string): void {
        applyColorMode(colorModeId);
    }
}

// Helper - Apply color mode.
function applyColorMode(colorModeId: string): void {
    if (typeof document === 'undefined') return;

    const styleId = colorModeId === 'dark' ? 'theme-dark' : 'theme-light';
    document.querySelectorAll<HTMLStyleElement>('style[data-dynamic]').forEach((style) => (style.disabled = style.id !== styleId));
}

// Helpers - Create presenter code block.
function createPresenterCodeBlockHtmlExtension(): HtmlExtension {
    let currentBlockData: { codeContent: string[]; lang: string; meta: string } | undefined = undefined;
    return {
        enter: {
            codeFenced(this: CompileContext): undefined /* The entire fenced code block starts. */ {
                this.buffer();
                currentBlockData = { codeContent: [], lang: '', meta: '' };
            },
            codeFencedFence(): undefined /* The opening fence line. */ {},
            codeFencedFenceSequence(): undefined /* The opening fence characters (```). */ {},
            codeFencedFenceInfo(this: CompileContext, token: Token): undefined /* The language identifier (json, javascript...). */ {
                if (currentBlockData !== undefined) currentBlockData.lang = this.sliceSerialize(token);
            },
            codeFencedFenceMeta(this: CompileContext, token: Token): undefined /* The metadata after the language identifier (datapos-visual). */ {
                if (currentBlockData !== undefined) currentBlockData.meta = this.sliceSerialize(token);
            },
            codeFlowValue(this: CompileContext, token: Token): undefined /* Each line/chunk of actual code content. */ {
                if (currentBlockData !== undefined) currentBlockData.codeContent.push(this.sliceSerialize(token));
            }
        },
        exit: {
            codeFlowValue(): undefined /*  Done capturing the code. */ {},
            codeFencedFenceMeta(): undefined /* Done processing the metadata. */ {},
            codeFencedFenceInfo(): undefined /* Done processing the language identifier. */ {},
            codeFencedFenceSequence(): undefined /* The closing fence characters (```). */ {},
            codeFencedFence(): undefined /* The closing fence line. */ {},
            codeFenced(this: CompileContext): undefined /* The entire code block is complete, replacement can happen now. */ {
                const blockData = currentBlockData ?? { codeContent: [], lang: '', meta: '' };
                this.resume(); // Discard the captured code text.
                const rawContent = blockData.codeContent.join('\n');
                const language = blockData.lang || 'plain';
                const metaAttr = blockData.meta || '';
                let html = '';
                if (language === 'json' && metaAttr === 'datapos-visual') {
                    html = `<div class="${metaAttr}" data-options="${encodeURIComponent(rawContent)}"></div>`;
                } else if (language === 'json' && metaAttr === 'datapos-highcharts') {
                    html = `<div class="${metaAttr}" data-options="${encodeURIComponent(rawContent)}"></div>`;
                } else {
                    const safeLang = language.replaceAll(/[^a-z0-9_-]/gi, '');
                    html = `<div class="shj-lang-${safeLang}">${escapeHTML(rawContent)}</div>`;
                }
                this.raw(html);
                currentBlockData = undefined;
            }
        }
    };
}

// Helpers - Escape HTML.
function escapeHTML(str: string): string {
    return str.replaceAll(/[&<>"']/g, (char) => ESCAPE_MAP[char as '&' | '<' | '>' | '"' | "'"]);
}

// Helpers - Inject style.
function injectStyle(cssText: string, styleId: string): void {
    if (typeof document === 'undefined') return;

    let style = document.getElementById(styleId) as HTMLStyleElement | null;
    if (style == null) {
        style = document.createElement('style');
        style.id = styleId;
        style.dataset.dynamic = 'true';
        document.head.appendChild(style);
    }
    style.innerHTML = cssText;
    style.disabled = true; // Need to set this after style is injected.
}

// Helpers - Load Speed Highlight and inject associated themes.
async function loadSpeedHighlight(colorModeId: string): Promise<typeof SpeedHighlight> {
    if (speedHighlight) return speedHighlight;

    const [module, darkThemeCss, lightThemeCss] = await Promise.all([
        import('@speed-highlight/core'),
        import('@speed-highlight/core/themes/github-dark.css?raw'),
        import('@speed-highlight/core/themes/github-light.css?raw')
    ]);
    speedHighlight = module;
    injectStyle(darkThemeCss.default, 'theme-dark');
    injectStyle(lightThemeCss.default, 'theme-light');
    applyColorMode(colorModeId);
    return speedHighlight;
}

export { MicromarkTool, type RenderOptions };
