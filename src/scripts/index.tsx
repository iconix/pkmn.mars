import * as React from "react";
import * as ReactDOM from "react-dom";

import {Arena} from "./components/arena";

import {Constants} from "./constants";
import {Location} from "./location";

Location.getBrowserLocation().then((coordinates) => {
    console.log("Using location coordinates:", coordinates.latitude, coordinates.longitude);

    ReactDOM.render(
        <Arena coordinates={coordinates} />,
        document.getElementById(Constants.Ids.screen)
    );
});
