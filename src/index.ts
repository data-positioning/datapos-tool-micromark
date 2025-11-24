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
const micromarkOptions: Options = {
    allowDangerousHtml: false,
    allowDangerousProtocol: false,
    extensions: [],
    htmlExtensions: [createPresenterCodeBlockHtmlExtension()]
};
let tableExtensionIsLoaded: boolean = false;
let tableExtensionPromise: Promise<void> | undefined = undefined;
let speedHighlight: typeof SpeedHighlight | undefined = undefined;
let speedHighlightPromise: Promise<typeof SpeedHighlight> | undefined = undefined;

// Classes - Micromark tool.
class MicromarkTool {
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
                    fontSize: '14px'
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
                    micromarkOptions.extensions?.push(module.gfmTable());
                    micromarkOptions.htmlExtensions?.push(module.gfmTableHtml());
                    tableExtensionIsLoaded = true;
                    tableExtensionPromise = undefined;
                })();
            }
            if (tableExtensionPromise) await tableExtensionPromise;
        }
        return micromark(markdown, micromarkOptions);
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
                if (language === 'json') {
                    if (metaAttr === 'datapos-visual') {
                        html = `<div class="${metaAttr}" data-options="${encodeURIComponent(rawContent)}"></div>`;
                    } else if (metaAttr === 'datapos-formula') {
                        // html = `<div class="${metaAttr}"><math display="block"><mrow><mi>Termination Rate</mi><mo>=</mo><mrow><mfrac><mi>Average Headcount</mi><mi>Terminations</mi></mfrac><mo>×</mo><mn>100</mn></mrow></mrow></math></div>`;

                        const v1 = JSON.parse(rawContent);
                        html = exprToMathML(v1.expression);
                    } else if (metaAttr === 'datapos-highcharts') {
                        html = `<div class="${metaAttr}" data-options="${encodeURIComponent(rawContent)}"></div>`;
                    }
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

type NumberNode = { type: 'number'; value: string };
type IdentifierNode = { type: 'identifier'; value: string };
type GroupNode = { type: 'group'; value: Node };
type BinaryNode = { type: 'binary'; op: string; left: Node; right: Node };

type Node = NumberNode | IdentifierNode | GroupNode | BinaryNode;

function exprToMathML(expr: string): string {
    const tokens = tokenize(expr);
    if (!tokens) return '';

    const abstractSyntaxTree = parseExpression(tokens);
    return `<math display="block">${toMathML(abstractSyntaxTree)}</math>`;
}

function tokenize(expr: string): string[] | undefined {
    // Capture identifiers with spaces, numbers, operators, and parentheses
    return expr.match(/[A-Za-z][A-Za-z ]*|\d+(?:\.\d+)?|[=()+\-*/]/g)?.map((t) => t.trim());
}

function parseExpression(tokens: string[]): Node | null {
    let pos = 0;

    function primary(): Node | null {
        const t = tokens[pos++];
        if (t === undefined) return null;

        if (/^\d/.test(t)) return { type: 'number', value: t };
        if (/^[A-Za-z]/.test(t)) return { type: 'identifier', value: t };

        if (t === '(') {
            const expr = addSub();
            pos++; // consume ')'
            return expr ? { type: 'group', value: expr } : null;
        }

        return null;
    }

    function mulDiv(): Node | null {
        let node = primary();
        while (node && (tokens[pos] === '*' || tokens[pos] === '/')) {
            const op = tokens[pos++] ?? '?';
            const right = primary();
            if (!right) break;
            node = { type: 'binary', op, left: node, right };
        }
        return node;
    }

    function addSub(): Node | null {
        let node = mulDiv();
        while (node && (tokens[pos] === '+' || tokens[pos] === '-')) {
            const op = tokens[pos++] ?? '?';
            const right = mulDiv();
            if (!right) break;
            node = { type: 'binary', op, left: node, right };
        }
        return node;
    }

    function assignment(): Node | null {
        let node = addSub();
        if (tokens[pos] === '=') {
            pos++;
            const right = assignment(); // support chained assignments if needed
            if (right) node = { type: 'binary', op: '=', left: node!, right };
        }
        return node;
    }

    return assignment();
}

function toMathML(node: Node | null): string {
    if (!node) return '';

    switch (node.type) {
        case 'number':
            return `<mn>${node.value}</mn>`;

        case 'identifier':
            return `<mi>${node.value}</mi>`;

        case 'group':
            return `<mrow><mo>(</mo>${toMathML(node.value)}<mo>)</mo></mrow>`;

        case 'binary': {
            switch (node.op) {
                case '/':
                    return `<mfrac>${toMathML(node.left)}${toMathML(node.right)}</mfrac>`;
                case '*':
                    return `<mrow>${toMathML(node.left)}<mo>×</mo>${toMathML(node.right)}</mrow>`;
                default:
                    return `<mrow>${toMathML(node.left)}<mo>${node.op}</mo>${toMathML(node.right)}</mrow>`;
            }
        }
    }
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
    style.disabled = true; // This must be set after style is injected.
}

// Helpers - Load Speed Highlight and inject associated themes.
async function loadSpeedHighlight(colorModeId: string): Promise<typeof SpeedHighlight> {
    if (speedHighlight) return speedHighlight;

    if (!speedHighlightPromise) {
        speedHighlightPromise = (async (): Promise<typeof SpeedHighlight> => {
            const [module, darkThemeCss, lightThemeCss] = await Promise.all([
                import('@speed-highlight/core'),
                import('@speed-highlight/core/themes/github-dark.css?raw'),
                import('@speed-highlight/core/themes/github-light.css?raw')
            ]);
            speedHighlight = module;
            injectStyle(darkThemeCss.default, 'theme-dark');
            injectStyle(lightThemeCss.default, 'theme-light');
            applyColorMode(colorModeId);
            speedHighlightPromise = undefined;
            return speedHighlight!;
        })();
    }

    return speedHighlightPromise;
}

export { MicromarkTool, type RenderOptions };
