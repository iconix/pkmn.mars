import * as React from "react";

import {Constants} from "../constants";

interface LabelProps {
    text: string;
    id: string;
}

export class Label extends React.Component<LabelProps, {}> {
    render() {
        return (
            <div className={Constants.Classes.label} id={this.props.id}>
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
