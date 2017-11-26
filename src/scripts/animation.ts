export interface Animation {
    animation: string;
    duration: number;
    runOnMount: boolean;
    advanceState?: boolean;
    advanceStateDelay?: number;
}