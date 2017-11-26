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
        WokeUp
    }

    export function getAttackerAnimation(type: Result.Type): Animation {
        let animationName: string;

        switch (type) {
            case Result.Type.EmojiEvolved:
            case Result.Type.MegaEvolved:
                animationName = "callout.flash";
                break;
            case Result.Type.HarshSunlight:
                animationName = "callout.swing";
                break;
            default:
                return;
        }

        return {
            animation: animationName,
            duration: 500,
            runOnMount: true,
            advanceState: true
        };
    }

    export function getDefenderAnimation(type: Result.Type): Animation {
        let animationName: string;
        let duration: number = 500;

        switch (type) {
            case Result.Type.EmojiEvolved:
            case Result.Type.MegaEvolved:
                return;
            case Result.Type.Fainted:
                animationName = "transition.fadeOut";
                break;
            case Result.Type.WokeUp:
            case Result.Type.Infatuated:
            case Result.Type.HpRestored:
                animationName = "callout.bounce";
                break;
            case Result.Type.Flinched:
                animationName = "callout.tada";
                break;
            case Result.Type.Frozen:
            case Result.Type.Paralyzed:
                animationName = "callout.tada";
                duration = 100;
                break;
            default:
                animationName = "callout.swing";
                break;
        }

        return {
            animation: animationName,
            duration: duration,
            runOnMount: true,
            advanceState: true
        };
    }

    export function getResultDialog(type: Result.Type, defender: BattleCharacter): string {
        let typeToDialogTemplateKey: string = Utils.lowercaseFirstLetter(Result.Type[type]);
        let dialogTemplate: string = ((<any>Constants.Battle.DialogText.Result)[typeToDialogTemplateKey]) as string;

        if (dialogTemplate) {
            return Utils.formatString(dialogTemplate, defender.getName());
        }
    }
}