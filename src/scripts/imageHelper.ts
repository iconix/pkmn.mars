import {BattleCharacter} from "./battles/character";

import {CharacterImage} from "./components/character";

import {Constants} from "./constants";
import {Utils} from "./utils";

export module ImageHelper {
    interface PlayerEmojiDate {
        month: number;
        day: number;
    }

    export function getEmojiImage(characterType: BattleCharacter.Type): CharacterImage {
        let imageSrc: string;

        switch(characterType) {
            case BattleCharacter.Type.Opponent:
                imageSrc = Constants.Resources.opponentEmojiImg;
                break;
            case BattleCharacter.Type.Player:
                let emojiDate: PlayerEmojiDate = getPlayerEmojiDate(new Date());
                imageSrc = Utils.formatString(Constants.Resources.playerEmojiImg, emojiDate.month.toString(), emojiDate.day.toString());
                break;
        }

        return {
            src: imageSrc
        };
    }

    function getPlayerEmojiDate(date: Date): PlayerEmojiDate {
        date = new Date(date.toDateString()); // zero-out the time segment

        let currentYear: number = date.getFullYear();
        let resultDate: number[];

        for (let emojiDate of Constants.Numbers.playerEmojiDates) {
            let emojiDateWithYear = new Date(currentYear, emojiDate[0] - 1, emojiDate[1]);
            if (date === emojiDateWithYear) {
                resultDate = emojiDate;
                break;
            } else if (date < emojiDateWithYear) {
                break;
            } else {
                resultDate = emojiDate;
            }
        }

        return {
            month: resultDate[0],
            day: resultDate[1]
        }
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

        return {
            src: imageSrc,
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

        return {
            src: imageSrc
        };
    }
}