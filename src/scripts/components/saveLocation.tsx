import * as React from "react";

import {Datastore} from "../datastore";
import {Location} from "../location";

interface SaveLocationState extends Location.State {
    datastoreResult?: string;
}

export class SaveLocation extends React.Component<{}, SaveLocationState> {
    constructor(props: {}) {
        super(props);
        Location.initLocationData(this);
    }

    render() {
        let output: string = this.state.datastoreResult || "Loading...";

        if (this.state.locationPackage && !this.state.datastoreResult) {
            Datastore.saveLocation(this.state.locationPackage.playerLocation).then(() => {
                output = "Location saved! As {" +
                    this.state.locationPackage.playerLocation.latitude + ", " +
                    this.state.locationPackage.playerLocation.longitude +
                    "} (" + this.state.locationPackage.playerLocation.friendlyName + ")";
            }, (err) => {
                output = "Save failed: " + err;
            }).then(() => {
                this.setState({ datastoreResult: output });
            });
        }

        return (
            <p>{output}</p>
        );
    }
}