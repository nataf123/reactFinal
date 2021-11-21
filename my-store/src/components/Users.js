import React from "react";
import { listUsers } from "../requestHandler";
import {useState} from "react"

const Users = async () => {
    const [users, setUsers] = useState([]);
    const data = await listUsers();
    setUsers(data)
    

    return (
        <div>
            {users === [] && "Loading Users.."}
            {users !== [] && users}
        </div>
    )
}

export default Users;