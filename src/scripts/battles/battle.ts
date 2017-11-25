import {CharacterImage} from "../components/character";

import {Level} from "../logging/logger";
import {LogManager} from "../logging/logManager";

import {Attack} from "../stages/attack";
import {AttackReason} from "../stages/attackReason";
import {FinalDialog} from "../stages/finalDialog";
import {Result} from "../stages/result";
import {Stage} from "../stages/stage";

import {Animation} from "../animation";
import {Constants} from "../constants";
import {Location} from "../location";
import {Utils} from "../utils";

import {Action} from "./action";
import {BattleCharacter} from "./character";

export class Battle {
    private attack: Attack;
    private attacker: BattleCharacter;
    private defender: BattleCharacter;
    private location: Location.Data;

    constructor(location: Location.Data, attackerType: BattleCharacter.Type, attackReasonType: AttackReason.Type) {
        this.attack = new Attack(attackReasonType, location.distanceBetween);
        this.attacker = new BattleCharacter(attackerType);
        this.defender = new BattleCharacter(BattleCharacter.getOtherBattleCharacter(attackerType));
        this.location = location;

        LogManager.getLogger().log(Level.Info, {
            attacker: this.attacker.getName() || "",
            defender: this.defender.getName() || "",
            attackReason: AttackReason.Type[this.attack.getAttackReasonType()] || "",
            attack: this.attack.getAttackName() || "",
            result: Result.Type[this.attack.getResultType()] || "",
            finalDialog: FinalDialog.Type[this.attack.getFinalDialogType()] || ""
        });
    }

    public getAttacker(): BattleCharacter {
        return this.attacker;
    }

    public getDefender(): BattleCharacter {
        return this.defender;
    }

    public getLocationData(): Location.Data {
        return this.location;
    }

    public getCharacterImgSrc(characterType: BattleCharacter.Type, stageType: Stage.Type): CharacterImage {
        if (characterType === BattleCharacter.Type.Opponent) {
            return this.attack.getOpponentImageSrc(stageType, this.attacker.getType());
        } else {
            return this.attack.getPlayerImageSrc(stageType, this.attacker.getType());
        }
    }

    public getStageFactory(stage: Stage.Type): Stage.Factory {
        let factory: Stage.Factory;

        switch(stage) {
            case Stage.Type.BattleStart:
                factory = new Stage.BattleStartFactory(this.location, this.attacker, this.defender, this.attack);
                break;
            case Stage.Type.AttackReason:
                factory = new Stage.AttackReasonFactory(this.attack.getAttackReasonType(), this.attacker, this.defender, this.attack);
                break;
            case Stage.Type.Attack:
                factory = new Stage.AttackFactory(this.attacker, this.defender, this.attack);
                break;
            case Stage.Type.Result:
                factory = new Stage.ResultFactory(this.attack.getResultType(), this.attacker, this.defender);
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
