import './App.css';
import Home from './components/Home/Home.js'
import Users from './components/User/Users';
import Files from './components/File/Files';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import AddFile from './components/File/AddFile';
import ShowUser from './components/User/ShowUser';
import ShowFile from './components/File/ShowFile';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import React, { Component, useState } from 'react'
import Header from "./components/UI/Header";


function App() {

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3456/")
    }
    fetchData();
  }, []);

 

  if (!sessionStorage.getItem('isLogged') || sessionStorage.getItem('isLogged') == 'false') {

    if (sessionStorage.getItem('loginMethod') == "signup") {
      return <Signup />
    }
    else {
      return <Login />
    }
  }

  return (
    <div className="App">
      <Header />

      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/users" component={Users} exact />
          <Route path="/files" component={Files} exact />
          <Route path="/addfile" component={AddFile} exact />
          <Route path="/showfile" component={ShowFile} exact />
          <Route path="/users/:username" component={ShowUser} exact />
          <Route path="/" component={Home} />
        </Switch>
      </Router>

    </div>
  );
}


export default App;
