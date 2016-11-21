import {Constants} from "./constants";

export module Location {
    export interface Coordinates {
        latitude: number;
        longitude: number;
    }

    export function getBrowserLocation(): Promise<Location.Coordinates> {
        return getCurrentPosition().then((pos: Position) => {
            return Promise.resolve( { latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        }, (error) => {
            console.log(error);

            // default to Kingston, WA on reject
            return Promise.resolve({ latitude: Constants.Numbers.kingstonLatitude, longitude: Constants.Numbers.kingstonLongitude });
        });
    }

    function getCurrentPosition(): Promise<Position> {
        return new Promise<Position>((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((pos: Position) => {
                    resolve(pos);
                }, (error: PositionError) => {
                    reject(error);
                });
            } else {
                reject( { message: "geolocation is NOT available"} )
            }
        });
    }
}