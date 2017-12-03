import * as React from "react";
import {VelocityComponent} from "velocity-react";

import {BattleManager} from "../battles/battleManager";

import {Animation} from "../animation";
import {ImageHelper} from "../imageHelper";
import {Utils} from "../utils";

import {SceneState} from "./scene";

export interface CharacterImage {
    imageProps: ImageHelper.ImageProperties;
    hidden?: boolean;
}

interface CharacterProps {
    class: string;
    image: CharacterImage;
    animation: Animation;
    numActions: number;
    setSceneStateCallback: (state: (prevState: SceneState) => SceneState) => void;
}

export class Character extends React.Component<CharacterProps, {}> {

    componentDidUpdate() {
        // add image-rendering style to sharpen 'pixel art' images/gifs, depending on browser
        let pixelArtRenderStyle: string;
        if (Utils.browserIsChrome()) {
            pixelArtRenderStyle = 'image-rendering: pixelated';
        } else {
            pixelArtRenderStyle = 'image-rendering: -moz-crisp-edges; image-rendering: crisp-edges; image-rendering: -webkit-optimize-contrast';
        }

        document.querySelector('.player>img').setAttribute('style', pixelArtRenderStyle);
        document.querySelector('.opponent>img').setAttribute('style', pixelArtRenderStyle);
    }

    private advanceState = (prevState: SceneState) => {
        return BattleManager.getNextState(prevState, this.props.numActions)
    };

    private getCharacterDiv() {
        let hiddenStyle = this.props.image.hidden ? { visibility: "hidden" } : undefined;

        return (
            <div className={this.props.class} style={hiddenStyle}>
                <img alt={this.props.image.imageProps.alt} src={this.props.image.imageProps.src} />
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
                            if (this.props.animation.advanceState) {
                                setTimeout(() => {
                                    this.props.setSceneStateCallback(this.advanceState);
                                }, this.props.animation.advanceStateDelay || 0);
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
