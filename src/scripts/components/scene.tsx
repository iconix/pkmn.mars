import * as React from "react";

import {Action} from "../battles/action";
import {Battle} from "../battles/battle";
import {BattleManager} from "../battles/battleManager";
import {BattleCharacter} from "../battles/character";

import {Stage} from "../stages/stage";

import {Animation} from "../animation";
import {Constants} from "../constants";
import {Utils} from "../utils";

import {Character, CharacterImage} from "./character";
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
    constructor(props: {}) {
        super(props);
        this.state = {
            stage: Stage.Type.BattleStart,
            actionIndex: 0
        };
    }

    private sceneTouchEvent: React.EventHandler<React.TouchEvent<HTMLDivElement>>;

    render() {
        let opponentImage: CharacterImage = this.props.battle.getCharacterImgSrc(BattleCharacter.Type.Opponent, this.state.stage);
        let playerImage: CharacterImage = this.props.battle.getCharacterImgSrc(BattleCharacter.Type.Player, this.state.stage);

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
            <div className={Constants.Classes.scene} onTouchEnd={this.state.waitingForTouch ? this.sceneTouchEvent : undefined}>
                <Character class={Constants.Classes.opponent}
                    image={opponentImage}
                    animation={opponentAnimation}
                    numActions={stageFactory.getNumActions()}
                    scene={this} />

                <Label text={this.props.battle.getLocationPackage().opponentLocation.friendlyName} id={Constants.Ids.opponent} />

                <Field />

                <Character class={Constants.Classes.player}
                    image={playerImage}
                    animation={playerAnimation}
                    numActions={stageFactory.getNumActions()}
                    scene={this} />

                <Label text={this.props.battle.getLocationPackage().playerLocation.friendlyName} id={Constants.Ids.player} />

                { currentAction && currentAction.dialog ? <DialogBox dialog={currentAction.dialog} scene={this} /> : undefined }
            </div>
        );
    }
}
