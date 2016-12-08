import {SceneState} from "../components/scene";

import {Attack} from "../stages/attack";
import {Stage} from "../stages/stage";

import {Battle} from "./battle";
import {BattleCharacter} from "./character";

export module BattleManager {
    export function getBattle(): Battle {
        return new Battle(getRandAttacker(), getRandAttackName());
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
        return BattleCharacter.Type.Player; // TODO randomize between Player and Opponent
    }

    function getRandAttackName(): Attack.Name {
        return Attack.Name.Attract; // TODO randomize name returned
    }
}