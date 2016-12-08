import {Constants} from "../constants";

export class BattleCharacter {
    private type: BattleCharacter.Type;

    constructor(type: BattleCharacter.Type) {
        this.type = type;
    }

    public getName(): string {
        switch(this.type) {
            case BattleCharacter.Type.Player:
                return Constants.Battle.Characters.player;
            case BattleCharacter.Type.Opponent:
                return Constants.Battle.Characters.opponent;
        }
    }

    public getTrainer(): string {
        switch(this.type) {
            case BattleCharacter.Type.Player:
                return Constants.Battle.Characters.playerTrainer;
            case BattleCharacter.Type.Opponent:
                return Constants.Battle.Characters.opponentTrainer;
        }
    }

    public getEvoStoneName(): string {
        switch(this.type) {
            case BattleCharacter.Type.Player:
                return Constants.Battle.Characters.playerEvoStone;
            case BattleCharacter.Type.Opponent:
                return Constants.Battle.Characters.opponentEvoStone;
        }
    }
}

export module BattleCharacter {
    export enum Type {
        Player,
        Opponent
    }

    export function getOtherBattleCharater(type: BattleCharacter.Type): BattleCharacter.Type {
        return Math.abs(type - 1);
    }
}
