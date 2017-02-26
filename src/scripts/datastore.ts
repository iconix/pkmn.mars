import * as DynamoDB from 'aws-sdk/clients/dynamodb';

import {AWSError} from 'aws-sdk/lib/error';

import {Constants} from './constants';
import {Location} from './location';

export module Datastore {
    export function saveLocation(coordinates: Location.Coordinates): Promise<string> {
        var db: DynamoDB = getDb();

        return resolvePutItem(db, {
            TableName: Constants.Datastore.tableName,
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
            TableName: Constants.Datastore.tableName,
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
            console.log('Falling back to default location as last');
            return Location.createCoordinates(Constants.Numbers.seattleLatitude, Constants.Numbers.seattleLongitude);
        });
    }

    function getDb(): DynamoDB {
        return new DynamoDB({
            region: 'us-west-1', // TODO choose based on browser location
            credentials: {
                accessKeyId: 'AKIAIYBFXD4AWCBP4TZA',
                secretAccessKey: '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'
            }
        });
    }

    function resolvePutItem(db: DynamoDB, params: DynamoDB.Types.PutItemInput): Promise<DynamoDB.Types.PutItemOutput> {
        return new Promise<{}>((resolve: (data: DynamoDB.Types.PutItemOutput) => void, reject: (err: AWSError) => void) => {
            db.putItem(params, function(err: AWSError, data: DynamoDB.Types.PutItemOutput) {
                if (err) {
                    console.log(err.message, err, err.stack);
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
                    console.log(err.message, err, err.stack);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
