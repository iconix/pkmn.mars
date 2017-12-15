import * as React from "react";

import {Constants} from "../constants";

interface DialogTextProps {
    text: string;
}

export function DialogText(props: DialogTextProps) {
    // presentational component: functional, stateless
    // TODO: enforce max character limit of 64
    return (
        <div id={Constants._.Classes.dialogText}>
            {props.text.split("\n").map(function(item) {
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
