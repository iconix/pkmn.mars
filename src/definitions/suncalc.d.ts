// https://github.com/mourner/suncalc

declare module SunCalc {
    interface Times {
        sunrise: Date; // sunrise (top edge of the sun appears on the horizon)
        sunriseEnd: Date; // sunrise ends (bottom edge of the sun touches the horizon)
        goldenHourEnd: Date; // morning golden hour (soft light, best time for photography) ends
        solarNoon: Date; // solar noon (sun is in the highest position)
        goldenHour: Date; // evening golden hour starts
        sunsetStart: Date; // sunset starts (bottom edge of the sun touches the horizon)
        sunset: Date; // sunset (sun disappears below the horizon, evening civil twilight starts)
        dusk: Date; // dusk (evening nautical twilight starts)
        nauticalDusk: Date; // nautical dusk (evening astronomical twilight starts)
        night: Date; // night starts (dark enough for astronomical observations)
        nadir: Date; // nadir (darkest moment of the night, sun is in the lowest position)
        nightEnd: Date; // night ends (morning astronomical twilight starts)
        nauticalDawn: Date; // nautical dawn (morning nautical twilight starts)
        dawn: Date; // dawn (morning nautical twilight ends, morning civil twilight starts)
    }

	function getTimes(date: Date, latitude: number, longitude: number): Times;
}
