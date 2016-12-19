import * as React from "react";
import {VelocityComponent} from "velocity-react";

import {BattleManager} from "../battles/battleManager";

import {Animation} from "../animation";

import {Scene, SceneState, SceneProps} from "./scene";

interface CharacterProps {
    class: string;
    imgSrc: string;
    animation: Animation;
    numActions: number;
    scene: Scene;
}

export class Character extends React.Component<CharacterProps, {}> {
    private advanceState = (prevState: SceneState, props: SceneProps) => {
        return BattleManager.getNextState(prevState, this.props.numActions)
    };

    private getCharacterDiv() {
        return (
            <div className={this.props.class}>
                <img src={this.props.imgSrc} />
            </div>
        );
    }

    render() {
        if (this.props.animation) {
            return (
                <VelocityComponent
                    animation={this.props.animation.animation}
                    duration={this.props.animation.duration}
                    runOnMount={this.props.animation.runOnMount}
                    complete={
                        () => {
                            if (this.props.animation.advanceStage) {
                                setTimeout(() => {
                                    this.props.scene.setState(this.advanceState);
                                }, this.props.animation.advanceStageDelay || 0);
                            }
                        }
                    }>
                    {this.getCharacterDiv()}
                </VelocityComponent>
            );
        } else {
            return (this.getCharacterDiv());
        }
    }
}
