import * as React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './routes';

import {Constants} from './constants';
import {Datastore} from './datastore';

import {LogManager} from './logging/logManager';

window.onbeforeunload = (event) => {
    LogManager.getLogger().send();
}

Datastore.loadConstants().then(() => {
    render(
        <Router history={browserHistory}>{routes}</Router>,
        document.getElementById(Constants._.Ids.screen)
    );
});
