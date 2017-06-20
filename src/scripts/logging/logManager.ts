import {Logger} from './logger';

export module LogManager {
    var instance: Logger;
    const batchSize: number = 4;

    export function getLogger(): Logger {
        if (!instance) {
            instance = new Logger(batchSize);
        }

        return instance;
    }
}