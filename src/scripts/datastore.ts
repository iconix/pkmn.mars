import * as Firebase from 'firebase';
import _merge = require('lodash.merge');

import {Constants} from './constants';
import {Location} from './location';

import {Level} from './logging/logger';
import {LogManager} from './logging/logManager';

export module Datastore {
    var config = {
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        databaseURL: FIREBASE_DATABASE_URL
    };
    const app = Firebase.initializeApp(config);

    var db: Firebase.database.Database = app.database();
    var appRef: Firebase.database.Reference = db.ref(FIREBASE_REFERENCE_APP);

    export function loadConstants(): Promise<void> {
        return appRef.once('value').then((refSnapshot: Firebase.database.DataSnapshot) => {
            var data = refSnapshot.val();
            LogManager.getLogger().log(Level.Debug, data);
            if (data && data.constants && data.constants._) {
                _merge(Constants._, data.constants._);
            }
            return Promise.resolve();
        }).catch((error) => {
            LogManager.getLogger().log(Level.Error, error);
            return Promise.reject(error);
        });
    }

    export function saveLocation(coordinates: Location.Coordinates): Promise<string> {
        return appRef.update({
            location: { last: coordinates }
        }).then(() => {
            return Promise.resolve(undefined);
        }).catch((error) => {
            return Promise.reject(error);
        });
    }

    export function getLastLocation(): Promise<Location.Coordinates> {
        return appRef.once('value').then((refSnapshot: Firebase.database.DataSnapshot) => {
            var data = refSnapshot.val();
            LogManager.getLogger().log(Level.Debug, data);
            return Promise.resolve(data.location.last);
        }).catch((error) => {
            LogManager.getLogger().log(Level.Warn, 'Falling back to default location as last');
            return Location.createCoordinates(Constants._.Numbers.seattleLatitude, Constants._.Numbers.seattleLongitude);
        });
    }
}
