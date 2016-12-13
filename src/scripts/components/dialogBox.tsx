import * as React from "react";
import {VelocityTransitionGroup} from "velocity-react";

import {Dialog} from "../battles/dialog";

import {Constants} from "../constants";

import {Scene, SceneState, SceneProps} from "./scene";

interface DialogBoxProps {
    dialog: Dialog;
    scene: Scene;
}

export class DialogBox extends React.Component<DialogBoxProps, {}> {
    private transitionEnterProps = {
        animation: "transition.slideLeftIn",
        style: {
            position: "relative",
            bottom: ""
        },
        duration: 500,
        complete: () => { this.props.scene.setState(this.getReadyForTouch); }
    };

    private transitionLeaveProps = {
        animation: "transition.fadeOut",
        style: {
            position: "absolute",
            bottom: 0
        },
        duration: 100
    };

    private getReadyForTouch = (prevState: SceneState, props: SceneProps) => {
        return { stage: prevState.stage, actionIndex: prevState.actionIndex, waitingForTouch: this.props.dialog.waitForTouchAfter }
    };

    private getDialogText() {
        return (
            <div>
                {this.props.dialog.text}
            </div>
        );
    }

    render() {
        const key = this.props.dialog.text;
        const textElement = this.getDialogText();

        // add a unique key prop to the element to animate,
        // so that the transition group recognizes that the components are changing
        const textToAnimate = React.cloneElement(textElement, { key });

        return (
            <div className={Constants.Classes.dialog}>
                <VelocityTransitionGroup component="div" enter={this.transitionEnterProps} leave={this.transitionLeaveProps} runOnMount>
                    {textToAnimate}
                </VelocityTransitionGroup>
            </div>
        );
    }
}
