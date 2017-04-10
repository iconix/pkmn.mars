export module Utils {
    export function getRandomInt(maxInt: number): number {
        return Math.floor(Math.random() * (maxInt + 1));
    }

    export function formatString(stringToFormat: string, ...replacements: string[]) {
        return stringToFormat.replace(/{(\d+)}/g,
            (match, number) => { return typeof replacements[number] != "undefined" ? replacements[number] : match; });
    };

    export function lowercaseFirstLetter(str: string) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    // http://stackoverflow.com/a/13348618
    export function browserIsChrome() {
        let isChromium = (<any>window).chrome;
        let winNav = window.navigator;
        let vendorName = winNav.vendor;
        let isOpera = winNav.userAgent.indexOf("OPR") > -1;
        let isIEedge = winNav.userAgent.indexOf("Edge") > -1;
        let isIOSChrome = winNav.userAgent.match("CriOS");

        if (isIOSChrome){
            return true;
        } else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
            return true;
        } else {
            return false;
        }
    }
}
