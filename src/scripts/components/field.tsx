import * as React from "react";

import {Constants} from "../constants";

export class Field extends React.Component<{}, {}> {
    render() {
        return (
            <div className={Constants.Classes.field}></div>
        );
    }
}
