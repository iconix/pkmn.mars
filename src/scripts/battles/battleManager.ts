import {SceneState} from "../components/scene";

import {AttackReason} from "../stages/attackReason";
import {Stage} from "../stages/stage";

import {Constants} from "../constants";
import {Location} from "../location";
import {Utils} from "../utils";

import {Battle} from "./battle";
import {BattleCharacter} from "./character";

export module BattleManager {
    export function getBattle(locationPackage: Location.Package): Battle {
        if (locationPackage) {
            let attackerType: BattleCharacter.Type = getRandAttacker();

            return new Battle(locationPackage, attackerType, getRandAttackReasonType(attackerType, locationPackage.distanceBetween));
        }
    }

    export function getNextState(state: SceneState, numActions: number): SceneState {
        let nextSceneState: SceneState = { stage: state.stage, actionIndex: state.actionIndex };

        // if we should remain in the same Scene.Stage
        if (state.actionIndex < (numActions - 1)) {
            nextSceneState.stage = state.stage;
            nextSceneState.actionIndex = state.actionIndex + 1;
            return nextSceneState;
        }

        // if we have run out of Scene.Stages, return the same state
        let numStages: number = 0;
        for(let type in Stage.Type) {
            if (typeof Stage.Type[type] === "number") {
                numStages++;
            }
        }
        if (state.stage >= (numStages - 1)) {
            return state;
        }

        // otherwise, advance to next Scene.Stage
        nextSceneState.stage = state.stage + 1;
        nextSceneState.actionIndex = 0;

        return nextSceneState;
    }

    function getRandAttacker(): BattleCharacter.Type {
        return Utils.getRandomInt(1);
    }

    function getRandAttackReasonType(attackerType: BattleCharacter.Type, distance: number): AttackReason.Type {
        let availableAttackReasonTypes: AttackReason.Type[] = [
            AttackReason.Type.EvolutionEmoji,
            AttackReason.Type.EvolutionMega
        ];

        if (attackerType === BattleCharacter.Type.Player) {
            // defender/opponent is Cold
            availableAttackReasonTypes.push(AttackReason.Type.TemperatureCold);
        } else {
            // defender/player is Hot
            availableAttackReasonTypes.push(AttackReason.Type.TemperatureHot);
        }

        if (distance < Constants.Numbers.maxPrettyCloseInMiles) {
            availableAttackReasonTypes.push(AttackReason.Type.DistanceClose);
            availableAttackReasonTypes.push(AttackReason.Type.DistanceClose);
            availableAttackReasonTypes.push(AttackReason.Type.DistanceClose);
            availableAttackReasonTypes.push(AttackReason.Type.DistanceClose);
        }
         else {
            availableAttackReasonTypes.push(AttackReason.Type.DistanceFar);
            availableAttackReasonTypes.push(AttackReason.Type.DistanceFar);
            availableAttackReasonTypes.push(AttackReason.Type.DistanceFar);
            availableAttackReasonTypes.push(AttackReason.Type.DistanceFar);
        }

        return availableAttackReasonTypes[Utils.getRandomInt(availableAttackReasonTypes.length - 1)];
    }
}