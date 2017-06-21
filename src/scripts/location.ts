import * as React from "react";

import {Level} from "./logging/logger";
import {LogManager} from "./logging/logManager";

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

    export function initLocationData(component: React.Component<{ location?: any }, Location.State>): void {
        component.state = {};

        let overrideLat: string = component && component.props && component.props.location && component.props.location.query && component.props.location.query.lat;
        let overrideLng: string = component && component.props && component.props.location && component.props.location.query && component.props.location.query.lng;

        getLocationPackage(overrideLat, overrideLng).then((locationPackage: Location.Package) => {
            LogManager.getLogger().log(Level.Info, {
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

            /*LogManager.getLogger().log({
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

    function getLocationPackage(overrideLat?: string, overrideLng?:string): Promise<Location.Package> {
        let playerLocation: Promise<Location.Coordinates> = getBrowserLocation(overrideLat, overrideLng);
        let opponentLocation: Promise<Location.Coordinates> = getOpponentLocation();

        // TODO: this breaks if the datastore throws an AWSError, even though this code should never see that...
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

    function createDefaultCoordinates(): Promise<Coordinates> {
        // default: Bremerton, WA
        return createCoordinates(Constants.Numbers.bremertonLatitude, Constants.Numbers.bremertonLongitude, Constants.unknownLocation);
    }

    function getBrowserLocation(overrideLat?: string, overrideLng?:string): Promise<Location.Coordinates> {
        // check first for override coordinates
        if (overrideLat || overrideLng) {
            if (isNaN(<any>overrideLat) || isNaN(<any>overrideLng)) {
                LogManager.getLogger().log(Level.Warn, "Override coordinates invalid; using default");
                return createDefaultCoordinates();
            }

            LogManager.getLogger().log(Level.Debug, "Using override coordinates");
            return createCoordinates(+overrideLat, +overrideLng);
        } else {
            return resolveCurrentPosition().then((pos: Position) => {
                return createCoordinates(pos.coords.latitude, pos.coords.longitude);
            }, (error) => {
                LogManager.getLogger().log(Level.Error, error);

                return createDefaultCoordinates();
            });
        }
    }

    function getOpponentLocation(): Promise<Location.Coordinates> {
        return Datastore.getLastLocation();
    }

    interface ParsedGeocoderResult {
        neighborhood?: string;
        locality?: string; // city or town
        administrative_area_level_1?: string; // state name (in US)
        country?: string;
    }

    function getFriendlyName(lat: number, lng: number): Promise<string> {
        let friendlyName = Constants.unknownLocation;

        return new Promise<string>((resolve) => {
            var latlng: google.maps.LatLngLiteral = {lat: lat, lng: lng};
            resolveGeocoding(latlng).then((results: google.maps.GeocoderResult[]) => {

                let parsedResults: ParsedGeocoderResult = parseGeocoderResults(results);

                if (parsedResults.administrative_area_level_1) {
                    friendlyName = parsedResults.administrative_area_level_1;

                    if (parsedResults.locality) {
                        friendlyName = parsedResults.locality + ", " + friendlyName;
                    }
                    if (parsedResults.neighborhood) {
                        friendlyName += "\n(" + parsedResults.neighborhood + ")";
                    }
                } else if (parsedResults.country) {
                    friendlyName = parsedResults.country;
                }

                resolve(friendlyName);
            }, ((error) => {
                LogManager.getLogger().log(Level.Error, error);

                resolve(friendlyName);
            }));
        });
    }

    function parseGeocoderResults(results: google.maps.GeocoderResult[]): ParsedGeocoderResult {
        let targetedTypes: ParsedGeocoderResult = {};

        for (let result of results) {
            for (let component of result.address_components) {
                for (let type of component.types) {
                    switch (type) {
                        case "neighborhood":
                            if (!targetedTypes.neighborhood) {
                                targetedTypes.neighborhood = component.short_name;
                            }
                            break;
                        case "locality":
                            if (!targetedTypes.locality) {
                                targetedTypes.locality = component.short_name;
                            }
                            break;
                        case "administrative_area_level_1":
                            if (!targetedTypes.administrative_area_level_1) {
                                targetedTypes.administrative_area_level_1 = component.short_name;
                            }
                            return targetedTypes;
                        case "country":
                            if (!targetedTypes.country) {
                                targetedTypes.country = component.short_name;
                            }
                            return targetedTypes;
                    }
                }
            }
        }
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
