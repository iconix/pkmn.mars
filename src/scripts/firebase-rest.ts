/*
* Modified from: https://github.com/firebase/bolt/blob/master/src/firebase-rest.ts
*/

import https = require('https');
import http = require('http');
import querystring = require('querystring');

import {Level} from './logging/logger';
import {LogManager} from './logging/logManager';

type RequestOptions = {
    method: string,
    print?: string;
}

export class Client {
    private debug = false;

    constructor(
        private url: string, private authToken?: string,
        public uid?: string) {}

    setDebug(debug = true) {
        this.debug = debug;
        return this;
    }

    get(location: string): Promise<any> {
        return this.request({method: 'GET'}, location);
    }

    put(location: string, content: any): Promise<any> {
        return this.request({method: 'PUT', print: 'silent'}, location, content);
    }

    request(opt: RequestOptions, path: string, content?: any) {
        var options = {
            hostname: this.url,
            path: path + '.json',
            method: opt.method,
        };

        var query: any = {};
        if (opt.print) {
            query.print = opt.print;
        }

        if (this.authToken) {
            query.auth = this.authToken;
        }

        if (Object.keys(query).length > 0) {
            options.path += '?' + querystring.stringify(query);
        }

        content = JSON.stringify(content, null, 2); // prettyJSON

        return request(options, content, this.debug).then(function(body: string) {
            return body === '' ? null : JSON.parse(body);
        });
    }
}

var ridNext = 0;

function request(options: any, content: any, debug: boolean): Promise<string> {
    ridNext += 1;
    var rid = ridNext;

    function log(level: Level, s: string): void {
        if (debug) {
            LogManager.getLogger().log(level, 'Request<' + rid + '>: ' + s);
        }
    }

    log(Level.Debug, 'Request: ' + JSON.stringify(options, null, 2)); // prettyJSON
    if (content) {
        log(Level.Debug, 'Body: \'' + content + '\'');
    }

    return new Promise(function(resolve, reject) {
        var req = https.request(options, function(res: http.ClientResponse) {
            var chunks = <string[]>[];

            res.on('data', function(body: string) {
                chunks.push(body);
            });

            res.on('end', function() {
                var result: string = chunks.join('');
                log(Level.Debug, 'Result (' + res.statusCode + '): \'' + result + '\'');
                let message = 'Status = ' + res.statusCode + ' ' + result;

                if (res.statusCode && Math.floor(res.statusCode / 100) !== 2) {
                    reject(new Error(message));
                } else {
                    resolve(result);
                }
            });
        });

        if (content) {
            req.write(content, 'utf8');
        }
        req.end();

        req.on('error', function(error: Error) {
            log(Level.Error, 'Request error: ' + error);
            reject(error);
        });
    });
}


