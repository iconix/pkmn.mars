import {Constants} from "./constants";
import {Utils} from "./utils";

export module Background {
    export interface Position {
        X: number,
        Y: number
    }

    export function randomizeBackground(): Position {
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

    export function createArenaBackground(): string {
        const backgroundColor = Constants.Background.Tints.placeholder; // TODO update tint based on time of day
        const backgroundImage = "url(\"" + Constants.Resources.arenaBackground + "\")";
        const backgroundRepeat = "no-repeat";

        return backgroundColor + ", " +
                backgroundImage + ", " +
                backgroundRepeat;
    }
}