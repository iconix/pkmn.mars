import {Constants} from "../constants";

export class BattleCharacter {
    private type: BattleCharacter.Type;

    constructor(type: BattleCharacter.Type) {
        this.type = type;
    }

    public getType(): BattleCharacter.Type {
        return this.type;
    }

    public getName(): string {
        return this.getModuleForBattleCharacterType().name;
    }

    public getTrainer(): string {
        return this.getModuleForBattleCharacterType().trainer;
    }

    public getEvoStoneName(): string {
        return this.getModuleForBattleCharacterType().evoStone;
    }

    private getModuleForBattleCharacterType(): { name: string, trainer: string, evoStone: string } {
        let battleCharacterTypeAsKey: string = BattleCharacter.Type[this.type];
        return (<any>Constants._.Battle.Characters)[battleCharacterTypeAsKey];
    }
}

export module BattleCharacter {
    export enum Type {
        Player,
        Opponent
    }

    export function getOtherBattleCharacter(type: BattleCharacter.Type): BattleCharacter.Type {
        return Math.abs(type - 1);
    }
}
