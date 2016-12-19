import {BattleCharacter} from "../battles/character";

import {Animation} from "../animation";
import {Constants} from "../constants";
import {Utils} from "../utils";

import {Stage} from "./stage";

export module Result {
    export enum Type {
        AttackFell,
        Burned,
        Confused,
        EmojiEvolved,
        Fainted,
        Flinched,
        Frozen,
        HarshSunlight,
        HpRestored,
        Infatuated,
        MegaEvolved,
        Paralyzed,
        SpeedFell,
        WokeUp // TODO defender animation "callout.bounce"
    }

    export function getAttackerAnimation(type: Result.Type): Animation {
        switch (type) {
            case Result.Type.EmojiEvolved:
            case Result.Type.MegaEvolved:
                return {
                    animation: "callout.flash", // TODO VelocityComponent doesn't support two "callout.bounce" in a row - make character use VelocityTransitionGroup, then switch this back to bounce
                    duration: 500,
                    runOnMount: true,
                    advanceStage: true
                };
            default:
                return;
        }
    }

    export function getDefenderAnimation(type: Result.Type): Animation {
        switch (type) {
            case Result.Type.EmojiEvolved:
            case Result.Type.MegaEvolved:
                return;
            default:
                return {
                    animation: "callout.bounce",
                    duration: 500,
                    runOnMount: true,
                    advanceStage: true
                };
        }
    }

    export function getResultDialog(type: Result.Type, defender: BattleCharacter): string {
        let typeToDialogTemplateKey: string = Utils.lowercaseFirstLetter(Result.Type[type]);
        let dialogTemplate: string = ((<any>Constants.Battle.DialogText.Result)[typeToDialogTemplateKey]) as string;

        if (dialogTemplate) {
            return Utils.formatString(dialogTemplate, defender.getName());
        }
    }
}