import * as React from "react";

import {Background} from "../background";
import {Constants} from "../constants";

export interface ArenaProps { }

export class Arena extends React.Component<ArenaProps, {}> {

    render() {
        const backgroundPosition: Background.Position = Background.randomizeBackground();

        const arenaStyle = {
            background: Background.createArenaBackground(),
            backgroundPosition: backgroundPosition.X + "px " + backgroundPosition.Y + "px"
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
