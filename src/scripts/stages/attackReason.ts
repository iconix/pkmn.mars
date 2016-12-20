import {BattleCharacter} from "../battles/character";

import {Constants} from "../constants";
import {Utils} from "../utils";

import {Attack} from "./attack";

export module AttackReason {
    export enum Type {
        DistanceClose, // TODO DistanceClose vs DistanceFar should be available based on distance
        DistanceFar,
        EvolutionEmoji,
        EvolutionMega,
        TemperatureCold,
        TemperatureHot
    }

    export function getAttackReasonDialog(type: AttackReason.Type, attacker: BattleCharacter, defender: BattleCharacter, attack: Attack): string {
        let distanceMagnitude: string = "pretty"; // TODO choose between "pretty"/"so" based on distance

        let randHotModifier: number = Utils.getRandomInt(1);
        let hotModifiers: string[][] = [
            ["super", "... ;)"],
            ["really", "!"]
        ];

        let extraReasonForWakeUpSlap: string = "";
        if (attack.getAttackName() === Attack.Name[Attack.Name.WakeUpSlap]) {
            // has ExtraAttackReason
            extraReasonForWakeUpSlap = Constants.Battle.DialogText.AttackReason.extraSleeping;
        }

        switch(type) {
            case AttackReason.Type.DistanceClose:
                return Utils.formatString(Constants.Battle.DialogText.AttackReason.distanceClose, defender.getName(), distanceMagnitude, extraReasonForWakeUpSlap);
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

    export function getAttackNamesByReasonType(reasonType: AttackReason.Type): Attack.Name[] {
        let attackNames: Attack.Name[];

        switch (reasonType) {
            case AttackReason.Type.DistanceClose:
                attackNames = [
                    Attack.Name.Bite,
                    Attack.Name.BodySlam,
                    Attack.Name.Lick,
                    Attack.Name.Nuzzle,
                    Attack.Name.PlayRough,
                    Attack.Name.WakeUpSlap
                ];
                break;
            case AttackReason.Type.DistanceFar:
                attackNames = [
                    Attack.Name.Attract,
                    Attack.Name.Frustration,
                    Attack.Name.HeartStamp,
                    Attack.Name.Outrage,
                    Attack.Name.Present
                ];
                break;
            case AttackReason.Type.EvolutionEmoji:
                attackNames = [
                    Attack.Name.Emoji
                ];
                break;
            case AttackReason.Type.EvolutionMega:
                attackNames = [
                    Attack.Name.Mega
                ];
                break;
            case AttackReason.Type.TemperatureCold:
                attackNames = [
                    Attack.Name.HeatWave,
                    Attack.Name.SunnyDay
                ];
                break;
            case AttackReason.Type.TemperatureHot:
                attackNames = [
                    Attack.Name.FreezeDry,
                    Attack.Name.IcyWind
                ];
                break;
        }

        return attackNames;
    }
}
