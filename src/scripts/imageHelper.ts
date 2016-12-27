import {BattleCharacter} from "./battles/character";

import {CharacterImage} from "./components/character";

import {Constants} from "./constants";
import {Utils} from "./utils";

export module ImageHelper {
    export function getEmojiImage(characterType: BattleCharacter.Type): CharacterImage {
        let imageSrc: string;

        switch(characterType) {
            case BattleCharacter.Type.Opponent:
                imageSrc = Constants.Resources.opponentEmojiImg;
                break;
            case BattleCharacter.Type.Player:
                imageSrc = Utils.formatString(Constants.Resources.playerEmojiImg, "12", "1"); // TODO generate correct month and day depending on current date
                break;
        }

        return {
            src: imageSrc
        };
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