import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import NewJam from './pages/NewJam';
import Home from './pages/Home';
import EditJam from './pages/EditJam';
import Jam from './components/Jam';
import NotFound from './pages/NotFound';
import { JamsContext } from './App';

export default function Router({ jams }) {
  const { handleEditJam, handleAddJam } = useContext(JamsContext);
  return (
    <Switch>
      <Route
        path="/new"
        render={props => <NewJam handleAddJam={handleAddJam} />}
      />
      <Route
        path="/jams/edit/:songslug"
        render={props => <EditJam {...props} handleEditJam={handleEditJam} />}
      />
      <Route path="/jams/:songslug" component={Jam} />
      <Route exact path="/" render={props => <Home {...props} jams={jams} />} />
      <Route component={NotFound} />
    </Switch>
  );
}
