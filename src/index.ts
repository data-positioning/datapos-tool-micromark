/**
 * Micromark tool class.
 */

// Dependencies - Micromark.
import { micromark } from 'micromark';
import type { CompileContext, Extension, HtmlExtension, Options, Token } from 'micromark-util-types';

// Dependencies - Speed Highlight.
import darkThemeCss from '@speed-highlight/core/themes/github-dark.css?raw';
import { highlightElement } from '@speed-highlight/core';
import lightThemeCss from '@speed-highlight/core/themes/github-light.css?raw';

// Types/Interfaces
type GFMTableExtensions = { parseExtension: Extension; htmlExtension: HtmlExtension };
type RenderOptions = { tables?: boolean };

// Constants
const ESCAPE_MAP: Record<'&' | '<' | '>' | '"' | "'", string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };

// Module Variables
let gfmTableExtensions: GFMTableExtensions | undefined = undefined;
const themeIds = { light: 'theme-light', dark: 'theme-dark' };
let themesAreInjected = false;

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

        // Inject inline styles
        ensureThemesAreInjected();
    }

    // Operations - Highligh previously rendered markdown.
    highlight(): void {
        document.querySelectorAll<HTMLDivElement>('div[class^="shj-lang-"]').forEach((element) => {
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
        const extensions = [...(this.options.extensions ?? [])];
        const htmlExtensions = [...(this.options.htmlExtensions ?? [])];

        // Lazy load tables if requested
        if (options?.tables ?? false) {
            const tableExtensions = await loadGFMTableExtension();
            extensions.push(tableExtensions.parseExtension);
            htmlExtensions.push(tableExtensions.htmlExtension);
        }

        return micromark(markdown, { ...this.options, extensions, htmlExtensions });
    }

    // Operations - Set color mode.
    setColorMode(colorModeId: 'light' | 'dark'): void {
        const id = (colorModeId === 'light' ? themeIds.light : themeIds.dark) as 'theme-light' | 'theme-dark';
        switchInlineTheme(id);
    }
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
                    html = `<div class="shj-lang-${safeLang}">${escapeHtml(rawContent)}</div>`;
                }
                this.raw(html);
                currentBlockData = undefined;
            }
        }
    };
}

// Helpers - Ensure themes are injected.
function ensureThemesAreInjected(): void {
    if (themesAreInjected) return;
    injectStyle(lightThemeCss, 'theme-light');
    injectStyle(darkThemeCss, 'theme-dark');
    themesAreInjected = true;
}

// Helpers - Escape HTML.
function escapeHtml(str: string): string {
    return str.replaceAll(/[&<>"']/g, (char) => ESCAPE_MAP[char as '&' | '<' | '>' | '"' | "'"]);
}

// Helpers - Inject style.
function injectStyle(cssText: string, id: string): HTMLStyleElement | undefined {
    if (typeof document === 'undefined') return;
    let style = document.getElementById(id) as HTMLStyleElement | null;
    if (style == null) {
        style = document.createElement('style');
        style.id = id;
        style.dataset.dynamic = 'true';
        document.head.appendChild(style);
    }
    style.innerHTML = cssText;
    return style;
}

// Helpers - Load GFM (GitHub Flavoured Markdown) table extension.
async function loadGFMTableExtension(): Promise<GFMTableExtensions> {
    if (gfmTableExtensions !== undefined) return gfmTableExtensions;

    const module = await import('micromark-extension-gfm-table');
    gfmTableExtensions = { parseExtension: module.gfmTable(), htmlExtension: module.gfmTableHtml() };
    return gfmTableExtensions;
}

// Helpers - Switch inline theme.
function switchInlineTheme(id: 'theme-light' | 'theme-dark'): void {
    document.querySelectorAll<HTMLStyleElement>('style[data-dynamic]').forEach((style) => (style.disabled = style.id !== id));
}

export { MicromarkTool, type RenderOptions };
