import * as React from "react";

import {Constants} from "../constants";

interface DialogTextProps {
    text: string;
}

export class DialogText extends React.Component<DialogTextProps, {}> {
    render() {
        return (
            <div id={Constants.Classes.dialogText}>
                {this.props.text.split("\n").map(function(item) {
                    return (
                        <span>
                            {item}
                            <br/>
                        </span>
                    );
                })}
            </div>
        );
    }
}