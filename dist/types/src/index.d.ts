/**
 * Micromark tool class.
 */
type RenderOptions = {
    tables?: boolean;
};
declare class MicromarkTool {
    highlight(renderTo: HTMLElement, colorModeId: string): Promise<void>;
    render(markdown: string, options?: RenderOptions): Promise<string>;
    setColorMode(colorModeId: string): void;
}
export { MicromarkTool, type RenderOptions };
