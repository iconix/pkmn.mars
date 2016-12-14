import * as React from "react";
import * as ReactDOM from "react-dom";

import {Arena} from "./components/arena";

import {Constants} from "./constants";
import {Location} from "./location";

Location.getLocationPackage().then((locationPackage: Location.Package) => {
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

    ReactDOM.render(
        <Arena locationPackage={locationPackage} />,
        document.getElementById(Constants.Ids.screen)
    );
});
