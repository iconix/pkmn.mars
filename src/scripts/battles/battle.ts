import {Scene} from "../components/scene";

import {Attack} from "../stages/attack";
import {AttackReason} from "../stages/attackReason";
import {FinalDialog} from "../stages/finalDialog";
import {Result} from "../stages/result";
import {Stage} from "../stages/stage";

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

        console.log({
            attacker: this.attacker.getName(),
            defender: this.defender.getName(),
            attackReason: AttackReason.Type[this.attack.getAttackReasonType()],
            attack: this.attack.getAttackName(),
            result: Result.Type[this.attack.getResultType()],
            finalDialog: FinalDialog.Type[this.attack.getFinalDialogType()]
        });
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
