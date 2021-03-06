import _merge = require('lodash.merge');

import {Constants} from './constants';
import * as Firebase from './firebase-rest';
import {Location} from './location';

import {Level} from './logging/logger';
import {LogManager} from './logging/logManager';

export module Datastore {
    const client = FIREBASE_DATABASE_URL ? new Firebase.Client(FIREBASE_DATABASE_URL) : undefined;

    export function loadConstants(): Promise<void> {
        const dbLocation = '/App/constants/_';

        if (!client) {
            return Promise.resolve(); // default constants
        }

        return client.get(dbLocation).then((data: string) => {
            //LogManager.getLogger().log(Level.Debug, data);
            _merge(Constants._, data);
            return Promise.resolve();
        }).catch((error) => {
            LogManager.getLogger().log(Level.Error, error);
            return Promise.reject(error);
        });
    }

    export function saveLocation(coordinates: Location.Coordinates): Promise<string> {
        const dbLocation = '/App/location/last';

        if (!client) {
            return Promise.resolve(undefined); // no-op
        }

        return client.put(dbLocation, coordinates).then(() => {
            return Promise.resolve(undefined);
        }).catch((error) => {
            return Promise.reject(error);
        });
    }

    export function getLastLocation(): Promise<Location.Coordinates> {
        const dbLocation = '/App/location/last';

        if (!client) {
            // default opponent coordinates
            return Location.createCoordinates(Constants._.Numbers.opponentDefaultLatitude, Constants._.Numbers.opponentDefaultLongitude);
        }

        return client.get(dbLocation).then((data: Location.Coordinates) => {
            LogManager.getLogger().log(Level.Debug, data);
            return Promise.resolve(data);
        }).catch((error) => {
            LogManager.getLogger().log(Level.Warn, { message: 'Falling back to default location as last', error: error.toString() });
            return Location.createCoordinates(Constants._.Numbers.opponentDefaultLatitude, Constants._.Numbers.opponentDefaultLongitude);
        });
    }
}
