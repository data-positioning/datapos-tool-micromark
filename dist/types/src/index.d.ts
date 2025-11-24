/**
 * Micromark tool class.
 */
type RenderOptions = {
    tables?: boolean;
};
declare class MicromarkTool {
    private readonly options;
    constructor();
    render(markdown: string, options?: RenderOptions): Promise<string>;
    highlight(): void;
    setColorMode(colorModeId: 'light' | 'dark'): void;
}
export { MicromarkTool, type RenderOptions };
