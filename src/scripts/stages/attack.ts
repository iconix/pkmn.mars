import {Action} from "../battles/action";

import {Scene} from "../components/scene";

import {Animation} from "../animation";

import {AttackReason} from "./attackReason";
import {Stage} from "./stage";

export class Attack {
    private name: Attack.Name;
    private animation: Animation;

    private attackReason: AttackReason.Type;
    //private result: Result.Type;
    //private finalDialog: FinalDialog.Type;

    constructor(name: Attack.Name) {
        this.name = name;

        // TODO Map the animation
        // TODO Map to proper Result, FinalDialog
        this.setAttackReasonType();
    }

    public getAttackAnimation(): Animation {
        return this.animation;
    }

    public getAttackName(): string {
        return Attack.Name[this.name]; // TODO spacing of returned name
    }

    public getAttackReasonType(): AttackReason.Type {
        return this.attackReason;
    }

    private setAttackReasonType(): void {
        switch (this.name) {
            case Attack.Name.Bite:
            case Attack.Name.BodySlam:
            case Attack.Name.Lick:
            case Attack.Name.Nuzzle:
            case Attack.Name.PlayRough:
            case Attack.Name.WakeUpSlap: // TODO has ExtraAttackReason
                this.attackReason = AttackReason.Type.DistanceClose;
                break;
            case Attack.Name.Attract:
            case Attack.Name.Frustration:
            case Attack.Name.HeartStamp:
            case Attack.Name.Outrage:
            case Attack.Name.Present:
                this.attackReason = AttackReason.Type.DistanceFar;
                break;
            case Attack.Name.Emoji:
                this.attackReason = AttackReason.Type.EvolutionEmoji;
                break;
            case Attack.Name.Mega:
                this.attackReason = AttackReason.Type.EvolutionMega;
                break;
            case Attack.Name.HeatWave:
            case Attack.Name.SunnyDay:
                this.attackReason = AttackReason.Type.TemperatureCold;
                break;
            case Attack.Name.FreezeDry:
            case Attack.Name.IcyWind:
                this.attackReason = AttackReason.Type.TemperatureHot;
                break;
        }
    }

    //public getResultType(): Result.Type {

    //}

    //public getFinalDialogType(): FinalDialog.Type {

    //}
}

export module Attack {
    export enum Name {
        Attract,
        Bite,
        BodySlam,
        Emoji,
        FreezeDry,
        Frustration,
        HeartStamp,
        HeatWave,
        IcyWind,
        Lick,
        Mega,
        Nuzzle,
        Outrage,
        PlayRough,
        Present,
        SunnyDay,
        WakeUpSlap
    }
}
