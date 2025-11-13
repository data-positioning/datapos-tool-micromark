/**
 * Micromark tool class.
 */
declare class MicromarkTool {
    private options;
    constructor();
    render(markdown: string): string;
    private createPresenterCodeBlockHtmlExtension;
}
export { MicromarkTool };
