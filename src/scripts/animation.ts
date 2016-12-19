export interface Animation {
    animation: string;
    duration: number;
    runOnMount: boolean;
    advanceStage?: boolean;
    advanceStageDelay?: number;
}