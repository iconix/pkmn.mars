import {BattleCharacter} from "../battles/character";

import {Constants} from "../constants";
import {Utils} from "../utils";

export module FinalDialog {
    export enum Type {
        DidGood,
        EvolutionComplete,
        MeantWell,
        StillLiked
    }

    export function getFinalDialog(type: FinalDialog.Type, attacker: BattleCharacter, defender: BattleCharacter, attackName: string): string {
        switch (type) {
            case FinalDialog.Type.DidGood:
                return Utils.formatString(Constants.Battle.DialogText.FinalDialog.didGood, attacker.getName());
            case FinalDialog.Type.EvolutionComplete:
                return Utils.formatString(Constants.Battle.DialogText.FinalDialog.evolutionComplete, attacker.getName(), attackName);
            case FinalDialog.Type.MeantWell:
                return Utils.formatString(Constants.Battle.DialogText.FinalDialog.meantWell, attacker.getName());
            case FinalDialog.Type.StillLiked:
                return Utils.formatString(Constants.Battle.DialogText.FinalDialog.stillLiked, defender.getName());
        }
    }
}
