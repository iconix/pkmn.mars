import {Constants} from "./constants";
import {TimeOfDay} from "./timeOfDay";
import {Utils} from "./utils";

export module Background {
    export interface Position {
        X: number,
        Y: number
    }

    export interface Styles {
        Position: Position,
        Color: string,
        Image: string,
        Repeat: string
    }

    export function createArenaBackground(): Styles {
        return {
            Position: randomizeBackground(),
            Color: TimeOfDay.getTint(),
            Image: "url(\"" + Constants.Resources.arenaBackground + "\")",
            Repeat: "no-repeat"
        };
    }

    function randomizeBackground(): Position {
        const backgroundPositionX = Constants.Background.SpritePositions.XPositions;
        const backgroundPositionY = Constants.Background.SpritePositions.YPositions;

        let numBackgrounds = backgroundPositionX.length * backgroundPositionY.length;
        let randBackground = Utils.getRandomInt(numBackgrounds - 1);

        let randXIndex: number = randBackground % backgroundPositionX.length;
        let randYIndex: number = Math.floor(randBackground / backgroundPositionX.length);

        console.log("Selected background", randBackground + 1, "of", numBackgrounds);

        let randXPos: number = backgroundPositionX[randXIndex];
        let randYPos: number = backgroundPositionY[randYIndex];

        return { X: randXPos, Y: randYPos };
    }
}