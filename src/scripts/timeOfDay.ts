import * as SunCalc from "suncalc";

import {Constants} from "./constants";
import {Location} from "./location";

export module TimeOfDay {
    // TODO Tint an overlay instead of background (so pkmn are tinted too)
    export function getTint(coordinates: Location.Coordinates): string {
        let tintsMap: { [ key: number]: string } = {
            1 : Constants.Background.Tints.yellow,
            2 : Constants.Background.Tints.blue,
            3 : Constants.Background.Tints.orange
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
    function getTimeOfDay(date: Date, coordinates: Location.Coordinates): Constants.TimeOfDay {
        let sunCalcTimes: SunCalc.Times = SunCalc.getTimes(date, coordinates.latitude, coordinates.longitude);

        let boundaries: TimeBoundaries = {
            startOfDay: sunCalcTimes.goldenHourEnd, // TODO sunriseEnd instead?
            endOfDay: sunCalcTimes.goldenHour, // TODO sunsetStart instead?
            startOfNight: sunCalcTimes.night,
            endOfNight: sunCalcTimes.nightEnd
        };

        let timeOfDay: Constants.TimeOfDay;
        if (date < boundaries.startOfDay) {
            if (date > boundaries.endOfNight) {
                timeOfDay = Constants.TimeOfDay.DDK; // Dawn
            } else {
                timeOfDay = Constants.TimeOfDay.NHT; // Night
            }
        } else {
            if (date < boundaries.endOfDay) {
                timeOfDay = Constants.TimeOfDay.DAY; // Day
            } else if (date < boundaries.startOfNight) {
                timeOfDay = Constants.TimeOfDay.DDK; // Dusk
            } else {
                timeOfDay = Constants.TimeOfDay.NHT; // Night
            }
        }

        console.log(date.toTimeString(), "at", Constants.TimeOfDay[timeOfDay]);

        return timeOfDay;
    }
}