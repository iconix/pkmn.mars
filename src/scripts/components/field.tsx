import * as React from "react";

import {Constants} from "../constants";

export class Field extends React.Component<{}, {}> {
    // TODO: because this is just a render function, it can become a "stateless functional component"
    render() {
        return (
            <div className={Constants.Classes.field}></div>
        );
    }
}
