import {Action} from "../battles/action";
import {BattleCharacter} from "../battles/character";

import {CharacterImage} from "../components/character";

import {Animation} from "../animation";
import {Constants} from "../constants";
import {EmojiHelper} from "../emojiHelper";
import {Utils} from "../utils";

import {AttackReason} from "./attackReason";
import {FinalDialog} from "./finalDialog";
import {Result} from "./result";
import {Stage} from "./stage";

export class Attack {
    private name: Attack.Name;
    private animation: Animation;

    private attackReasonType: AttackReason.Type;
    private resultType: Result.Type;
    private finalDialogType: FinalDialog.Type;

    constructor(reasonType: AttackReason.Type) {
        this.attackReasonType = reasonType;

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

    // TODO collapse get___ImageSrc(...) functions into one
    public getOpponentImageSrc(stageType: Stage.Type, attackerType: BattleCharacter.Type): CharacterImage {
        // defender is always non-evo
        if (BattleCharacter.Type.Opponent !== attackerType) {
            switch (stageType) {
                case Stage.Type.BattleStart:
                case Stage.Type.AttackReason:
                case Stage.Type.Attack:
                    return { src: Constants.Resources.opponentPokemonGif };
                default:
                    if (this.resultType === Result.Type.Fainted) {
                        return { src: Constants.Resources.opponentPokemonGif, hidden: true }
                    }
                    return { src: Constants.Resources.opponentPokemonGif };
            }
        }

        // early stages are always non-evo
        switch (stageType) {
            case Stage.Type.BattleStart:
            case Stage.Type.AttackReason:
            case Stage.Type.Attack:
                return { src: Constants.Resources.opponentPokemonGif };
            default:
                break;
        }

        // only the Emoji and Mego Evolution attacks can provide evo
        switch (this.getAttack()) {
            case Attack.Name.Emoji:
                return { src: EmojiHelper.getEmojiImageSrc(BattleCharacter.Type.Opponent) };
            case Attack.Name.Mega:
                return { src: Constants.Resources.opponentMegaImg };
            default:
                return { src: Constants.Resources.opponentPokemonGif };
        }
    }

    public getPlayerImageSrc(stageType: Stage.Type, attackerType: BattleCharacter.Type): CharacterImage {
        // defender is always non-evo
        if (BattleCharacter.Type.Player !== attackerType) {
            switch (stageType) {
                case Stage.Type.BattleStart:
                case Stage.Type.AttackReason:
                case Stage.Type.Attack:
                    return { src: Constants.Resources.playerPokemonGif };
                default:
                    if (this.resultType === Result.Type.Fainted) {
                        return { src: Constants.Resources.playerPokemonGif, hidden: true }
                    }
                    return { src: Constants.Resources.playerPokemonGif };
            }
        }

        // early stages are always non-evo
        switch (stageType) {
            case Stage.Type.BattleStart:
            case Stage.Type.AttackReason:
            case Stage.Type.Attack:
                return { src: Constants.Resources.playerPokemonGif };
            default:
                break;
        }

        // only the Emoji and Mego Evolution attacks can provide evo
        switch (this.getAttack()) {
            case Attack.Name.Emoji:
                return { src: EmojiHelper.getEmojiImageSrc(BattleCharacter.Type.Player) };
            case Attack.Name.Mega:
                return { src: Constants.Resources.playerMegaImg };
            default:
                return { src: Constants.Resources.playerPokemonGif };
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
