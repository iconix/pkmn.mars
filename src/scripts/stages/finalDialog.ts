import {BattleCharacter} from "../battles/character";

import {Animation} from "../animation";
import {Constants} from "../constants";
import {Utils} from "../utils";

export module FinalDialog {
    export enum Type {
        DidGood,
        EvolutionComplete,
        MeantWell,
        StillLiked
    }

    export function getAttackerAnimation(type: FinalDialog.Type): Animation {
        let animationName: string;
        let duration: number = 500;

        switch (type) {
            case FinalDialog.Type.DidGood:
            case FinalDialog.Type.EvolutionComplete:
                animationName = "callout.bounce";
                break;
            case FinalDialog.Type.MeantWell:
                animationName = "callout.tada";
                duration = 100;
                break;
            default:
                return;
        }

        return {
            animation: animationName,
            duration: duration,
            runOnMount: true,
            advanceStage: true
        };
    }

    export function getDefenderAnimation(type: FinalDialog.Type): Animation {
        switch (type) {
            case FinalDialog.Type.StillLiked:
                return {
                    animation: "callout.bounce",
                    duration: 500,
                    runOnMount: true,
                    advanceStage: true
                };
            default:
                return;
        }
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
