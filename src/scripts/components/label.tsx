import * as React from "react";

import {Constants} from "../constants";

interface LabelProps {
    text: string;
    id?: string;
}

export function Label(props: LabelProps) {
    // presentational component: functional, stateless
    // TODO: enforce max character limit of 64
    return (
        <div className={Constants._.Classes.label} id={props.id}>
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
