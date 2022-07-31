import React from 'react';
import {Switch, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import HulpVragen from "./pages/HulpVragen";
import HulpAanbieden from "./pages/HulpAanbieden";
import Gebruikers from "./pages/Gebruikers";
import VacMaken from "./pages/VacMaken";
import VacOfferPage from "./pages/VacOfferPage";
import VacSearchPage from "./pages/VacSearchPage";
import MijnVacs from "./pages/MijnVacs";


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
                      exact path="/hulp-aanbieden/:offerId" component={VacOfferPage}>
                      <VacOfferPage/>
                  </Route>
                  <Route
                      exact path="/hulp-vragen/:searchId" component={VacSearchPage}>
                      <VacSearchPage/>
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
