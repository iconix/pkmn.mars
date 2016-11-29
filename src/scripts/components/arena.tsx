import * as React from "react";

import {Background} from "../background";
import {Constants} from "../constants";
import {Location} from "../location";

import {Scene} from "./scene";

interface ArenaProps {
    coordinates: Location.Coordinates;
}

export class Arena extends React.Component<ArenaProps, {}> {
    render() {
        let background: Background.Styles = Background.createArenaBackground(this.props.coordinates);

        const arenaStyle = {
            background: background.Color + ", " + background.Image + ", " + background.Repeat,
            backgroundPosition: background.Position.X + "px " + background.Position.Y + "px"
        };

        return (
            <div className={Constants.Classes.arena} style={arenaStyle}>
                <Scene />
            </div>
        );
    }
}
