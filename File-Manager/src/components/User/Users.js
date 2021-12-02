import React from "react";
import { listUsers } from "../../requestHandler";
import { useState } from "react"
import User from './User.js'
import { Link } from "react-router-dom";
import { Stack, Button } from "@chakra-ui/react";


const Users = () => {
    var data = [];
    const [users, setUsers] = useState([]);
    React.useEffect(() => {
        async function fetchData() {
            data = await listUsers();
            console.log(data)
            setUsers(data)
        }
        fetchData();
    }, []);

    var userList = users.map(function (user) {
        return <div> <li style={{ "list-style": "none" }}>
            <Button colorScheme='primary' size='lg'>
                <Link to={`/users/${user.username}`}>{<User user={user} />}</Link>
            </Button>
        </li> <br/> </div>;
    })

    return (
        <div>
            {users === [] && "Loading Users.."}
            {users !== [] && userList}
        </div>
    )
}

export default Users;