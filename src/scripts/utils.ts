export module Utils {
    export function getRandomInt(maxInt: number): number {
        return Math.floor(Math.random() * maxInt);
    }

    export function formatString(stringToFormat: string, ...replacements: string[]) {
        return stringToFormat.replace(/{(\d+)}/g,
            (match, number) => { return typeof replacements[number] != "undefined" ? replacements[number] : match; });
    };

    export function lowercaseFirstLetter(str: string) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
}
