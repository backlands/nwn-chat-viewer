import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Upload from '../../components/Upload';
import Placeholder from '../../components/Placeholder';

import './styles.scss';

export default () => (
  <div className="App">
    <Router>
      <Route
        render={({ location }) => (
          <Switch location={location} key={location.pathname}>
            <Route exact path="/"><Upload /></Route>
            <Route exact path="/viewer"><Placeholder text="Viewer" /></Route>
            <Route exact path="/highlights"><Placeholder text="Contact" /></Route>
          </Switch>
        )}
      />
    </Router>
  </div>
);
