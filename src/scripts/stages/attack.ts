import {Action} from "../battles/action";
import {BattleCharacter} from "../battles/character";

import {CharacterImage} from "../components/character";

import {Animation} from "../animation";
import {Constants} from "../constants";
import {ImageHelper} from "../imageHelper";
import {Utils} from "../utils";

import {AttackReason} from "./attackReason";
import {FinalDialog} from "./finalDialog";
import {Result} from "./result";
import {Stage} from "./stage";

export class Attack {
    private name: Attack.Name;
    private animation: Animation;

    private attackReasonType: AttackReason.Type;
    private attackReasonModifiers: AttackReason.Modifiers;
    private resultType: Result.Type;
    private finalDialogType: FinalDialog.Type;

    constructor(reasonType: AttackReason.Type, distance: number) {
        this.attackReasonType = reasonType;

        this.attackReasonModifiers = AttackReason.getModifiers(distance);
        this.setAttack();
        this.setResultType();
        this.setFinalDialogType();
    }

    public getAttack(): Attack.Name {
        return this.name;
    }

    private setAttack(): void {
        this.name = this.getRandAttackName();
    }

    private getRandAttackName(): Attack.Name {
        let availableAttacks: Attack.Name[] = AttackReason.getAttackNamesByReasonType(this.attackReasonType);
        return availableAttacks[Utils.getRandomInt(availableAttacks.length - 1)];
    }

    public getAttackName(): string {
        return Attack.Name[this.name].match(/[A-Z][^A-Z]+/g).join(" ");
    }

    public getOpponentImageSrc(stageType: Stage.Type, attackerType: BattleCharacter.Type): CharacterImage {
        return this.getImageSrc(BattleCharacter.Type.Opponent, stageType, attackerType);
    }

    public getPlayerImageSrc(stageType: Stage.Type, attackerType: BattleCharacter.Type): CharacterImage {
        return this.getImageSrc(BattleCharacter.Type.Player, stageType, attackerType);
    }

    private getImageSrc(characterType: BattleCharacter.Type, stageType: Stage.Type, attackerType: BattleCharacter.Type): CharacterImage {
        // defender is always non-evo
        if (characterType !== attackerType) {
            switch (stageType) {
                case Stage.Type.BattleStart:
                case Stage.Type.AttackReason:
                case Stage.Type.Attack:
                    return ImageHelper.getGifImage(characterType);
                default:
                    if (this.resultType === Result.Type.Fainted) {
                        return ImageHelper.getGifImage(characterType, true);
                    }
                    return ImageHelper.getGifImage(characterType);
            }
        }

        // early stages are always non-evo
        switch (stageType) {
            case Stage.Type.BattleStart:
            case Stage.Type.AttackReason:
            case Stage.Type.Attack:
                return ImageHelper.getGifImage(characterType);
            default:
                break;
        }

        // only the Emoji and Mego Evolution attacks can provide evo
        switch (this.getAttack()) {
            case Attack.Name.Emoji:
                return ImageHelper.getEmojiImage(characterType);
            case Attack.Name.Mega:
                return ImageHelper.getMegaImage(characterType);
            default:
                return ImageHelper.getGifImage(characterType);
        }
    }

    public getAttackerAnimation(): Animation {
        let animationName: string;
        let advanceStageDelay: number;

        switch (this.name) {
            case Attack.Name.Mega:
            case Attack.Name.Emoji:
                animationName = "callout.pulse";
                advanceStageDelay = 500;
                break;
            default:
                animationName = "callout.shake";
        }

        return {
            animation: animationName,
            duration: 500,
            runOnMount: true,
            advanceStage: true,
            advanceStageDelay: advanceStageDelay
        };
    }

    public getDefenderAnimation(): Animation {
        switch (this.name) {
            case Attack.Name.Mega:
            case Attack.Name.Emoji:
                return;
            default:
                return {
                    animation: "callout.flash",
                    duration: 500,
                    runOnMount: true,
                    advanceStage: true,
                    advanceStageDelay: 500
                };
        }


    }

    public getAttackReasonType(): AttackReason.Type {
        return this.attackReasonType;
    }

    public getAttackReasonModifiers(): AttackReason.Modifiers {
        return this.attackReasonModifiers;
    }

    public getResultType(): Result.Type {
        return this.resultType;
    }

    private setResultType(): void {
        switch (this.name) {
            case Attack.Name.Bite:
            case Attack.Name.HeartStamp:
                this.resultType = Result.Type.Flinched;
                break;
            case Attack.Name.BodySlam:
            case Attack.Name.Frustration:
                this.resultType = Result.Type.Fainted;
                break;
            case Attack.Name.Lick:
            case Attack.Name.Nuzzle:
                this.resultType = Result.Type.Paralyzed;
                break;
            case Attack.Name.PlayRough:
                this.resultType = Result.Type.AttackFell;
                break;
            case Attack.Name.WakeUpSlap:
                this.resultType = Result.Type.WokeUp;
                break;
            case Attack.Name.Attract:
                this.resultType = Result.Type.Infatuated;
                break;
            case Attack.Name.Outrage:
                this.resultType = Result.Type.Confused;
                break;
            case Attack.Name.Present:
                this.resultType = Result.Type.HpRestored;
                break;
            case Attack.Name.HeatWave:
                this.resultType = Result.Type.Burned;
                break;
            case Attack.Name.SunnyDay:
                this.resultType = Result.Type.HarshSunlight;
                break;
            case Attack.Name.FreezeDry:
                this.resultType = Result.Type.Frozen;
                break;
            case Attack.Name.IcyWind:
                this.resultType = Result.Type.SpeedFell;
                break;
            case Attack.Name.Emoji:
                this.resultType = Result.Type.EmojiEvolved;
                break;
            case Attack.Name.Mega:
                this.resultType = Result.Type.MegaEvolved;
                break;
        }
    }

    public getFinalDialogType(): FinalDialog.Type {
        return this.finalDialogType;
    }

    private setFinalDialogType(): void {
        switch (this.name) {
            case Attack.Name.Attract:
            case Attack.Name.Present:
                this.finalDialogType = FinalDialog.Type.DidGood;
                break;
            case Attack.Name.BodySlam:
            case Attack.Name.FreezeDry:
            case Attack.Name.Frustration:
            case Attack.Name.HeartStamp:
            case Attack.Name.HeatWave:
            case Attack.Name.IcyWind:
            case Attack.Name.Outrage:
            case Attack.Name.SunnyDay:
                this.finalDialogType = FinalDialog.Type.MeantWell;
                break;
            case Attack.Name.Bite:
            case Attack.Name.Lick:
            case Attack.Name.Nuzzle:
            case Attack.Name.PlayRough:
            case Attack.Name.WakeUpSlap:
                this.finalDialogType = FinalDialog.Type.StillLiked;
                break;
            case Attack.Name.Emoji:
            case Attack.Name.Mega:
                this.finalDialogType = FinalDialog.Type.EvolutionComplete;
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
