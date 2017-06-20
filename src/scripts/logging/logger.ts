import Tattletale = require('Tattletale');

export class Logger {
    private logTale: Tattletale;
    private warnTale: Tattletale;
    private errorTale: Tattletale;
    private currentBatchSize: number;
    private maxBatchSize: number;

    constructor(batchSize: number) {
        this.logTale = new Tattletale('/log?level=log');
        this.warnTale = new Tattletale('/log?level=warn');
        this.errorTale = new Tattletale('/log?level=error');

        this.currentBatchSize = 0;
        this.maxBatchSize = batchSize;
    }

    public log(data: string | number | boolean | {}): void {
        this.logTale.log(this.sanitizeData(data));
        this.endTale();
    }

    public warn(data: string | number | boolean): void {
        this.warnTale.log(this.sanitizeData(data));
        this.endTale();
    }

    public error(data: string | number | boolean): void {
        this.errorTale.log(this.sanitizeData(data));
        this.endTale()
    }

    public send(): void {
        this.errorTale.send();
        this.warnTale.send();
        this.logTale.send();
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

    private sanitizeData(data: string | number | boolean | {}): string | number | boolean {
        if (typeof data === "object") {
            return JSON.stringify(data);
        }
        return data;
    }
}