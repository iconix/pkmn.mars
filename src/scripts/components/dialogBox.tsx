import * as React from "react";
import {VelocityComponent} from "velocity-react";

import {Dialog} from "../battles/dialog";

import {Constants} from "../constants";

import {Scene, SceneState, SceneProps} from "./scene";

interface DialogBoxProps {
    dialog: Dialog;
    scene: Scene;
}

export class DialogBox extends React.Component<DialogBoxProps, {}> {
    private getReadyForTouch = (prevState: SceneState, props: SceneProps) => {
        return { stage: prevState.stage, actionIndex: prevState.actionIndex, waitingForTouch: this.props.dialog.waitForTouchAfter }
    };

    render() {
        return (
            // TODO <VelocityComponent animation={"transition.slideLeftIn"} duration={500} runOnMount={true} complete={() => {this.props.scene.setState(this.getReadyForTouch)}}>
                <div className={Constants.Classes.dialog}>
                    {this.props.dialog.text}
                </div>
            //</VelocityComponent>
        );
    }
}
