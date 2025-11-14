/**
 * Micromark tool class.
 *
 * TODO:
 * Make loading of extensions and highlighting of code blocks optional?
 */
declare class MicromarkTool {
    private options;
    constructor();
    render(markdown: string): string;
    private createPresenterCodeBlockHtmlExtension;
}
export { MicromarkTool };
