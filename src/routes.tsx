import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Stops from './pages/Stops'

const Routes =  () => {
    return(
        <BrowserRouter>
            <Route  component={Home} path='/busfriend' exact />
            <Route  component={Stops} path='/stops' exact />
          </BrowserRouter>
    );
}

export default Routes;