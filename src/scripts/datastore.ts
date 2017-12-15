import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import * as Firebase from 'firebase';
import _merge = require('lodash.merge');

import {AWSError} from 'aws-sdk/lib/error';

import {Constants} from './constants';
import {Location} from './location';

import {Level} from './logging/logger';
import {LogManager} from './logging/logManager';

export module Datastore {

    export function loadConstants(): Promise<void> {
        var config = {
            apiKey: FIREBASE_API_KEY,
            authDomain: FIREBASE_AUTH_DOMAIN,
            databaseURL: FIREBASE_DATABASE_URL
        };
        const app = Firebase.initializeApp(config);

        var db: Firebase.database.Database = app.database();
        var appRef: Firebase.database.Reference = db.ref(FIREBASE_REFERENCE_APP);

        /*appRef.set({
            constants: Constants
        }).then(() => {

        }).catch((error) => {
            console.log(error);
        });*/

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
        var db: DynamoDB = getDb();

        return resolvePutItem(db, {
            TableName: Constants._.Datastore.tableName,
            Item: {
                'pkmn.mars': {
                    S: 'last'
                },
                latitude: {
                    N: coordinates.latitude.toString()
                },
                longitude: {
                    N: coordinates.longitude.toString()
                },
                friendlyName: {
                    S: coordinates.friendlyName
                },
                timestamp: {
                    S: new Date().toUTCString()
                }
            }
        }).then((data: DynamoDB.Types.PutItemOutput) => {
            return Promise.resolve(undefined);
        }, (err: AWSError) => {
            return Promise.reject(err);
        });
    }

    export function getLastLocation(): Promise<Location.Coordinates> {
        var db: DynamoDB = getDb();

        return resolveGetItem(db, {
            TableName: Constants._.Datastore.tableName,
            Key: {
                'pkmn.mars': {
                    S: 'last'
                }
            }
        }).then((data: DynamoDB.Types.GetItemOutput) => {
            return Promise.resolve({
                latitude: + data.Item['latitude'].N,
                longitude: + data.Item['longitude'].N,
                friendlyName: data.Item['friendlyName'].S,
            });
        }, (err: AWSError) => {
            LogManager.getLogger().log(Level.Warn, 'Falling back to default location as last');
            return Location.createCoordinates(Constants._.Numbers.seattleLatitude, Constants._.Numbers.seattleLongitude);
        });
    }

    function getDb(): DynamoDB {
        return new DynamoDB({
            region: 'us-west-1', // TODO: choose based on browser location
            credentials: {
                accessKeyId: DYNAMODB_ACCESS_KEY_ID,
                secretAccessKey: DYNAMODB_SECRET_ACCESS_KEY
            }
        });
    }

    function resolvePutItem(db: DynamoDB, params: DynamoDB.Types.PutItemInput): Promise<DynamoDB.Types.PutItemOutput> {
        return new Promise<{}>((resolve: (data: DynamoDB.Types.PutItemOutput) => void, reject: (err: AWSError) => void) => {
            db.putItem(params, function(err: AWSError, data: DynamoDB.Types.PutItemOutput) {
                if (err) {
                    LogManager.getLogger().log(Level.Error, `${err.message} ${err} ${err.stack}`);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    function resolveGetItem(db: DynamoDB, params: DynamoDB.Types.GetItemInput): Promise<DynamoDB.Types.GetItemOutput> {
        return new Promise<{}>((resolve: (data: DynamoDB.Types.GetItemOutput) => void, reject: (err: AWSError) => void) => {
            db.getItem(params, function(err: AWSError, data: DynamoDB.Types.GetItemOutput) {
                if (err) {
                    LogManager.getLogger().log(Level.Error, `${err.message} ${err} ${err.stack}`);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
