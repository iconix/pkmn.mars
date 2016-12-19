import {Animation} from "../animation";

export module BattleStart {
    export function getPlayerAnimation(): Animation {
        return {
            animation: "transition.slideRightIn",
            duration: 500,
            runOnMount: true
        };
    }

    export function getOpponentAnimation(): Animation {
        return {
            animation: "transition.slideLeftIn",
            duration: 500,
            runOnMount: true,
            advanceStage: true
        };
    }
}