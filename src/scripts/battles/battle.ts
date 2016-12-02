import {Scene} from "../components/scene";

import {Stage} from "../stages/stage";

import {Animation} from "../animation";
import {Constants} from "../constants";
import {Utils} from "../utils";

import {Action} from "./action";
import {BattleCharacter} from "./character";

export class Battle {
    private attacker: BattleCharacter;
    private defender: BattleCharacter;

    //private attackReason: AttackReason; // reasonText
    //private attack: Attack; // attackText, attackAnimation
    //private result: Result; // resultText, resultAnimation
    //private finalDialog: FinalDialog; // finalText, character to populate in text

    constructor(attackerType: BattleCharacter.Type) {//, attack: Attack) {
        this.attacker = new BattleCharacter(attackerType);
        //this.defender = new BattleCharacter(defenderType);
        //this.attack = attack;

        // TODO Map Attack to proper AttackReason, Result, FinalDialog
    }

    public getAttacker(): BattleCharacter {
        return this.attacker;
    }

    public getDefender(): BattleCharacter {
        return this.defender;
    }

    /**
     * Tracks progress through battle and returns current action
     */
    public getCurrentAction(stage: Stage, subStage: number, scene: Scene): Action {
        switch(stage) {
            case Stage.BattleStart:
            case Stage.AttackReason:
            case Stage.Attack:
            case Stage.Result:
            case Stage.FinalDialog:
            case Stage.BattleEnd:
                return this.getBattleStart(subStage, scene);
        }
    }

    private getBattleStart(subStage: number, scene: Scene): Action {
        // hardcoded: currently, all battles start in the same way

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
            complete: () => { scene.setState({ stage: Stage.BattleStart, subStage: 1 }); }
        };

        // TODO Replace "1000" with distance between browser coordinates and Boosie coordinates
        let battleStart: Action[] = [
            { animations: animations},
            { dialogText: Utils.formatString(Constants.Battle.DialogText.init, "1000")}
        ];

        // TODO check subStage bounds

        return battleStart[subStage];
    }
}
