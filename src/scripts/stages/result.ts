import {BattleCharacter} from "../battles/character";

import {Constants} from "../constants";
import {Utils} from "../utils";

export module Result {
    export enum Type {
        AttackFell,
        Burned,
        Confused,
        Fainted,
        Flinched,
        Frozen,
        HarshSunlight,
        HpRestored,
        Infatuated,
        Paralyzed,
        SpeedFell,
        WokeUp
    }

    export function getResultDialog(type: Result.Type, defender: BattleCharacter): string {
        let typeToDialogTemplateKey: string = Utils.lowercaseFirstLetter(Result.Type[type]);
        let dialogTemplate: string = ((<any>Constants.Battle.DialogText.Result)[typeToDialogTemplateKey]) as string;

        return Utils.formatString(dialogTemplate, defender.getName());
    }
}