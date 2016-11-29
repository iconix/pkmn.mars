export module Utils {
    export function getRandomInt(maxInt: number): number {
        return Math.floor(Math.random() * maxInt);
    }

    export function formatString(stringToFormat: string, ...replacements: string[]) {
        return stringToFormat.replace(/{(\d+)}/g,
            (match, number) => { return typeof replacements[number] != "undefined" ? replacements[number] : match; });
    };
}
