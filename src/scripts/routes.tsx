import * as React from 'react';
import { Route } from 'react-router';

import {Arena} from './components/arena';

var routeMap = (
    <Route path="/" component={Arena}>
        {/*<IndexRoute component={HomeView}/>
        <Route path="/saveLocation" component={AboutView}/>
        <Route path="*" component={NotFoundView} />*/}
    </Route>
);

export default routeMap;
