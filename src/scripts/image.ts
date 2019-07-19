import {BattleCharacter} from './battles/character';

import {Constants} from './constants';
import {Utils} from './utils';

export module Image {
    export interface Image {
        imageProps: ImageProps;
        hidden?: boolean;
    }

    export interface ImageProps {
        src: string;
        alt: string;
    }
    interface EmojiDate {
        month: number;
        day: number;
        emoji: string;
    }

    export function getEmojiImage(characterType: BattleCharacter.Type): Image {
        let imageProps: ImageProps;

        switch(characterType) {
            case BattleCharacter.Type.Opponent:
                imageProps = {src: '', alt: Constants._.Battle.Characters.Opponent.emoji};
                break;
            case BattleCharacter.Type.Player:
                let emojiDate: EmojiDate = getEmojiForDate(Constants._.Numbers.playerEmojiDates, new Date());
                imageProps = {src: '', alt: Utils.formatString(Constants._.Battle.Characters.Player.emoji, emojiDate.emoji)};
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

    export function getGifImage(characterType: BattleCharacter.Type, hidden: boolean = false): Image {
        let imageSrc: string;

        switch(characterType) {
            case BattleCharacter.Type.Opponent:
                imageSrc = Constants._.Resources.opponentPokemonGif;
                break;
            case BattleCharacter.Type.Player:
                imageSrc = Constants._.Resources.playerPokemonGif;
                break;
        }

        let altText = Utils.formatString('{0} gif', BattleCharacter.Type[characterType]);

        return {
            imageProps: {src: imageSrc, alt: altText},
            hidden: hidden
        };
    }

    export function getMegaImage(characterType: BattleCharacter.Type): Image {
        let imageSrc: string;

        switch(characterType) {
            case BattleCharacter.Type.Opponent:
                imageSrc = Constants._.Resources.opponentMegaImg;
                break;
            case BattleCharacter.Type.Player:
                imageSrc = Constants._.Resources.playerMegaImg;
                break;
        }

        let altText = Utils.formatString('{0} mega evolution image', BattleCharacter.Type[characterType]);

        return {
            imageProps: {src: imageSrc, alt: altText}
        };
    }
}