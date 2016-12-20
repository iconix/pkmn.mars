import {SceneState} from "../components/scene";

import {AttackReason} from "../stages/attackReason";
import {Stage} from "../stages/stage";

import {Location} from "../location";
import {Utils} from "../utils";

import {Battle} from "./battle";
import {BattleCharacter} from "./character";

export module BattleManager {
    export function getBattle(locationPackage: Location.Package): Battle {
        return new Battle(locationPackage, getRandAttacker(), getRandAttackReasonType());
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

    function getRandAttackReasonType(): AttackReason.Type {
        let numReasons = 0;
        for(let name in AttackReason.Type) {
            if (typeof AttackReason.Type[name] === "number") {
                numReasons++;
            }
        }
        return Utils.getRandomInt(numReasons - 1);
    }
}