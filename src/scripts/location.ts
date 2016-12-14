import {Constants} from "./constants";

export module Location {
    export interface Coordinates {
        friendlyName: string;
        latitude: number;
        longitude: number;
    }

    export interface Package {
        browserLocation: Location.Coordinates;
        opponentLocation: Location.Coordinates;
        distanceBetween: number;
    }

    export function getLocationPackage(): Promise<Location.Package> {
        let browserLocation: Promise<Location.Coordinates> = getBrowserLocation();
        let opponentLocation: Promise<Location.Coordinates> = getOpponentLocation();

        return Promise.all([browserLocation, opponentLocation]).then((values: Location.Coordinates[]) => {
            return Promise.resolve({
                browserLocation: values[0],
                opponentLocation: values[1],
                distanceBetween: calculateDistanceBetween(values[0], values[1])
            });
        }, (error) => {
            // TODO
        });
    }

    function calculateDistanceBetween(coord1: Location.Coordinates, coord2: Location.Coordinates): number {
        return 500; // TODO
    }

    function getOpponentLocation(): Promise<Location.Coordinates> {
        // TODO get coordinates from database
        return Promise.resolve({ friendlyName: "", latitude: 39.490054, longitude: -76.3390968 });
    }

    function getBrowserLocation(): Promise<Location.Coordinates> {
        return getCurrentPosition().then((pos: Position) => {
            return Promise.resolve( { friendlyName: "", latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        }, (error) => {
            console.log(error);

            // default to Kingston, WA on reject
            return Promise.resolve({ friendlyName: "Kingston, WA", latitude: Constants.Numbers.kingstonLatitude, longitude: Constants.Numbers.kingstonLongitude });
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