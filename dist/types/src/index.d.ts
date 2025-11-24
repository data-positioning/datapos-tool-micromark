/**
 * Micromark tool class.
 */
type RenderOptions = {
    tables?: boolean;
};
declare class MicromarkTool {
    private readonly options;
    constructor();
    highlight(): Promise<void>;
    render(markdown: string, options?: RenderOptions): Promise<string>;
    setColorMode(colorModeId: 'light' | 'dark'): void;
}
export { MicromarkTool, type RenderOptions };
