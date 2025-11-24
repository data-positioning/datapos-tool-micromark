/**
 * Micromark tool class.
 */

// Dependencies - Micromark.
import { micromark } from 'micromark';
import type { CompileContext, HtmlExtension, Options, Token } from 'micromark-util-types';
import { gfmTable, gfmTableHtml } from 'micromark-extension-gfm-table'; // Adds 21.2KB when gzipped. Base 79.16KB.

// Dependencies - Speed Highlight.
import darkThemeCss from '@speed-highlight/core/themes/github-dark.css?raw';
import { highlightElement } from '@speed-highlight/core';
import lightThemeCss from '@speed-highlight/core/themes/github-light.css?raw';

// Constants
const ESCAPE_MAP: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };

// Classes - Micromark tool.
class MicromarkTool {
    private readonly options: Options;
    private readonly themeIds = { light: 'theme-light', dark: 'theme-dark' };
    private readonly themeCss = { light: lightThemeCss, dark: darkThemeCss };

    constructor() {
        this.options = {
            allowDangerousHtml: false,
            extensions: [gfmTable()],
            htmlExtensions: [gfmTableHtml(), this.createPresenterCodeBlockHtmlExtension()]
        };
        // Inject inline styles
        this.injectThemes();
        this.injectCodeFont();

        // Apply preferred theme immediately to prevent flicker
        // this.setColorMode(getPreferredTheme());
    }

    private injectCodeFont() {
        injectStyle("@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');", 'code-font');
    }

    // Operations - Render.
    render(markdown: string): string {
        return micromark(markdown, this.options);
    }

    highlight(): void {
        document.querySelectorAll<HTMLDivElement>('div[class^="shj-lang-"]').forEach((elm) => {
            const lang = (/shj-lang-([^\s]+)/.exec(elm.className) || [])[1];
            if (lang) {
                highlightElement(elm, 'js', 'multiline', { hideLineNumbers: true });
                elm.style.setProperty('font-family', "'Fira Code', 'Fira Mono', monospace", 'important');
            }
        });
    }

    setColorMode(colorModeId: 'light' | 'dark') {
        const id = (colorModeId === 'light' ? this.themeIds.light : this.themeIds.dark) as 'theme-light' | 'theme-dark';
        switchInlineTheme(id);
    }

    private injectThemes() {
        // Inject both themes as <style>, but one disabled
        injectStyle(this.themeCss.light, this.themeIds.light);
        injectStyle(this.themeCss.dark, this.themeIds.dark);
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
}

function escapeHtml(str: string): string {
    return str.replaceAll(/[&<>"']/g, (char) => ESCAPE_MAP[char]);
}

function injectStyle(cssText: string, id: string): HTMLStyleElement | undefined {
    if (typeof document === 'undefined') return;
    let style = document.getElementById(id) as HTMLStyleElement | null;
    if (!style) {
        style = document.createElement('style');
        style.id = id;
        style.dataset.dynamic = 'true';
        document.head.appendChild(style);
    }
    style.innerHTML = cssText;
    return style;
}

function switchInlineTheme(id: 'theme-light' | 'theme-dark') {
    document.querySelectorAll<HTMLStyleElement>('style[data-dynamic]').forEach((style) => {
        style.disabled = style.id !== id;
    });
}

// function getPreferredTheme(): 'light' | 'dark' {
//     if (globalThis.window === undefined) return 'light';
//     return globalThis.window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
// }

export { MicromarkTool };
