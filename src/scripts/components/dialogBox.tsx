import * as React from "react";
import {VelocityTransitionGroup} from "velocity-react";

import {Dialog} from "../action/dialog";

import {Constants} from "../constants";

import {Label} from "./label";
import {SceneState} from "./scene";

interface DialogBoxProps {
    dialog: Dialog;
    setSceneStateCallback: (state: (prevState: SceneState) => SceneState) => void;
}

export function DialogBox(props: DialogBoxProps) {
    // presentational component: functional, stateless

    const getReadyForTouch = (prevState: SceneState): SceneState => {
        return { stage: prevState.stage, actionIndex: prevState.actionIndex, waitingForTouch: props.dialog.waitForTouchAfter }
    };

    const transitionEnterProps = {
        animation: "transition.slideLeftIn",
        style: {
            position: "relative",
            bottom: ""
        },
        duration: 500,
        complete: () => { props.setSceneStateCallback(getReadyForTouch); }
    };

    const key = props.dialog.text;
    const textElement = <Label text={key} />;

    // add a unique key prop to the element to animate,
    // so that the transition group recognizes that the components are changing
    // https://github.com/twitter-fabric/velocity-react/issues/29#issuecomment-148558624
    const textToAnimate = React.cloneElement(textElement, { key });

    return (
        <div className={Constants._.Classes.dialogBox}>
            <VelocityTransitionGroup enter={transitionEnterProps} runOnMount>
                {textToAnimate}
            </VelocityTransitionGroup>
        </div>
    );
}
