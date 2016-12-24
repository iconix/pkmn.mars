import {Action} from "../battles/action";
import {BattleCharacter} from "../battles/character";
import {Dialog} from "../battles/dialog";

import {Attack} from "../stages/attack";
import {AttackReason} from "../stages/attackReason";
import {BattleStart} from "../stages/battleStart";
import {FinalDialog} from "../stages/finalDialog";
import {Result} from "../stages/result";

import {Animation} from "../animation";
import {Constants} from "../constants";
import {Location} from "../location";
import {Utils} from "../utils";

export module Stage {
    export enum Type {
        BattleStart = 0,
        AttackReason = 1,
        Attack = 2,
        Result = 3,
        FinalDialog = 4,
        BattleEnd = 5
    }

    export abstract class Factory {
        private actions: Action[];

        constructor(type: Stage.Type, actions: Action[]) {
            this.type = type;
            this.actions = actions;
        }

        public getAction(actionIndex: number): Action {
            // TODO check actionIndex bounds
            return this.actions[actionIndex];
        }

        public getNumActions(): number {
            return this.actions.length;
        }

        private type: Stage.Type;
    }

    export class BattleStartFactory extends Factory {

        constructor(defender: BattleCharacter, location: Location.Package) {
            let animations: { [target: number]: Animation } = {};
            animations[BattleCharacter.Type.Player] = BattleStart.getPlayerAnimation();
            animations[BattleCharacter.Type.Opponent] = BattleStart.getOpponentAnimation();

            // hardcoded: currently, all battles start in the same way
            let actions: Action[] = [
                { animations: animations},
                { animations: animations,
                    dialog: {
                    text: Utils.formatString(Constants.Battle.DialogText.start, defender.getName(), location.distanceBetween.toString()),
                    waitForTouchAfter: true
                }}
            ];

            super(Stage.Type.BattleStart, actions);
        }
    }

    export class AttackReasonFactory extends Factory {
        constructor(type: AttackReason.Type, attacker: BattleCharacter, defender: BattleCharacter, attack: Attack) {
            let actions: Action[] = [
                { dialog: {
                    text: AttackReason.getAttackReasonDialog(type, attacker, defender, attack),
                    waitForTouchAfter: true
                }}
            ];

            super(Stage.Type.AttackReason, actions);
        }
    }

    export class AttackFactory extends Factory {
        constructor(attacker: BattleCharacter, defender: BattleCharacter, attack: Attack) {
            let attackerAnimation: { [target: number]: Animation } = {};
            attackerAnimation[attacker.getType()] = attack.getAttackerAnimation();

            let defenderAnimation: { [target: number]: Animation } = {};
            defenderAnimation[defender.getType()] = attack.getDefenderAnimation();

            let attackDialog: string = Utils.formatString(Constants.Battle.DialogText.attack, attacker.getName(), attack.getAttackName());

            let actions: Action[] = [];

            if (attackDialog && attack.getAttack() !== Attack.Name.Emoji && attack.getAttack() !== Attack.Name.Mega) {
                actions.push({ dialog: {
                    text: attackDialog,
                    waitForTouchAfter: true
                }});
            }

            if (attackerAnimation[attacker.getType()]) {
                actions.push({ animations: attackerAnimation });
            }

            if (defenderAnimation[defender.getType()]) {
                actions.push({ animations: defenderAnimation });
            }

            super(Stage.Type.Attack, actions);
        }
    }

    export class ResultFactory extends Factory {
        constructor(type: Result.Type, attacker: BattleCharacter, defender: BattleCharacter) {
            let attackerAnimation: { [target: number]: Animation } = {};
            attackerAnimation[attacker.getType()] = Result.getAttackerAnimation(type);

            let defenderAnimation: { [target: number]: Animation } = {};
            defenderAnimation[defender.getType()] = Result.getDefenderAnimation(type);

            let resultDialog: string = Result.getResultDialog(type, defender);

            let actions: Action[] = [];

            if (defenderAnimation[defender.getType()]) {
                actions.push({ animations: defenderAnimation });
            }

            if (attackerAnimation[attacker.getType()]) {
                actions.push({ animations: attackerAnimation });
            }

            if (resultDialog) {
                actions.push({ dialog: {
                    text: resultDialog,
                    waitForTouchAfter: true
                }});
            }

            super(Stage.Type.Result, actions);
        }
    }

    export class FinalDialogFactory extends Factory {
        constructor(type: FinalDialog.Type, attacker: BattleCharacter, defender: BattleCharacter, attack: Attack) {
            let attackerAnimation: { [target: number]: Animation } = {};
            attackerAnimation[attacker.getType()] = FinalDialog.getAttackerAnimation(type);

            let defenderAnimation: { [target: number]: Animation } = {};
            defenderAnimation[defender.getType()] = FinalDialog.getDefenderAnimation(type);

            let finalDialog: string = FinalDialog.getFinalDialog(type, attacker, defender, attack.getAttackName());

            let actions: Action[] = [];

            if (attackerAnimation[attacker.getType()]) {
                actions.push({ animations: attackerAnimation });
            }

            if (defenderAnimation[defender.getType()]) {
                actions.push({ animations: defenderAnimation });
            }

            if (finalDialog) {
                actions.push({ dialog: {
                    text: finalDialog,
                    waitForTouchAfter: true
                }});
            }

            super(Stage.Type.FinalDialog, actions);
        }
    }

    export class BattleEndFactory extends Factory {
        constructor() {
            let actions: Action[] = [];
            super(Stage.Type.BattleEnd, actions);
        }
    }
}
