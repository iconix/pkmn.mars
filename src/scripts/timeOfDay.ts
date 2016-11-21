/// <reference path="../definitions/suncalc.d.ts"/>

import {Constants} from "./constants";
import {Location} from "./location";

export module TimeOfDay {
    export function getTint(coordinates: Location.Coordinates): string {
        // TODO update tint based on time of day
        let tintsMap: { [ key: number]: string } = {
            1 : Constants.Background.Tints.placeholder,
            2 : Constants.Background.Tints.placeholder,
            3 : Constants.Background.Tints.placeholder
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
            }
            timeOfDay = Constants.TimeOfDay.NHT; // Night
        } else {
            if (date < boundaries.endOfDay) {
                timeOfDay = Constants.TimeOfDay.DAY; // Day
            } else if (date < boundaries.startOfNight) {
                timeOfDay = Constants.TimeOfDay.DDK; // Dusk
            }
            timeOfDay = Constants.TimeOfDay.NHT; // Night
        }

        console.log(date.toTimeString(), "at", Constants.TimeOfDay[timeOfDay]);

        return timeOfDay;
    }
}