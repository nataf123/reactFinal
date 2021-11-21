import './App.css';
import Users from './components/Users';
import Files from './components/Files';
import Login from './components/Login';
import Signup from './components/Signup';
import AddFile from './components/AddFile';
import Virustotal from './components/Virustotal';
import ShowUser from './components/ShowUser';
import ShowFile from './components/ShowFile';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component, useState } from 'react'
import { addFile, fileDetails, addUser, getUser, removeUser, listUsers, removeFile, listFiles, virustotal } from './requestHandler'
import Header from "./components/Header";

function App() {
  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3456/")
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/users" component={Users} exact />
          <Route path="/files" component={Files} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/addfile" component={AddFile} exact />
          <Route path="/virustotal" component={Virustotal} exact />
          <Route path="/showfile" component={ShowFile} exact />
          <Route path="/showuser" component={ShowUser} exact />

        </Switch>
      </Router>
    </div>
  );
}


export default App;
