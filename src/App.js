import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
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
              <Routes>
                  <Route
                      exact path="/">
                      element={<Home/>}
                  </Route>
                  <Route
                      path="/profile">
                      element={<Profile/>}
                  </Route>
                  <Route
                      exact path="/signin">
                      element={<SignIn/>}
                  </Route>
                  <Route
                      exact path="/signup">
                      element={<SignUp/>}
                  </Route>
                  <Route
                      exact path="/hulp-vragen">
                      element={<HulpVragen/>}
                  </Route>
                  <Route
                      exact path="/hulp-zoeken">
                      element={<HulpZoeken/>}
                  </Route>
              </Routes>
          </div>
      </>
  );
}

export default App;
