import {Animation} from "../animation";

import {Dialog} from "./dialog";

export interface Action {
    animations?: { [battleCharacterType: number]: Animation }; // TODO: type key to BattleCharacter.Type?
    dialog?: Dialog;
}
