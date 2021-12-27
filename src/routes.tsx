import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Stops from './pages/Stops'

const Routes =  () => {
    return(
        <BrowserRouter>
            <Route  component={Home} path='/busfriend-web' exact />
            <Route  component={Stops} path='/stops' />
          </BrowserRouter>
    );
}

export default Routes;