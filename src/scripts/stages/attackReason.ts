import {BattleCharacter} from "../battles/character";

import {Constants} from "../constants";
import {Utils} from "../utils";

export module AttackReason {
    export enum Type {
        DistanceClose,
        DistanceFar,
        EvolutionEmoji,
        EvolutionMega,
        TemperatureCold,
        TemperatureHot
    }

    export function getAttackReasonDialog(type: AttackReason.Type, attacker: BattleCharacter, defender: BattleCharacter): string {
        let distanceMagnitude: string = "pretty"; // TODO choose between "pretty"/"so" based on distance
        let hotModifiers: string[] = ["super", "... ;)"]; // TODO randomize choice between this and ["really", "!"]

        switch(type) {
            case AttackReason.Type.DistanceClose:
                return Utils.formatString(Constants.Battle.DialogText.attackReasonDistanceClose, defender.getName(), distanceMagnitude);
            case AttackReason.Type.DistanceFar:
                return Utils.formatString(Constants.Battle.DialogText.attackReasonDistanceFar, defender.getName(), distanceMagnitude);
            case AttackReason.Type.EvolutionEmoji:
                return Utils.formatString(Constants.Battle.DialogText.attackReasonEvolutionEmoji, attacker.getName());
            case AttackReason.Type.EvolutionMega:
                return Utils.formatString(Constants.Battle.DialogText.attackReasonEvolutionMega, attacker.getName(), attacker.getEvoStoneName(), attacker.getTrainer());
            case AttackReason.Type.TemperatureCold:
                return Constants.Battle.DialogText.attackReasonTemperatureCold;
            case AttackReason.Type.TemperatureHot:
                return Utils.formatString(Constants.Battle.DialogText.attackReasonTemperatureHot, hotModifiers[0], hotModifiers[1]);
        }
    }
}
