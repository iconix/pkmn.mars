import * as React from "react";

import {BattleManager} from "../battles/battleManager";

import {Stage} from "../stages/stage";

import {Background} from "../background";
import {Constants} from "../constants";
import {Location} from "../location";

import {Scene} from "./scene";

interface ArenaProps {
    locationPackage: Location.Package;
}

export class Arena extends React.Component<ArenaProps, {}> {
    constructor(props: ArenaProps) {
        super(props);
        this.state = {
            currentStage: Stage.Type.BattleStart
        };
    }

    componentDidMount() {
        let backgroundImgWidth = 250;
        let scale = (screen.width/backgroundImgWidth);

        let metaTag=document.createElement('meta');
        metaTag.name = 'viewport';
        metaTag.content = 'initial-scale=' + scale;

        document.getElementsByTagName('head')[0].appendChild(metaTag);
    }

    render() {
        let background: Background.Styles = Background.createArenaBackground(this.props.locationPackage.playerLocation);

        const arenaStyle = {
            background: background.Color + ", " + background.Image + ", " + background.Repeat,
            backgroundPosition: background.Position.X + "px " + background.Position.Y + "px",
            // backgrounds on row corresponding to -796px have a smaller height than all others
            height: background.Position.Y === -796 ? "192px" : ""
        };

        return (
            <div className={Constants.Classes.arena} style={arenaStyle}>
                <Scene battle={BattleManager.getBattle(this.props.locationPackage)} />
            </div>
        );
    }
}
