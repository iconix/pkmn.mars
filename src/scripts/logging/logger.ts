import Tattletale = require('Tattletale');
import _cloneDeep = require('lodash.clonedeep');

// TODO: consolidate with winston levels (.d.ts)
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
        var cloneData = _cloneDeep(data);
        if (typeof cloneData === 'object') {
            cloneData['level'] = Level[level];
            return JSON.stringify(cloneData);
        }
        return JSON.stringify({ level: Level[level], message: cloneData });
    }
}