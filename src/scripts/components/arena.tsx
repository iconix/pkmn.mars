import * as React from "react";
import {Utils} from "../utils";

export interface ArenaProps { }

export class Arena extends React.Component<ArenaProps, {}> {

    // TODO is the "React way" to calculate these background-position inside the component, or pass it down as a props?
    private randomizeBackground(): string {
        let backgroundPositionX = [0, -255, -506, -758, -1009, -1261, -1514, -1766];
        let backgroundPositionY = [0, -199, -398, -597, -793, -989]; // TODO -793px is messed up

        let randXIndex: number = Utils.getRandomInt(backgroundPositionX.length - 1 /* maxInt */);
        let randYIndex: number = Utils.getRandomInt(backgroundPositionY.length - 1 /* maxInt */);

        console.log("Selected background", (backgroundPositionX.length*randYIndex + randXIndex) + 1, "of", backgroundPositionX.length * backgroundPositionY.length);

        let randXPos: string = backgroundPositionX[randXIndex] + "px";
        let randYPos: string = backgroundPositionY[randYIndex] + "px";

        return randXPos + " " + randYPos;
    }

    render() {
       const backgroundPosition = {
            backgroundPosition: this.randomizeBackground()
        };

        return (
            <div className="arena" style={backgroundPosition}>
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
