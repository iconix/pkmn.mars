import * as React from "react";

export interface ScreenProps { }

export class Screen extends React.Component<ScreenProps, {}> {
    render() {
        return (
            <div className="arena">
                <div className="opponent">
                    <img src="src/sprites/gallade_norm_front.gif" />
                </div>
                <div className="field"></div>
                <div className="player">
                    <img src="src/sprites/absol_shiny_back.gif" />
                </div>
            </div>
        );
    }
}
