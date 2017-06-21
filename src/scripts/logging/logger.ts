import Tattletale = require('Tattletale');

export enum Level {
    Debug,
    Info,
    Warn,
    Error
}

export class Logger {
    private tale: Tattletale;
    private currentBatchSize: number;
    private maxBatchSize: number;

    constructor(batchSize: number) {
        this.tale = new Tattletale('/log');

        this.currentBatchSize = 0;
        this.maxBatchSize = batchSize;
    }

    public log(level: Level, data: string | number | boolean | {[ key: string]: any}): void {
        this.tale.log(this.sanitizeData(level, data));
        this.endTale();
    }

    public send(): void {
        this.tale.send();
    }

    private checkBatchSizeAndSend(): void {
        if (this.currentBatchSize === this.maxBatchSize) {
            this.currentBatchSize = 0;
            this.send();
        }
    }

    private endTale(): void {
        this.currentBatchSize++;
        this.checkBatchSizeAndSend();
    }

    private sanitizeData(level: Level, data: string | number | boolean | {[ key: string]: any}): string | number | boolean {
        if (typeof data === 'object') {
            data['level'] = Level[level];
            return JSON.stringify(data);
        }
        return JSON.stringify({ level: Level[level], message: data });
    }
}