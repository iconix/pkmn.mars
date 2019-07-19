import * as React from "react";

import {Action} from "../action/action";
import {Battle} from "../battles/battle";
import {BattleManager} from "../battles/battleManager";
import {BattleCharacter} from "../battles/character";

import {Stage} from "../stages/stage";

import {Animation} from "../animation";
import {Constants} from "../constants";
import {Image} from "../image";

import {Character} from "./character";
import {DialogBox} from "./dialogBox";
import {Field} from "./field";
import {Label} from "./label";

export interface SceneState {
    stage: Stage.Type;
    actionIndex: number;
    waitingForTouch?: boolean;
}

export interface SceneProps {
    battle: Battle;
}

export class Scene extends React.Component<SceneProps, SceneState> {
    constructor(props: SceneProps) {
        super(props);
        this.state = {
            stage: Stage.Type.BattleStart,
            actionIndex: 0
        };

        // bind setSceneState() to the Scene component (so that inside setSceneState(), 'this' refers to component)
        this.setSceneState = this.setSceneState.bind(this);
    }

    private sceneTouchEvent: React.EventHandler<React.TouchEvent<HTMLDivElement>>;

    private setSceneState(state: (prevState: SceneState) => SceneState) {
        this.setState(state);
    };

    render() {
        if (!this.props.battle) {
            return (
                <div className={Constants._.Classes.scene}>
                    <p>Loading...</p> {/* TODO: add loading icons of absol, gallade */}
                </div>
            );
        }

        let opponentImage: Image.Image = this.props.battle.getCharacterImage(BattleCharacter.Type.Opponent, this.state.stage);
        let playerImage: Image.Image = this.props.battle.getCharacterImage(BattleCharacter.Type.Player, this.state.stage);

        let stageFactory: Stage.Factory = this.props.battle.getStageFactory(this.state.stage);
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
            <div className={Constants._.Classes.scene} onTouchEnd={this.state.waitingForTouch ? this.sceneTouchEvent : undefined}>
                <Character class={Constants._.Classes.opponent}
                    image={opponentImage}
                    animation={opponentAnimation}
                    numActions={stageFactory.getNumActions()}
                    setSceneStateCallback={this.setSceneState} />

                <Label text={this.props.battle.getLocationData().opponentLocation.friendlyName} id={Constants._.Ids.opponent} />

                <Field />

                <Character class={Constants._.Classes.player}
                    image={playerImage}
                    animation={playerAnimation}
                    numActions={stageFactory.getNumActions()}
                    setSceneStateCallback={this.setSceneState} />

                <Label text={this.props.battle.getLocationData().playerLocation.friendlyName} id={Constants._.Ids.player} />

                { currentAction && currentAction.dialog ? <DialogBox dialog={currentAction.dialog} setSceneStateCallback={this.setSceneState} /> : undefined }
            </div>
        );
    }
}
