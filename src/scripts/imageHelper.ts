import {BattleCharacter} from "./battles/character";

import {CharacterImage} from "./components/character";

import {Constants} from "./constants";
import {Utils} from "./utils";

export module ImageHelper {
    export interface ImageProperties {
        src: string;
        alt: string;
    }

    interface EmojiDate {
        month: number;
        day: number;
        emoji: string;
    }

    export function getEmojiImage(characterType: BattleCharacter.Type): CharacterImage {
        let imageProps: ImageProperties;

        switch(characterType) {
            case BattleCharacter.Type.Opponent:
                imageProps = {src: "", alt: Constants.Battle.Characters.Opponent.emoji};
                break;
            case BattleCharacter.Type.Player:
                let emojiDate: EmojiDate = getEmojiForDate(Constants.Numbers.playerEmojiDates, new Date());
                imageProps = {src: "", alt: Utils.formatString(Constants.Battle.Characters.Player.emoji, emojiDate.emoji)};
                break;
        }

        return {
            imageProps: imageProps
        };
    }

    function getEmojiForDate(allDates: (string|number)[][], date: Date): EmojiDate {
        date = new Date(date.toDateString()); // zero-out the time segment

        let currentYear: number = date.getFullYear();
        let resultDate: EmojiDate;

        for (let emojiDate of allDates) {
            let emojiDateWithYear = new Date(currentYear, (emojiDate[0] as number) - 1, emojiDate[1] as number);
            if (date === emojiDateWithYear) {
                resultDate = { month: emojiDate[0] as number, day: emojiDate[1] as number, emoji: emojiDate[2] as string};
                break;
            } else if (date < emojiDateWithYear) {
                break;
            } else {
                resultDate = { month: emojiDate[0] as number, day: emojiDate[1] as number, emoji: emojiDate[2] as string};;
            }
        }

        return resultDate;
    }

    export function getGifImage(characterType: BattleCharacter.Type, hidden: boolean = false): CharacterImage {
        let imageSrc: string;

        switch(characterType) {
            case BattleCharacter.Type.Opponent:
                imageSrc = Constants.Resources.opponentPokemonGif;
                break;
            case BattleCharacter.Type.Player:
                imageSrc = Constants.Resources.playerPokemonGif;
                break;
        }

        let altText = Utils.formatString("{0} gif", BattleCharacter.Type[characterType]);

        return {
            imageProps: {src: imageSrc, alt: altText},
            hidden: hidden
        };
    }

    export function getMegaImage(characterType: BattleCharacter.Type): CharacterImage {
        let imageSrc: string;

        switch(characterType) {
            case BattleCharacter.Type.Opponent:
                imageSrc = Constants.Resources.opponentMegaImg;
                break;
            case BattleCharacter.Type.Player:
                imageSrc = Constants.Resources.playerMegaImg;
                break;
        }

        let altText = Utils.formatString("{0} mega evolution image", BattleCharacter.Type[characterType]);

        return {
            imageProps: {src: imageSrc, alt: altText}
        };
    }
}