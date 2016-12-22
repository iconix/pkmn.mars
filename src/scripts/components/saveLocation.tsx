import * as React from "react";

import {Location} from "../location";

export class SaveLocation extends React.Component<{}, Location.State> {
    constructor(props: {}) {
        super(props);
        Location.initLocationData(this);
    }

    render() {
        let output: string = "Loading...";
        if (this.state.locationPackage) {
            output = "Browser location saved as " + this.state.locationPackage.playerLocation.friendlyName;
        }
        return (
            <p>{output}</p>
        );
    }
}