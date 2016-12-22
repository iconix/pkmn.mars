import * as React from 'react';
import { Redirect, Route } from 'react-router';

import {Arena} from './components/arena';
import {SaveLocation} from './components/saveLocation';

var routeMap = (
    <Route>
        <Route path="/" component={Arena} />
        <Route path="/saveLocation" component={SaveLocation}/>
        <Redirect from="*" to="/" />
    </Route>
);

export default routeMap;
