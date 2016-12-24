import * as React from "react";

import {Constants} from "./constants";
import {Datastore} from "./datastore";

export module Location {
    export interface State {
        locationPackage?: Location.Package;
    }

    export interface Coordinates {
        friendlyName: string;
        latitude: number;
        longitude: number;
    }

    export interface Package {
        playerLocation: Location.Coordinates;
        opponentLocation: Location.Coordinates;
        distanceBetween: number;
    }

    export function initLocationData(component: React.Component<{}, Location.State>): void {
        component.state = {};

        getLocationPackage().then((locationPackage: Location.Package) => {
            console.log({
                playerLocation: {
                    latitude: locationPackage.playerLocation.latitude,
                    longitude: locationPackage.playerLocation.longitude,
                    friendlyName: locationPackage.playerLocation.friendlyName
                },
                opponentLocation: {
                    latitude: locationPackage.opponentLocation.latitude,
                    longitude: locationPackage.opponentLocation.longitude,
                    friendlyName: locationPackage.opponentLocation.friendlyName
                },
                distanceBetween: locationPackage.distanceBetween
            });

            /*console.log({
                playerLocation: locationPackage.playerLocation.friendlyName + " (" + locationPackage.playerLocation.latitude + ", " + locationPackage.playerLocation.longitude + ")",
                opponentLocation: locationPackage.opponentLocation.friendlyName + " (" + locationPackage.opponentLocation.latitude + ", " + locationPackage.opponentLocation.longitude + ")",
                distanceBetween: locationPackage.distanceBetween
            });*/

            component.setState({ locationPackage: locationPackage })
        });
    }

    export function createCoordinates(lat: number, lng: number, friendlyName?: string): Promise<Location.Coordinates> {
        if (friendlyName) {
            return Promise.resolve({ latitude: lat, longitude: lng, friendlyName: friendlyName });
        }

        return getFriendlyName(lat, lng).then((friendlyName: string) => {
            return Promise.resolve({ latitude: lat, longitude: lng, friendlyName: friendlyName });
        });
    }

    function getLocationPackage(): Promise<Location.Package> {
        let playerLocation: Promise<Location.Coordinates> = getBrowserLocation();
        let opponentLocation: Promise<Location.Coordinates> = getOpponentLocation();

        // TODO this breaks if the datastore throws an AWSError, even though this code should never see that...
        // (try removing region in Datastore.getDb() to see this)
        return Promise.all([playerLocation, opponentLocation]).then((values: Location.Coordinates[]) => {
            return Promise.resolve({
                playerLocation: values[0],
                opponentLocation: values[1],
                distanceBetween: calculateDistanceBetween(values[0], values[1])
            });
        });
    }

    function calculateDistanceBetween(coord1: Location.Coordinates, coord2: Location.Coordinates): number {
        let distanceInMeters: number = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(coord1.latitude, coord1.longitude),
            new google.maps.LatLng(coord2.latitude, coord2.longitude)
        );

        return Math.round(distanceInMeters * Constants.Numbers.metersToMilesFactor);
    }

    function getBrowserLocation(): Promise<Location.Coordinates> {
        return resolveCurrentPosition().then((pos: Position) => {
            return createCoordinates(pos.coords.latitude, pos.coords.longitude);
        }, (error) => {
            console.log(error);

            // default to Kingston, WA on reject
            return createCoordinates(Constants.Numbers.kingstonLatitude, Constants.Numbers.kingstonLongitude, Constants.unknownLocation);
        });
    }

    function getOpponentLocation(): Promise<Location.Coordinates> {
        return Datastore.getLastLocation();
    }

    function getFriendlyName(lat: number, lng: number): Promise<string> {
        const targetedTypes: string[] = [
            "neighborhood",
            "locality", // city or town
            "administrative_area_level_1", // state name (in US)
            "country"
        ]
        let friendlyName = Constants.unknownLocation;

        return new Promise<string>((resolve) => {
            var latlng: google.maps.LatLngLiteral = {lat: lat, lng: lng};
            resolveGeocoding(latlng).then((results: google.maps.GeocoderResult[]) => {

                for (let targetedType of targetedTypes) {
                    let targetedResult: google.maps.GeocoderResult = results.find((result) => { return !!result.types.find((type) => { return type === targetedType} ) });
                    if (targetedResult) {
                        friendlyName = targetedResult.address_components[0].short_name;
                        break;
                    }
                }

                resolve(friendlyName);
            }, ((error) => {
                console.log(error);

                resolve(friendlyName);
            }));
        });
    }

    // converting callback -> Promise
    function resolveCurrentPosition(): Promise<Position> {
        return new Promise<Position>((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((pos: Position) => {
                    resolve(pos);
                }, (error: PositionError) => {
                    reject(error);
                });
            } else {
                reject({ message: "geolocation is NOT available"});
            }
        });
    }

    // converting callback -> Promise
    function resolveGeocoding(latlng: google.maps.LatLngLiteral): Promise<google.maps.GeocoderResult[]> {
        return new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            new google.maps.Geocoder().geocode({location: latlng}, function(results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) {
                if (status === google.maps.GeocoderStatus.OK) {
                    resolve(results);
                } else {
                    reject({ message: "Geocoder failed due to: " + status });
                }
            });
        });
    }
}
