import {Action} from "../battles/action";
import {BattleCharacter} from "../battles/character";
import {Dialog} from "../battles/dialog";

import {Scene} from "../components/scene";

import {Attack} from "../stages/attack";
import {AttackReason} from "../stages/attackReason";
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
        BattleEnd = 5 // TODO this can go away if the final dialog goes away on its own after a few seconds
    }

    export abstract class Factory {
        protected actions: Action[];

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

        constructor(scene: Scene, location: Location.Package) {
            let animations: { [target: number]: Animation } = {};

            animations[BattleCharacter.Type.Player] = {
                animation: "transition.slideRightIn",
                duration: 500,
                runOnMount: true
            };

            animations[BattleCharacter.Type.Opponent] = {
                animation: "transition.slideLeftIn",
                duration: 500,
                runOnMount: true,
                complete: () => { scene.setState({ stage: Stage.Type.BattleStart, actionIndex: 1 }); }
            };

            // hardcoded: currently, all battles start in the same way
            let actions: Action[] = [
                { animations: animations},
                { animations: animations,
                    dialog: {
                    text: Utils.formatString(Constants.Battle.DialogText.start, location.distanceBetween.toString()),
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
            // TODO (optional) animate the reason (e.g., cold === shivering, or maybe add something to the field?)

            super(Stage.Type.AttackReason, actions);
        }
    }

    export class AttackFactory extends Factory {
        constructor(attacker: BattleCharacter, attack: Attack) {
            let actions: Action[] = [
                { dialog: {
                    text: Utils.formatString(Constants.Battle.DialogText.attack, attacker.getName(), attack.getAttackName()),
                    waitForTouchAfter: true
                }}
            ];
            // TODO add animation: on touch, Attacker lunges towards Defender. Defender flashes. dialog box should be hidden during this.

            super(Stage.Type.Attack, actions);
        }
    }

    export class ResultFactory extends Factory {
        constructor(type: Result.Type, defender: BattleCharacter) {
            // TODO add result animation, depending on result (e.g., fainted === defender disappears)
            let actions: Action[] = [
                { dialog: {
                    text: Result.getResultDialog(type, defender),
                    waitForTouchAfter: true
                }}
            ];

            super(Stage.Type.Result, actions);
        }
    }

    export class FinalDialogFactory extends Factory {
        constructor(type: FinalDialog.Type, attacker: BattleCharacter, defender: BattleCharacter, attack: Attack) {
            let actions: Action[] = [
                { dialog: {
                    text: FinalDialog.getFinalDialog(type, attacker, defender, attack.getAttackName()),
                    waitForTouchAfter: true
                }}
            ];

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
