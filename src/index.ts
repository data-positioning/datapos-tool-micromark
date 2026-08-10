// ── External Dependencies & Registrations
import type * as SpeedHighlight from '@speed-highlight/core';
import type { Directive } from 'micromark-extension-directive';
import { micromark } from 'micromark';
import type { CompileContext, Extension, HtmlExtension, Token } from 'micromark-util-types';

// ── Local Framework
import { generateMathML } from '@/formula';

// ── Types ────────────────────────────────────────────────────────────────────────────────────────────────────────────

interface LoadedExtension {
    extension: Extension;
    htmlExtension: HtmlExtension;
}

export interface RenderOptions {
    directives?: boolean;
    tables?: boolean;
}

// ── Constants ────────────────────────────────────────────────────────────────────────────────────────────────────────

const ESCAPE_MAP: Record<'&' | '<' | '>' | '"' | "'", string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };

// ── State ────────────────────────────────────────────────────────────────────────────────────────────────────────────

const codeBlockHTMLExtension = createCodeBlockHtmlExtension();

const state = {
    colorModeId: 'light',
    darkThemeCssText: undefined as string | undefined,
    directiveExtensionPromise: undefined as Promise<LoadedExtension> | undefined,
    lightThemeCssText: undefined as string | undefined,
    speedHighlight: undefined as typeof SpeedHighlight | undefined,
    speedHighlightPromise: undefined as Promise<typeof SpeedHighlight> | undefined,
    tableExtensionPromise: undefined as Promise<LoadedExtension> | undefined
};

// ── Tools ────────────────────────────────────────────────────────────────────────────────────────────────────────────

export class MicromarkTool {
    // ── Actions ──────────────────────────────────────────────────────────────────────────────────────────────────────

    // Highligh previously rendered markdown.
    // colorModeId is accepted as a parameter (rather than relying solely on setColorMode() having been called
    // already) because this tool instance can be created after the caller's color mode is known, so state's
    // 'light' default may be stale until it is explicitly given the current value here.
    async highlight(renderTo: HTMLElement, colorModeId: string): Promise<void> {
        if (typeof document === 'undefined') return;

        state.colorModeId = colorModeId;
        const { highlightElement } = await loadSpeedHighlight();
        applyColorMode();

        for (const element of renderTo.querySelectorAll<HTMLDivElement>('div[class^="shj-lang-"]')) {
            const lang = (/shj-lang-(\S+)/.exec((element as HTMLElement).className) ?? [])[1];
            if (lang === 'javascript') {
                await highlightElement(element, 'js', 'multiline', { hideLineNumbers: true });
                Object.assign((element as HTMLElement).style, {
                    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, Liberation Mono, monospace",
                    fontSize: '14px'
                });
            }
        }
    }

    // Render markdown.
    async render(markdown: string, options?: RenderOptions): Promise<string> {
        const extensions: Extension[] = [];
        const htmlExtensions: HtmlExtension[] = [codeBlockHTMLExtension];

        if (options?.directives ?? false) {
            state.directiveExtensionPromise ??= (async (): Promise<LoadedExtension> => {
                const module = await import('micromark-extension-directive');
                return { extension: module.directive(), htmlExtension: module.directiveHtml({ note: handleNoteDirective }) };
            })();
            const { extension, htmlExtension } = await state.directiveExtensionPromise;
            extensions.push(extension);
            htmlExtensions.push(htmlExtension);
        }
        if (options?.tables ?? false) {
            state.tableExtensionPromise ??= (async (): Promise<LoadedExtension> => {
                const module = await import('micromark-extension-gfm-table');
                return { extension: module.gfmTable(), htmlExtension: module.gfmTableHtml() };
            })();
            const { extension, htmlExtension } = await state.tableExtensionPromise;
            extensions.push(extension);
            htmlExtensions.push(htmlExtension);
        }

        return micromark(markdown, { allowDangerousHtml: false, allowDangerousProtocol: false, extensions, htmlExtensions });
    }

    // Set color mode.
    // Lets a caller update already-highlighted code blocks' theme (e.g. on a theme toggle) without a full
    // render()/highlight() pass; see highlight() above for why colorModeId isn't just read from state instead.
    setColorMode(colorModeId: string): void {
        state.colorModeId = colorModeId;
        applyColorMode();
    }
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────────────────────────────

function escapeHTML(string_: string): string {
    return string_.replaceAll(/[&<>"']/g, (char) => ESCAPE_MAP[char as '&' | '<' | '>' | '"' | "'"]);
}

// ── Helpers - Code Block HTML Extension ──────────────────────────────────────────────────────────────────────────────

function createCodeBlockHtmlExtension(): HtmlExtension {
    let currentBlockData: { codeContent: string[]; lang: string } | undefined;
    /* eslint-disable unicorn/no-this-outside-of-class --
       micromark's `Handle` type requires handlers typed as `this: CompileContext`; the CompileContext is passed via
       dynamic `this` binding (micromark calls `handler.call(compileContext, token)`), not through a class. */
    return {
        enter: {
            codeFenced(this: CompileContext): undefined /* The entire fenced code block starts. */ {
                this.buffer();
                currentBlockData = { codeContent: [], lang: '' };
            },
            codeFencedFence(): undefined /* The opening fence line. */ {
                /* empty */
            },
            codeFencedFenceSequence(): undefined /* The opening fence characters (```). */ {
                /* empty */
            },
            codeFencedFenceInfo(this: CompileContext, token: Token): undefined /* The language identifier (visual, formula, highcharts, javascript...). */ {
                if (currentBlockData !== undefined) currentBlockData.lang = this.sliceSerialize(token);
            },
            codeFencedFenceMeta(): undefined /* Any text after the language identifier; unused, but still suppressed like the other fence tokens below. */ {
                /* empty */
            },
            codeFlowValue(this: CompileContext, token: Token): undefined /* Each line/chunk of actual code content. */ {
                if (currentBlockData !== undefined) currentBlockData.codeContent.push(this.sliceSerialize(token));
            }
        },
        exit: {
            codeFlowValue(): undefined /*  Done capturing the code. */ {
                /* empty */
            },
            codeFencedFenceMeta(): undefined /* Done processing the metadata. */ {
                /* empty */
            },
            codeFencedFenceInfo(): undefined /* Done processing the language identifier. */ {
                /* empty */
            },
            codeFencedFenceSequence(): undefined /* The closing fence characters (```). */ {
                /* empty */
            },
            codeFencedFence(): undefined /* The closing fence line. */ {
                /* empty */
            },
            codeFenced(this: CompileContext): undefined /* The entire code block is complete, replacement can happen now. */ {
                const blockData = currentBlockData ?? { codeContent: [], lang: '' };
                this.resume(); // Discard the captured code text.
                const rawContent = blockData.codeContent.join('\n');
                const language = blockData.lang || 'plain';
                let html = '';
                // visual/formula/highcharts are top-level block types (```visual, not ```json dpuse-visual); every
                // other language, including plain json, falls through to default syntax highlighting.
                switch (language) {
                    case 'visual':
                        html = `<div class="dpuse-visual" data-options="${encodeURIComponent(rawContent)}"></div>`;
                        break;
                    case 'formula':
                        try {
                            const v1 = JSON.parse(rawContent) as { expression: string };
                            html = generateMathML(v1.expression);
                        } catch {
                            html = `<div class="dpuse-formula-error">${escapeHTML(rawContent)}</div>`;
                        }
                        break;
                    case 'highcharts':
                        html = `<div class="dpuse-highcharts" data-options="${encodeURIComponent(rawContent)}"></div>`;
                        break;
                    default: {
                        const safeLang = language.replaceAll(/[^\w-]/g, '');
                        html = `<div class="shj-lang-${safeLang}">${escapeHTML(rawContent)}</div>`;
                    }
                }
                this.raw(html);
                currentBlockData = undefined;
            }
        }
    };
    /* eslint-enable unicorn/no-this-outside-of-class --
       end of the micromark `this: CompileContext` handler shim */
}

// ── Helpers - Note Directive ─────────────────────────────────────────────────────────────────────────────────────────

/* eslint-disable unicorn/no-this-outside-of-class --
   micromark's `Handle` type requires handlers typed as `this: CompileContext`; see createChartHtmlExtension. */
function handleNoteDirective(this: CompileContext, directive: Directive): boolean | undefined {
    if (directive.type !== 'leafDirective') return false;

    this.tag('<p class="note">');
    this.raw(escapeHTML(directive.label ?? ''));
    this.tag('</p>');
}
/* eslint-enable unicorn/no-this-outside-of-class --
   end of the micromark `this: CompileContext` handler shim */

// ── Helpers - Theme ──────────────────────────────────────────────────────────────────────────────────────────────────

function applyColorMode(): void {
    if (typeof document === 'undefined') return;

    const cssText = state.colorModeId === 'dark' ? state.darkThemeCssText : state.lightThemeCssText;
    if (cssText === undefined) return; // Not loaded yet; loadSpeedHighlight() will call applyColorMode() again once it is.

    injectStyle(cssText);
}

// Prod CSP has no 'unsafe-inline' for style-src, so the theme CSS is loaded as a blob: stylesheet instead of an
// inline <style> element. dpuse-app's _headers allows style-src 'blob:' for this — a stable, one-time CSP
// allowance that needs no updating if @speed-highlight/core's theme CSS changes.
// A single link element is swapped between the dark/light blob URLs, rather than two links toggled via `disabled`,
// so there is never a moment where neither or both themes are the one actually applied.
function injectStyle(cssText: string): void {
    if (typeof document === 'undefined') return;

    // eslint-disable-next-line n/no-unsupported-features/node-builtins -- browser-only path (the `typeof document` guard above returns early under Node).
    const blobUrl = URL.createObjectURL(new Blob([cssText], { type: 'text/css' }));
    let link = document.querySelector<HTMLLinkElement>('#dpuse-code-theme');
    const previousBlobUrl = link?.href;
    if (link == null) {
        link = document.createElement('link');
        link.id = 'dpuse-code-theme';
        link.rel = 'stylesheet';
        document.head.append(link);
    }
    link.href = blobUrl;
    if (previousBlobUrl) {
        // eslint-disable-next-line n/no-unsupported-features/node-builtins -- browser-only path (the `typeof document` guard above returns early under Node).
        URL.revokeObjectURL(previousBlobUrl);
    }
}

// Load Speed Highlight and inject associated themes.
async function loadSpeedHighlight(): Promise<typeof SpeedHighlight> {
    if (state.speedHighlight) return state.speedHighlight;

    state.speedHighlightPromise ??= (async (): Promise<typeof SpeedHighlight> => {
        const [module, darkThemeCss, lightThemeCss] = await Promise.all([
            import('@speed-highlight/core'),
            import('@speed-highlight/core/themes/github-dark.css?raw'),
            import('@speed-highlight/core/themes/github-light.css?raw')
        ]);
        state.speedHighlight = module;
        state.darkThemeCssText = darkThemeCss.default;
        state.lightThemeCssText = lightThemeCss.default;
        applyColorMode();
        state.speedHighlightPromise = undefined;
        return module;
    })();

    return state.speedHighlightPromise;
}
