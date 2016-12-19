import {Action} from "../battles/action";

import {Scene} from "../components/scene";

import {Animation} from "../animation";

import {AttackReason} from "./attackReason";
import {FinalDialog} from "./finalDialog";
import {Result} from "./result";
import {Stage} from "./stage";

export class Attack {
    private name: Attack.Name;
    private animation: Animation;

    private attackReason: AttackReason.Type;
    private result: Result.Type;
    private finalDialog: FinalDialog.Type;

    constructor(name: Attack.Name) {
        this.name = name;

        this.setAttackReasonType();
        this.setResultType();
        this.setFinalDialogType();
    }

    public getAttack(): Attack.Name {
        return this.name;
    }

    public getAttackName(): string {
        return Attack.Name[this.name].match(/[A-Z][^A-Z]+/g).join(" ");
    }

    public getAttackerAnimation(scene: Scene): Animation {
        let animationName: string;

        switch (this.name) {
            case Attack.Name.Mega:
            case Attack.Name.Emoji:
                animationName = "callout.pulse"; // TODO loop this animation 3x?
                break;
            default:
                animationName = "callout.shake";
        }

        return {
            animation: animationName,
            duration: 500,
            runOnMount: true,
            complete: () => { scene.setState({ stage: Stage.Type.Attack, actionIndex: 2 }); }
        };
    }

    public getDefenderAnimation(scene: Scene): Animation {
        let animationName: string;

        switch (this.name) {
            case Attack.Name.Mega:
            case Attack.Name.Emoji:
                break; // TODO this might be a problem...
            default:
                animationName = "callout.flash";
        }

        return {
            animation: animationName,
            duration: 500,
            runOnMount: true,
            complete: () => { setTimeout(() => { scene.setState({ stage: Stage.Type.Result, actionIndex: 0 }); }, 500); }
        };
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
            case Attack.Name.WakeUpSlap:
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

    public getResultType(): Result.Type {
        return this.result;
    }

    private setResultType(): void {
        switch (this.name) {
            case Attack.Name.Bite:
            case Attack.Name.HeartStamp:
                this.result = Result.Type.Flinched;
                break;
            case Attack.Name.BodySlam:
            case Attack.Name.Frustration:
                this.result = Result.Type.Fainted;
                break;
            case Attack.Name.Lick:
            case Attack.Name.Nuzzle:
                this.result = Result.Type.Paralyzed;
                break;
            case Attack.Name.PlayRough:
                this.result = Result.Type.AttackFell;
                break;
            case Attack.Name.WakeUpSlap:
                this.result = Result.Type.WokeUp;
                break;
            case Attack.Name.Attract:
                this.result = Result.Type.Infatuated;
                break;
            case Attack.Name.Outrage:
                this.result = Result.Type.Confused;
                break;
            case Attack.Name.Present:
                this.result = Result.Type.HpRestored;
                break;
            case Attack.Name.HeatWave:
                this.result = Result.Type.Burned;
                break;
            case Attack.Name.SunnyDay:
                this.result = Result.Type.HarshSunlight;
                break;
            case Attack.Name.FreezeDry:
                this.result = Result.Type.Frozen;
                break;
            case Attack.Name.IcyWind:
                this.result = Result.Type.SpeedFell;
                break;
            case Attack.Name.Emoji:
            case Attack.Name.Mega:
                // TODO animation only
                break;
        }
    }

    public getFinalDialogType(): FinalDialog.Type {
        return this.finalDialog;
    }

    private setFinalDialogType(): void {
        switch (this.name) {
            case Attack.Name.Present:
                this.finalDialog = FinalDialog.Type.DidGood;
                break;
            case Attack.Name.Attract:
            case Attack.Name.BodySlam:
            case Attack.Name.FreezeDry:
            case Attack.Name.Frustration:
            case Attack.Name.HeartStamp:
            case Attack.Name.HeatWave:
            case Attack.Name.IcyWind:
            case Attack.Name.Outrage:
            case Attack.Name.SunnyDay:
                this.finalDialog = FinalDialog.Type.MeantWell;
                break;
            case Attack.Name.Bite:
            case Attack.Name.Lick:
            case Attack.Name.Nuzzle:
            case Attack.Name.PlayRough:
            case Attack.Name.WakeUpSlap:
                this.finalDialog = FinalDialog.Type.StillLiked;
                break;
            case Attack.Name.Emoji:
            case Attack.Name.Mega:
                this.finalDialog = FinalDialog.Type.EvolutionComplete;
                break;
        }
    }
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
