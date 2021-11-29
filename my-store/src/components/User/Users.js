import React from "react";
import { listUsers } from "../../requestHandler";
import {useState} from "react"
import User from './User.js'
import { Link } from "react-router-dom";


const Users = () => {
    var data = [];
    const [users, setUsers] = useState([]);
    React.useEffect(() => {
        async function fetchData() {
            data =  await listUsers();
            setUsers(data)
        }
        fetchData();
      }, []);
    
      var userList = users.map(function(user){
        return <div> <li style={{"list-style" : "none"}}>
            <Link to={`/users/${user.username}`}>{<User user={user} />}</Link>
            </li> </div>;
      })

    return (
        <div>
            {users === [] && "Loading Users.."}
            {users !== [] && userList}
        </div>
    )
}

export default Users;