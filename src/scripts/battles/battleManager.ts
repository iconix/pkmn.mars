import {Battle} from "./battle";
import {BattleCharacter} from "./character";

export module BattleManager {
    export function getBattle(): Battle {
        //return new Battle(getRandAttacker(), getRandAttack());
        return new Battle(BattleCharacter.Type.Player);
    }

    //function getRandAttacker(): Character {
    //}

    //function getRandAttack(): Attack {
    //}
}