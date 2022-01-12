import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

import Server from './components/ServerPage';
import Channels from './components/ChannelsPage';
import Messages from './components/MessagePage';
import ServerDetail from './components/ServerDetail'

import Landing from './components/Landing';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <Landing />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route path='/channels' exact>
          <div className='ChannelAndServerContainer'>
            <Server />
            <Channels />
          </div>
        </Route>
        <Route exact path='/channels/:serverId' >
          <div className='ChannelAndServerContainer'>

            <Server />
            <ServerDetail />
            <Channels />
          </div>
        </Route>
        <Route path='/channels/:serverId/:channelId' >
          <div className='ChannelAndServerContainer'>
            <Server />
            <Channels />
            <Messages />
            <ServerDetail />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
