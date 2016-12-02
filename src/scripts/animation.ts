export interface Animation {
    animation: string;
    duration: number;
    runOnMount: boolean;
    complete?: __VelocityReact.ElementCallback;
}