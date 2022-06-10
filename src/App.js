import React from 'react';
import {Switch, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import HulpVragen from "./pages/HulpVragen";
import HulpZoeken from "./pages/HulpZoeken";


function App() {
  return (
      <>
          <NavBar />
          <div className="content">
              <Switch>
                  <Route
                      exact path="/">
                      <Home/>
                  </Route>
                  <Route
                      path="/profile">
                      <Profile/>
                  </Route>
                  <Route
                      exact path="/signin">
                      <SignIn/>
                  </Route>
                  <Route
                      exact path="/signup">
                      <SignUp/>
                  </Route>
                  <Route
                      exact path="/hulp-vragen">
                      <HulpVragen/>
                  </Route>
                  <Route
                      exact path="/hulp-zoeken">
                      <HulpZoeken/>
                  </Route>
              </Switch>
          </div>
      </>
  );
}

export default App;
