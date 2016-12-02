import {Animation} from "../animation";

export interface Action {
    animations?: { [battleCharacterType: number]: Animation }; // TODO type key to BattleCharacter.Type?
    dialogText?: string;
}
