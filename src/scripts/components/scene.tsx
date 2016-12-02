import * as React from "react";

import {Action} from "../battles/action";
import {Battle} from "../battles/battle";
import {BattleCharacter} from "../battles/character";

import {Stage} from "../stages/stage";

import {Animation} from "../animation";
import {Constants} from "../constants";
import {Utils} from "../utils";

import {Character} from "./character";
import {Dialog} from "./dialog";
import {Field} from "./field";

export interface SceneState {
    stage: Stage;
    subStage: number;
}

interface SceneProps {
    battle: Battle;
}

export class Scene extends React.Component<SceneProps, SceneState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            stage: Stage.BattleStart,
            subStage: 0
        };
    }

    render() {
        let currentAction: Action = this.props.battle.getCurrentAction(this.state.stage, this.state.subStage, this);

        let opponentAnimation: Animation;
        let playerAnimation: Animation;

        if (currentAction.animations) {
            opponentAnimation = currentAction.animations[BattleCharacter.Type.Opponent];
            playerAnimation = currentAction.animations[BattleCharacter.Type.Player];
        }

        return (
            <div className={Constants.Classes.scene}>
                {/* TODO setup touch handlers when Stage === BattleStart */}

                <Character class={Constants.Classes.opponent}
                    imgSrc={Constants.Resources.opponentPokemonGif}
                    animation={opponentAnimation} />

                <Field />

                <Character class={Constants.Classes.player}
                    imgSrc={Constants.Resources.playerPokemonGif}
                    animation={playerAnimation} />

                { currentAction.dialogText ? <Dialog text={currentAction.dialogText} /> : null }
            </div>
        );
    }
}
