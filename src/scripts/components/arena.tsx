import * as React from "react";
import {VelocityComponent} from "velocity-react";

import {Background} from "../background";
import {Constants} from "../constants";
import {Location} from "../location";

import {Character} from "./character";

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
                <VelocityComponent animation={"transition.slideRightIn"} duration={500} runOnMount={true}>
                    <Character class={Constants.Classes.opponent} imgSrc={Constants.Resources.opponentPokemonGif} />
                </VelocityComponent>
                <div className={Constants.Classes.field}></div>
                <VelocityComponent animation={"transition.slideLeftIn"} duration={500} runOnMount={true}>
                    <Character class={Constants.Classes.player} imgSrc={Constants.Resources.playerPokemonGif} />
                </VelocityComponent>
            </div>
        );
    }
}
