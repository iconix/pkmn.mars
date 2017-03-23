import * as React from "react";

import {Constants} from "../constants";

interface DialogTextProps {
    text: string;
}

export class DialogText extends React.Component<DialogTextProps, {}> {
    // TODO: enforce max character limit of 64
    // TODO: because this is just a render function, it can become a "stateless functional component"
        // see: React for Beginners video 8 of 30 https://reactforbeginners.com/account/access/564aa2f0523d3bdc5f5b903b/view/184581839
        // see: https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc

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