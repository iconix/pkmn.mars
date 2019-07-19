import * as React from "react";

import {Level} from "./logging/logger";
import {LogManager} from "./logging/logManager";

import {Constants} from "./constants";
import {Datastore} from "./datastore";

export module Location {
    export interface Coordinates {
        friendlyName: string;
        latitude: number;
        longitude: number;
        timestamp: string;
    }

    export interface Data {
        playerLocation: Location.Coordinates;
        opponentLocation: Location.Coordinates;
        distanceBetween: number;
    }

    export interface State {
        locationData?: Location.Data;
    }

    export function initLocationState(component: React.Component<{ location?: any }, Location.State>): void {
        component.state = {};

        let overrideLat: string = component && component.props && component.props.location && component.props.location.query && component.props.location.query.lat;
        let overrideLng: string = component && component.props && component.props.location && component.props.location.query && component.props.location.query.lng;

        getLocationData(overrideLat, overrideLng).then((locationData: Location.Data) => {
            LogManager.getLogger().log(Level.Info, {
                playerLocation: {
                    latitude: locationData.playerLocation.latitude,
                    longitude: locationData.playerLocation.longitude,
                    friendlyName: locationData.playerLocation.friendlyName
                },
                opponentLocation: {
                    latitude: locationData.opponentLocation.latitude,
                    longitude: locationData.opponentLocation.longitude,
                    friendlyName: locationData.opponentLocation.friendlyName
                },
                distanceBetween: locationData.distanceBetween
            });

            /*LogManager.getLogger().log({
                playerLocation: locationData.playerLocation.friendlyName + " (" + locationData.playerLocation.latitude + ", " + locationData.playerLocation.longitude + ")",
                opponentLocation: locationData.opponentLocation.friendlyName + " (" + locationData.opponentLocation.latitude + ", " + locationData.opponentLocation.longitude + ")",
                distanceBetween: locationData.distanceBetween
            });*/

            component.setState({ locationData: locationData })
        });
    }

    export function createCoordinates(lat: number, lng: number, unknown?: boolean): Promise<Location.Coordinates> {
        return getFriendlyName(lat, lng).then((friendlyName: string) => {
            if (unknown) {
                friendlyName = `?? ${friendlyName} ??`;
            }
            return Promise.resolve({ latitude: lat, longitude: lng, friendlyName: friendlyName, timestamp: new Date().toUTCString() });
        });
    }

    function getLocationData(overrideLat?: string, overrideLng?:string): Promise<Location.Data> {
        let playerLocation: Promise<Location.Coordinates> = getBrowserLocation(overrideLat, overrideLng);
        let opponentLocation: Promise<Location.Coordinates> = getOpponentLocation();

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

        return Math.round(distanceInMeters * Constants._.Numbers.metersToMilesFactor);
    }

    function createDefaultCoordinates(): Promise<Coordinates> {
        return createCoordinates(Constants._.Numbers.playerDefaultLatitude, Constants._.Numbers.playerDefaultLongitude, true);
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
        let friendlyName = Constants._.unknownLocation;

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
