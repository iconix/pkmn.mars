import {Action} from "../battles/action";

import {Scene} from "../components/scene";

import {Animation} from "../animation";

import {Stage} from "./stage";

export class Attack {
    private name: Attack.Name;
    private animation: Animation;

    //private attackReason: AttackReason;
    //private result: Result;
    //private finalDialog: FinalDialog;

    constructor(name: Attack.Name) {
        this.name = name;

        // TODO Map the animation
        // TODO Map all the types
    }

    public getAttackAnimation(): Animation {
        return this.animation;
    }

    public getAttackName(): string {
        return Attack.Name[this.name]; // TODO spacing of returned name
    }

    //public getAttackReasonType(): AttackReason.Type {

    //}

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
