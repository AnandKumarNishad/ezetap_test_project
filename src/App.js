import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import ErrorPage from './components/ErrorPage';
import Admin from './components/Admin';
import User from './components/User';
import Agreements from './components/Agreements';
import CreateUser from './components/CreateUser';
import CreateAgreement from './components/CreateAgreement';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = "/" element = { <Login/> } />
          <Route exact path = "/admin" element = { <Admin/> } />
          <Route exact path = "/user" element = { <User/> } />
          <Route exact path = "/agreements" element = { <Agreements/> } />
          <Route exact path = "/createuser" element = { <CreateUser/> } />
          <Route exact path = "/creatagreement" element = { <CreateAgreement/> } />
          <Route path = "*" element = { <ErrorPage/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;