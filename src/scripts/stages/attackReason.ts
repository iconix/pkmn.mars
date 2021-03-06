import {BattleCharacter} from "../battles/character";

import {Constants} from "../constants";
import {Utils} from "../utils";

import {Attack} from "./attack";

export module AttackReason {
    export enum Type {
        DistanceClose,
        DistanceFar,
        EvolutionEmoji,
        EvolutionMega,
        TemperatureCold,
        TemperatureHot
    }

    export interface Modifiers {
        distanceMagnitude: string;
        hotnessMagnitude: string;
    }

    export function getModifiers(distance: number): Modifiers {
        let distanceMagnitude: string;
        if (distance < Constants._.Numbers.maxSoCloseInMiles || distance >= Constants._.Numbers.maxPrettyFarInMiles) {
            distanceMagnitude = Constants._.Battle.DialogText.AttackReason.Modifiers.distanceExtreme;
        } else {
            distanceMagnitude = Constants._.Battle.DialogText.AttackReason.Modifiers.distanceModerate;
        }

        let randHotModifier: number = Utils.getRandomInt(1);
        let hotModifiers: string[] = [
            Constants._.Battle.DialogText.AttackReason.Modifiers.hotness1,
            Constants._.Battle.DialogText.AttackReason.Modifiers.hotness2
        ];

        return {
            distanceMagnitude: distanceMagnitude,
            hotnessMagnitude: hotModifiers[randHotModifier]
        }
    }

    export function getAttackReasonDialog(type: AttackReason.Type, attacker: BattleCharacter, defender: BattleCharacter, attack: Attack): string {
        let distanceMagnitude: string = attack.getAttackReasonModifiers().distanceMagnitude;
        let hotnessMagnitude: string = attack.getAttackReasonModifiers().hotnessMagnitude;

        let extraReasonForWakeUpSlap: string = "";
        if (attack.getAttack() === Attack.Name.WakeUpSlap) {
            // has ExtraAttackReason
            extraReasonForWakeUpSlap = Constants._.Battle.DialogText.AttackReason.extraSleeping;
        }

        switch(type) {
            case AttackReason.Type.DistanceClose:
                return Utils.formatString(Constants._.Battle.DialogText.AttackReason.distanceClose, defender.getName(), distanceMagnitude, extraReasonForWakeUpSlap);
            case AttackReason.Type.DistanceFar:
                return Utils.formatString(Constants._.Battle.DialogText.AttackReason.distanceFar, defender.getName(), distanceMagnitude);
            case AttackReason.Type.EvolutionEmoji:
                return Utils.formatString(Constants._.Battle.DialogText.AttackReason.evolutionEmoji, attacker.getName());
            case AttackReason.Type.EvolutionMega:
                return Utils.formatString(Constants._.Battle.DialogText.AttackReason.evolutionMega, attacker.getName(), attacker.getEvoStoneName(), attacker.getTrainer());
            case AttackReason.Type.TemperatureCold:
                return Utils.formatString(Constants._.Battle.DialogText.AttackReason.temperatureCold, Constants._.Battle.Characters.Opponent.name);
            case AttackReason.Type.TemperatureHot:
                return Utils.formatString(Constants._.Battle.DialogText.AttackReason.temperatureHot, Constants._.Battle.Characters.Player.name, hotnessMagnitude);
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
