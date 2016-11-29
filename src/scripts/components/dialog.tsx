import * as React from "react";

import {Constants} from "../constants";

interface DialogProps {
    text: string;
}

export class Dialog extends React.Component<DialogProps, {}> {
    render() {
        return (
            <div className={Constants.Classes.dialog}>
                {this.props.text}
            </div>
        );
    }
}
