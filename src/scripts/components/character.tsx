import * as React from "react";
import {VelocityComponent} from "velocity-react";

import {BattleManager} from "../battles/battleManager";

import {Animation} from "../animation";
import {Utils} from "../utils";

import {Scene, SceneState, SceneProps} from "./scene";

export interface CharacterImage {
    src: string;
    hidden?: boolean;
}

interface CharacterProps {
    class: string;
    image: CharacterImage;
    animation: Animation;
    numActions: number;
    scene: Scene;
}

export class Character extends React.Component<CharacterProps, {}> {

    componentDidUpdate() {
        // add sharper, image-rendering style to 'pixel art' images/gifs, depending on browser
        let pixelArtRenderStyle: string;
        if (Utils.browserIsChrome()) {
            pixelArtRenderStyle = 'image-rendering: pixelated';
        } else {
            pixelArtRenderStyle = 'image-rendering: -moz-crisp-edges; image-rendering: crisp-edges; image-rendering: -webkit-optimize-contrast';
        }

        document.querySelector('.player>img').setAttribute('style', pixelArtRenderStyle);
        document.querySelector('.opponent>img').setAttribute('style', pixelArtRenderStyle);
    }

    private advanceState = (prevState: SceneState, props: SceneProps) => {
        return BattleManager.getNextState(prevState, this.props.numActions)
    };

    private getCharacterDiv() {
        let hiddenStyle = this.props.image.hidden ? { visibility: "hidden" } : undefined;

        return (
            <div className={this.props.class} style={hiddenStyle}>
                <img src={this.props.image.src} />
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
