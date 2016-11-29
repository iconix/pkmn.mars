import * as React from "react";
import {VelocityComponent} from "velocity-react";

interface CharacterProps {
    class: string;
    imgSrc: string;
    animation: Character.CharacterAnimation;
}

export class Character extends React.Component<CharacterProps, {}> {
    render() {
        return (
            <VelocityComponent animation={this.props.animation.animation} duration={this.props.animation.duration} runOnMount={this.props.animation.runOnMount} complete={this.props.animation.complete}>
                <div className={this.props.class}>
                    <img src={this.props.imgSrc} />
                </div>
            </VelocityComponent>
        );
    }
}

export module Character {
    export interface CharacterAnimation {
        animation: string;
        duration: number;
        runOnMount: boolean;
        complete?: __VelocityReact.ElementCallback;
    }
}
