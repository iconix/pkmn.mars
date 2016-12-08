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
    private attack: Attack;

    constructor(attackerType: BattleCharacter.Type, attackName: Attack.Name) {
        this.attacker = new BattleCharacter(attackerType);
        this.defender = new BattleCharacter(BattleCharacter.getOtherBattleCharater(attackerType));
        this.attack = new Attack(attackName);
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
                factory = new Stage.AttackReasonFactory(this.attack.getAttackReasonType(), this.attacker, this.defender);
                break;
            case Stage.Type.Attack:
                factory = new Stage.AttackFactory(this.attacker, this.attack);
                break;
            case Stage.Type.Result:
                factory = new Stage.ResultFactory(this.attack.getResultType(), this.defender);
                break;
            case Stage.Type.FinalDialog:
                factory = new Stage.FinalDialogFactory(this.attack.getFinalDialogType(), this.attacker, this.defender, this.attack);
                break;
            case Stage.Type.BattleEnd:
                factory = new Stage.BattleEndFactory();
                break;
        }

        return factory;
    }

    /**
     * Tracks progress through battle and returns current action
     */
}
