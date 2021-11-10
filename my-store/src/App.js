import './App.css';
import React, { Component, useState } from 'react'
import { addFile, fileDetails, addUser, getUser, removeUser, listUsers, removeFile, listFiles, virustotal } from './requestHandler'

function App() {
  const [data, setData] = React.useState(null);
  const [users, setUsers] = useState();

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3456/")
      setData(await response.text())
    }
    fetchData();
  }, []);



  const Users = async () => {
    const users = await getUser("shlomo");
    console.log(users)
    setUsers(JSON.stringify(users))
    
  }

  const fill = () => {
    console.log("pressed")
  }
  return (
    <div className="App">
      <p>{!data ? "Loading..." : data}</p>
      <p>{!users ? "loading users" : users}</p>

      <button onClick={Users}>
        listUsers
      </button>

      <button onClick={fill}>
        addFile
      </button>

      <button onClick={fill}>
        fileDetails
      </button>

      <button onClick={fill}>
        addUser
      </button>

      <button onClick={fill}>
        getUser
      </button>

      <button onClick={fill}>
        removeUser
      </button>

      <button onClick={fill}>
        removeFile
      </button>

      <button onClick={fill}>
        listFiles
      </button>

      <button onClick={fill}>
        virustotal
      </button>

    </div>
  );
}


export default App;
