import * as React from "react";
import * as ReactDOM from "react-dom";

import {Arena} from "./components/arena";

import {Constants} from "./constants";

ReactDOM.render(
    <Arena />,
    document.getElementById(Constants.Ids.screen)
);