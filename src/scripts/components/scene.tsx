import * as React from "react";

import {Action} from "../battles/action";
import {Battle} from "../battles/battle";
import {BattleManager} from "../battles/battleManager";
import {BattleCharacter} from "../battles/character";

import {Stage} from "../stages/stage";

import {Animation} from "../animation";
import {Constants} from "../constants";
import {Utils} from "../utils";

import {Character} from "./character";
import {DialogBox} from "./dialogBox";
import {Field} from "./field";

export interface SceneState {
    stage: Stage.Type;
    actionIndex: number;
    waitingForTouch?: boolean;
}

export interface SceneProps {
    battle: Battle;
}

export class Scene extends React.Component<SceneProps, SceneState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            stage: Stage.Type.BattleStart,
            actionIndex: 0
        };
    }

    private sceneTouchEvent: React.EventHandler<React.TouchEvent<HTMLDivElement>>;

    render() {
        let stageFactory: Stage.Factory = this.props.battle.getStageFactory(this.state.stage, this);
        let currentAction: Action = stageFactory.getAction(this.state.actionIndex);

        let opponentAnimation: Animation;
        let playerAnimation: Animation;

        if (currentAction && currentAction.animations) {
            opponentAnimation = currentAction.animations[BattleCharacter.Type.Opponent];
            playerAnimation = currentAction.animations[BattleCharacter.Type.Player];
        }

        this.sceneTouchEvent = (event: React.TouchEvent<HTMLDivElement>) => {
            this.setState((prevState: SceneState, props: SceneProps) => {
                return BattleManager.getNextState(prevState, stageFactory.getNumActions())
            });
        };

        return (
            // TODO <div className={Constants.Classes.scene} onTouchStart={this.state.waitingForTouch ? this.sceneTouchEvent : undefined}>
            <div className={Constants.Classes.scene} onTouchStart={(currentAction && currentAction.dialog && currentAction.dialog.waitForTouchAfter) ? this.sceneTouchEvent : undefined}>

                <Character class={Constants.Classes.opponent}
                    imgSrc={Constants.Resources.opponentPokemonGif}
                    animation={opponentAnimation} />

                <Field />

                <Character class={Constants.Classes.player}
                    imgSrc={Constants.Resources.playerPokemonGif}
                    animation={playerAnimation} />

                { currentAction && currentAction.dialog ? <DialogBox dialog={currentAction.dialog} scene={this} /> : undefined }
            </div>
        );
    }
}
