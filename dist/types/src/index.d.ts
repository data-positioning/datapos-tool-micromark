/**
 * Micromark tool class.
 */
type RenderOptions = {
    tables?: boolean;
};
declare class MicromarkTool {
    private readonly options;
    private readonly themeIds;
    private readonly themeCss;
    constructor();
    private injectCodeFont;
    render(markdown: string, options: RenderOptions): Promise<string>;
    highlight(): void;
    setColorMode(colorModeId: 'light' | 'dark'): void;
    private injectThemes;
    private createPresenterCodeBlockHtmlExtension;
}
export { MicromarkTool };
