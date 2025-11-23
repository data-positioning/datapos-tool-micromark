/**
 * Micromark tool class.
 */
declare class MicromarkTool {
    private readonly options;
    private readonly themeIds;
    private readonly themeCss;
    constructor();
    private injectCodeFont;
    render(markdown: string): string;
    highlight(): void;
    switchTheme(mode: 'light' | 'dark'): void;
    private injectThemes;
    private createPresenterCodeBlockHtmlExtension;
}
export { MicromarkTool };
