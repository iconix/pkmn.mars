import * as React from "react";
import * as ReactDOM from "react-dom";

import {Arena} from "./components/arena";

import {Constants} from "./constants";
import {Location} from "./location";

Location.getLocationPackage().then((locationPackage: Location.Package) => {
    console.log({
        browserLocation: {
            latitude: locationPackage.browserLocation.latitude,
            longitude: locationPackage.browserLocation.longitude,
            friendlyName: locationPackage.browserLocation.friendlyName
        },
        opponentLocation: {
            latitude: locationPackage.opponentLocation.latitude,
            longitude: locationPackage.opponentLocation.longitude,
            friendlyName: locationPackage.opponentLocation.friendlyName
        },
        distanceBetween: locationPackage.distanceBetween
    });

    ReactDOM.render(
        <Arena locationPackage={locationPackage} />,
        document.getElementById(Constants.Ids.screen)
    );
});
