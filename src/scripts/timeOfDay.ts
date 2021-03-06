import * as SunCalc from "suncalc";

import {Level} from "./logging/logger";
import {LogManager} from "./logging/logManager";

import {Constants} from "./constants";
import {Location} from "./location";

export module TimeOfDay {
    // TODO: Tint an overlay instead of background (so pkmn are tinted too)
    export function getTint(coordinates: Location.Coordinates): string {
        let tintsMap: { [ key: number]: string } = {
            1 : Constants._.Background.Tints.yellow,
            2 : Constants._.Background.Tints.blue,
            3 : Constants._.Background.Tints.orange
        };

        return tintsMap[getTimeOfDay(new Date(), coordinates)];
    }

    interface TimeBoundaries {
        startOfDay: Date;
        endOfDay: Date;
        startOfNight: Date;
        endOfNight: Date;
    }

    /**
     * Timeline of a calendar day:
     * [BEGIN] --> [Night] --> [EndOfNight] --> [Dawn] --> [StartOfDay] --> [Day] --> [EndOfDay] --> [Dusk] --> [StartOfNight] --> [Night] --> [END]
     */
    function getTimeOfDay(date: Date, coordinates: Location.Coordinates): Constants._.TimeOfDay {
        let sunCalcTimes: SunCalc.Times = SunCalc.getTimes(date, coordinates.latitude, coordinates.longitude);

        let boundaries: TimeBoundaries = {
            startOfDay: sunCalcTimes.goldenHourEnd, // TODO: sunriseEnd instead?
            endOfDay: sunCalcTimes.goldenHour, // TODO: sunsetStart instead?
            startOfNight: sunCalcTimes.night,
            endOfNight: sunCalcTimes.nightEnd
        };

        let timeOfDay: Constants._.TimeOfDay;
        if (date < boundaries.startOfDay) {
            if (date > boundaries.endOfNight) {
                timeOfDay = Constants._.TimeOfDay.DDK; // Dawn
            } else {
                timeOfDay = Constants._.TimeOfDay.NHT; // Night
            }
        } else {
            if (date < boundaries.endOfDay) {
                timeOfDay = Constants._.TimeOfDay.DAY; // Day
            } else if (date < boundaries.startOfNight) {
                timeOfDay = Constants._.TimeOfDay.DDK; // Dusk
            } else {
                timeOfDay = Constants._.TimeOfDay.NHT; // Night
            }
        }

        LogManager.getLogger().log(Level.Debug, `${date.toTimeString()} at ${Constants._.TimeOfDay[timeOfDay]}`);

        return timeOfDay;
    }
}