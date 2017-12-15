import {Constants} from "./constants";
import {Location} from "./location";
import {TimeOfDay} from "./timeOfDay";
import {Utils} from "./utils";

import {Level} from "./logging/logger";
import {LogManager} from "./logging/logManager";

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

    export function createArenaBackground(coordinates: Location.Coordinates): Styles {
        return {
            Position: randomizeBackground(),
            Color: TimeOfDay.getTint(coordinates),
            Image: "url(\"" + Constants._.Resources.arenaBackground + "\")",
            Repeat: "no-repeat"
        };
    }

    function randomizeBackground(): Position {
        const backgroundPositionX = Constants._.Background.SpritePositions.XPositions;
        const backgroundPositionY = Constants._.Background.SpritePositions.YPositions;

        let numBackgrounds = backgroundPositionX.length * backgroundPositionY.length;
        let randBackground = Utils.getRandomInt(numBackgrounds - 1);

        let randXIndex: number = randBackground % backgroundPositionX.length;
        let randYIndex: number = Math.floor(randBackground / backgroundPositionX.length);

        LogManager.getLogger().log(Level.Debug, `Selected ${Constants._.TimeOfDay[Constants._.Background.timeOfDayMapping[randBackground]]} background ${randBackground + 1} of ${numBackgrounds}`);

        let randXPos: number = backgroundPositionX[randXIndex];
        let randYPos: number = backgroundPositionY[randYIndex];

        return { X: randXPos, Y: randYPos };
    }
}