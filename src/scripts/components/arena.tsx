import * as React from "react";

import {BattleManager} from "../battles/battleManager";

import {Stage} from "../stages/stage";

import {Background} from "../background";
import {Constants} from "../constants";
import {Location} from "../location";

import {Scene} from "./scene";

interface ArenaProps {
    coordinates: Location.Coordinates;
}

export class Arena extends React.Component<ArenaProps, {}> {
    constructor (props: ArenaProps) {
        super(props);
        this.state = {
            currentStage: Stage.Type.BattleStart
        };
    }


    render() {
        let background: Background.Styles = Background.createArenaBackground(this.props.coordinates);

        const arenaStyle = {
            background: background.Color + ", " + background.Image + ", " + background.Repeat,
            backgroundPosition: background.Position.X + "px " + background.Position.Y + "px"
        };

        return (
            <div className={Constants.Classes.arena} style={arenaStyle}>
                <Scene battle={BattleManager.getBattle()} />
            </div>
        );
    }
}
