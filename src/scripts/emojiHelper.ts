import {BattleCharacter} from "./battles/character";

import {Constants} from "./constants";
import {Utils} from "./utils";

export module EmojiHelper {
    export function getEmojiImageSrc(characterType: BattleCharacter.Type): string {
        switch(characterType) {
            case BattleCharacter.Type.Opponent:
                return Constants.Resources.opponentEmojiImg;
            case BattleCharacter.Type.Player:
                return Utils.formatString(Constants.Resources.playerEmojiImg, "12", "1"); // TODO generate correct month and day depending on current date
        }
    }
}