import * as React from "react";
import {VelocityTransitionGroup} from "velocity-react";

import {Dialog} from "../battles/dialog";

import {Constants} from "../constants";

import {DialogText} from "./dialogText";
import {Scene, SceneState, SceneProps} from "./scene";

interface DialogBoxProps {
    dialog: Dialog;
    scene: Scene; // TODO: instead of passing around the entire scene, the React way for "bi-directional data flow" would be to pass down a helper function that lives on the Scene that will update data on the scene
}

export class DialogBox extends React.Component<DialogBoxProps, {}> {
    private getReadyForTouch = (prevState: SceneState, props: SceneProps) => {
        return { stage: prevState.stage, actionIndex: prevState.actionIndex, waitingForTouch: this.props.dialog.waitForTouchAfter }
    };

    private transitionEnterProps = {
        animation: "transition.slideLeftIn",
        style: {
            position: "relative",
            bottom: ""
        },
        duration: 500,
        complete: () => { this.props.scene.setState(this.getReadyForTouch); }
    };

    render() {
        const key = this.props.dialog.text;
        const textElement = <DialogText text={key} />;

        // add a unique key prop to the element to animate,
        // so that the transition group recognizes that the components are changing
        // https://github.com/twitter-fabric/velocity-react/issues/29#issuecomment-148558624
        const textToAnimate = React.cloneElement(textElement, { key });

        return (
            <div className={Constants.Classes.dialogBox}>
                <VelocityTransitionGroup enter={this.transitionEnterProps} runOnMount>
                    {textToAnimate}
                </VelocityTransitionGroup>
            </div>
        );
    }
}
