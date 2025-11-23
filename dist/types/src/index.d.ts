/**
 * Micromark tool class.
 */
/** Example code for dynamically loading css file.
 *
 * if (typeof document !== 'undefined' && !document.querySelector('link[data-katex]')) {
 *     const link = document.createElement('link');
 *     link.rel = 'stylesheet';
 *     link.href = 'https://cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css';
 *     link.dataset.katex = 'true';
 *     document.head.appendChild(link);
 * }
 */
declare class MicromarkTool {
    private readonly options;
    private themeIds;
    private themeCss;
    constructor();
    render(markdown: string): string;
    highlight(): void;
    switchTheme(mode: 'light' | 'dark'): void;
    private injectThemes;
    private createPresenterCodeBlockHtmlExtension;
}
export { MicromarkTool };
