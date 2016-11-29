import * as React from "react";

import {Constants} from "../constants";
import {Utils} from "../utils";

import {Character} from "./character";
import {Dialog} from "./dialog";
import {Field} from "./field";

export interface SceneState {
    stage: Scene.Stage;
}

export class Scene extends React.Component<{}, SceneState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            stage: Scene.Stage.PageLoad
        };
    }

    render() {
        return (
            <div className={Constants.Classes.scene}>
                {/* TODO setup touch handlers when Stage === BattleStart */}

                <Character class={Constants.Classes.opponent}
                    imgSrc={Constants.Resources.opponentPokemonGif}
                    animation={{
                        animation: "transition.slideRightIn",
                        duration: 500,
                        runOnMount: true
                    }
                } />

                <Field />

                <Character class={Constants.Classes.player}
                    imgSrc={Constants.Resources.playerPokemonGif}
                    animation={{
                        animation: "transition.slideLeftIn",
                        duration: 500,
                        runOnMount: true,
                        complete: () => { this.setState({ stage: Scene.Stage.BattleStart }); }
                    }
                } />

                {/* TODO Replace "1000" with distance between browser coordinates and Boosie coordinates */}
                { this.state.stage === Scene.Stage.BattleStart ? <Dialog text={Utils.formatString(Constants.Battle.DialogText.init, "1000")} /> : null }
            </div>
        );
    }
}

export module Scene {
    export enum Stage {
        PageLoad = 0,
        BattleStart = 1,
        BattleSequence = 2,
        BattleEnd = 3
    }
}
