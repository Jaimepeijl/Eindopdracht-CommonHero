import React from 'react';
import {Switch, Route} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile/Profile'
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/Signup/SignUp';
import './App.css';
import HulpVragen from "./pages/HulpVragen";
import HulpAanbieden from "./pages/HulpAanbieden";
import Gebruikers from "./pages/Admin/Gebruikers";
import VacMaken from "./pages/VacMaken";
import MijnVacs from "./pages/MijnVacs";
import SingleVacPage from "./pages/SingleVacPage";


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
                      exact path="/hulp-aanbieden">
                      <HulpAanbieden/>
                  </Route>
                  <Route
                      exact path="/hulp-vragen">
                      <HulpVragen/>
                  </Route>
                  <Route
                      path="/gebruikers/admin">
                      <Gebruikers/>
                  </Route>
                  <Route
                      exact path="/vacmaken">
                      <VacMaken/>
                  </Route>
                  <Route
                      exact path="/:vactype/:Id" component={SingleVacPage}>
                      <SingleVacPage/>
                  </Route>
                  <Route
                      exact path="/mijnvacs">
                      <MijnVacs/>
                  </Route>
              </Switch>
          </div>
      </>
  );
}

export default App;
