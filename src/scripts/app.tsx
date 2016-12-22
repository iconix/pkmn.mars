import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, browserHistory } from 'react-router';

import routes from './routes';

import {Constants} from "./constants";

ReactDOM.render(
    <Router history={browserHistory}>{routes}</Router>,
    document.getElementById(Constants.Ids.screen)
);
