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

        if (this.state.locationData && !this.state.datastoreResult) {
            Datastore.saveLocation(this.state.locationData.playerLocation).then(() => {
                output = "Location saved! As {" +
                    this.state.locationData.playerLocation.latitude + ", " +
                    this.state.locationData.playerLocation.longitude +
                    "} (" + this.state.locationData.playerLocation.friendlyName + ")";
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