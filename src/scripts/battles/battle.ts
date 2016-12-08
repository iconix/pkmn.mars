import {Scene} from "../components/scene";

import {Stage} from "../stages/stage";
import {Attack} from "../stages/attack";

import {Animation} from "../animation";
import {Constants} from "../constants";
import {Utils} from "../utils";

import {Action} from "./action";
import {BattleCharacter} from "./character";

export class Battle {
    private attacker: BattleCharacter;
    private defender: BattleCharacter;

    //private attackReason: AttackReason; // reasonText
    private attack: Attack; // attackText, attackAnimation
    //private result: Result; // resultText, resultAnimation
    //private finalDialog: FinalDialog; // finalText, character to populate in text

    constructor(attackerType: BattleCharacter.Type, attackName: Attack.Name) {
        this.attacker = new BattleCharacter(attackerType);
        //this.defender = new BattleCharacter(defenderType);
        this.attack = new Attack(attackName);

        // TODO Map Attack to proper AttackReason, Result, FinalDialog
    }

    public getAttacker(): BattleCharacter {
        return this.attacker;
    }

    public getDefender(): BattleCharacter {
        return this.defender;
    }

    public getStageFactory(stage: Stage.Type, scene: Scene): Stage.Factory {
        let factory: Stage.Factory;

        switch(stage) {
            case Stage.Type.BattleStart:
                factory = new Stage.BattleStartFactory(scene);
                break;
            case Stage.Type.AttackReason:
            case Stage.Type.Attack:
            case Stage.Type.Result:
            case Stage.Type.FinalDialog:
            case Stage.Type.BattleEnd:
                factory = new Stage.AttackFactory(this.attacker, this.attack);
        }

        return factory;
    }

    /**
     * Tracks progress through battle and returns current action
     */
}
