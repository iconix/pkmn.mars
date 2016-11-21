import * as React from "react";

import {Background} from "../background";
import {Constants} from "../constants";

export interface ArenaProps { }

export class Arena extends React.Component<ArenaProps, {}> {

    render() {
        let background: Background.Styles = Background.createArenaBackground();

        const arenaStyle = {
            background: background.Color + ", " + background.Image + ", " + background.Repeat,
            backgroundPosition: background.Position.X + "px " + background.Position.Y + "px"
        };

        return (
            <div className={Constants.Classes.arena} style={arenaStyle}>
                <div className={Constants.Classes.opponent}>
                    <img src={Constants.Resources.opponentPokemonGif} />
                </div>
                <div className={Constants.Classes.field}></div>
                <div className={Constants.Classes.player}>
                    <img src={Constants.Resources.playerPokemonGif} />
                </div>
            </div>
        );
    }
}
