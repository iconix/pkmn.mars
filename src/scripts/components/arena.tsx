import * as React from "react";

import {Constants} from "../constants";
import {Utils} from "../utils";

export interface ArenaProps { }

export class Arena extends React.Component<ArenaProps, {}> {

    private randomizeBackground(): string {
        // TODO could flip selection of background to randomly (& evenly) pick a background first (1-48), then calculate its position in the matrix/sprite

        const backgroundPositionX = Constants.Background.SpritePositions.XPositions;
        const backgroundPositionY = Constants.Background.SpritePositions.YPositions;

        let randXIndex: number = Utils.getRandomInt(backgroundPositionX.length - 1 /* maxInt */);
        let randYIndex: number = Utils.getRandomInt(backgroundPositionY.length - 1 /* maxInt */);

        console.log("Selected background", (backgroundPositionX.length*randYIndex + randXIndex) + 1, "of", backgroundPositionX.length * backgroundPositionY.length);

        let randXPos: string = backgroundPositionX[randXIndex] + "px";
        let randYPos: string = backgroundPositionY[randYIndex] + "px";

        return randXPos + " " + randYPos;
    }

    private createArenaBackground(): string {
        const backgroundColor = Constants.Background.Tints.placeholder; // TODO update tint based on time of day
        const backgroundImage = "url(\"" + Constants.Resources.arenaBackground + "\")";
        const backgroundRepeat = "no-repeat";

        return backgroundColor + ", " +
                backgroundImage + ", " +
                backgroundRepeat;
    }

    render() {
        const arenaStyle = {
            background: this.createArenaBackground(),
            backgroundPosition: this.randomizeBackground()
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
