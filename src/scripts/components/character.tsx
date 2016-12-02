import * as React from "react";
import {VelocityComponent} from "velocity-react";

import {Animation} from "../animation";

interface CharacterProps {
    class: string;
    imgSrc: string;
    animation?: Animation;
}

export class Character extends React.Component<CharacterProps, {}> {
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
                <VelocityComponent animation={this.props.animation.animation} duration={this.props.animation.duration} runOnMount={this.props.animation.runOnMount} complete={this.props.animation.complete}>
                    {this.getCharacterDiv()}
                </VelocityComponent>
            );
        } else {
            return (this.getCharacterDiv());
        }
    }
}
