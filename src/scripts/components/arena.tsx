import * as React from "react";
import {Utils} from "../utils";

export interface ArenaProps { }

export class Arena extends React.Component<ArenaProps, {}> {

    // TODO is the "React way" to calculate these background-position inside the component, or pass it down as a props?
    private randomizeBackground(): string {
        // TODO could flip selection of background to randomly (& evenly) pick a background first (1-48), then calculate its position in the matrix/sprite

        let backgroundPositionX = [0, -255, -506, -758, -1009, -1261, -1514, -1766];
        let backgroundPositionY = [0, -199, -398, -597, -793, -989]; // TODO -793px is messed up

        let randXIndex: number = Utils.getRandomInt(backgroundPositionX.length - 1 /* maxInt */);
        let randYIndex: number = Utils.getRandomInt(backgroundPositionY.length - 1 /* maxInt */);

        console.log("Selected background", (backgroundPositionX.length*randYIndex + randXIndex) + 1, "of", backgroundPositionX.length * backgroundPositionY.length);

        let randXPos: string = backgroundPositionX[randXIndex] + "px";
        let randYPos: string = backgroundPositionY[randYIndex] + "px";

        return randXPos + " " + randYPos;
    }

    private createArenaBackground(): string {
        // TODO update linear-gradient (tint) based on time of day
        const backgroundColor = "linear-gradient(rgba(255, 0, 0, 0.25), rgba(255, 0, 0, 0.25))";
        const backgroundImage = "url('src/sprites/background.png')";
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
            <div className="arena" style={arenaStyle}>
                <div className="opponent">
                    <img src="src/sprites/gallade_norm_front.gif" />
                </div>
                <div className="field"></div>
                <div className="player">
                    <img src="src/sprites/absol_shiny_back.gif" />
                </div>
            </div>
        );
    }
}
