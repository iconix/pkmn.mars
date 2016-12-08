import {BattleCharacter} from "../battles/character";

import {Constants} from "../constants";
import {Utils} from "../utils";

export module AttackReason {
    export enum Type {
        DistanceClose, // TODO DistanceClose vs DistanceFar should be available based on distance
        DistanceFar,
        EvolutionEmoji,
        EvolutionMega,
        TemperatureCold,
        TemperatureHot
    }

    export function getAttackReasonDialog(type: AttackReason.Type, attacker: BattleCharacter, defender: BattleCharacter): string {
        let distanceMagnitude: string = "pretty"; // TODO choose between "pretty"/"so" based on distance

        let randHotModifier: number = Utils.getRandomInt(1);
        let hotModifiers: string[][] = [
            ["super", "... ;)"],
            ["really", "!"]
        ];

        switch(type) {
            case AttackReason.Type.DistanceClose:
                return Utils.formatString(Constants.Battle.DialogText.AttackReason.distanceClose, defender.getName(), distanceMagnitude);
            case AttackReason.Type.DistanceFar:
                return Utils.formatString(Constants.Battle.DialogText.AttackReason.distanceFar, defender.getName(), distanceMagnitude);
            case AttackReason.Type.EvolutionEmoji:
                return Utils.formatString(Constants.Battle.DialogText.AttackReason.evolutionEmoji, attacker.getName());
            case AttackReason.Type.EvolutionMega:
                return Utils.formatString(Constants.Battle.DialogText.AttackReason.evolutionMega, attacker.getName(), attacker.getEvoStoneName(), attacker.getTrainer());
            case AttackReason.Type.TemperatureCold:
                return Constants.Battle.DialogText.AttackReason.temperatureCold;
            case AttackReason.Type.TemperatureHot:
                return Utils.formatString(Constants.Battle.DialogText.AttackReason.temperatureHot, hotModifiers[randHotModifier][0], hotModifiers[randHotModifier][1]);
        }
    }
}
