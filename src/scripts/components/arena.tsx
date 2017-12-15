import * as React from "react";

import {BattleManager} from "../battles/battleManager";

import {Stage} from "../stages/stage";

import {Background} from "../background";
import {Constants} from "../constants";
import {Location} from "../location";

import {Scene} from "./scene";

export class Arena extends React.Component<{}, Location.State> {
    constructor(props: {}) {
        super(props);
        Location.initLocationData(this);
    }

    componentDidMount() {
        // append viewport to head after mount
        let backgroundImgWidth = 250;
        let backgroundImgHeight = 198;

        let horizontalScale = (screen.availWidth/backgroundImgWidth);
        let verticalScale = (screen.availHeight/backgroundImgHeight);

        let scale: number = (horizontalScale <= verticalScale) ? horizontalScale : verticalScale;

        let metaTag=document.createElement('meta');
        metaTag.name = 'viewport';
        metaTag.content = 'initial-scale=' + scale;

        document.getElementsByTagName('head')[0].appendChild(metaTag);
    }

    render() {
        let arenaStyle: React.CSSProperties;
        if (this.state.locationData) {
            let background: Background.Styles = Background.createArenaBackground(this.state.locationData.playerLocation);

            arenaStyle = {
                background: background.Color + ", " + background.Image + ", " + background.Repeat,
                backgroundPosition: background.Position.X + "px " + background.Position.Y + "px",
                // backgrounds on row corresponding to -796px have a smaller height than all others
                height: background.Position.Y === -796 ? "192px" : ""
            };
        }

        return (
            <div className={Constants._.Classes.arena} style={arenaStyle}>
                <Scene battle={BattleManager.getBattle(this.state.locationData)} />
            </div>
        );
    }
}
