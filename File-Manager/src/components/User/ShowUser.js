import React from "react";
import {useState} from "react"
import { getUser } from "../../requestHandler";
import UserCard from "./UserCard";

const ShowUser = (props) =>{
    var data;
    const [user, setUser] = useState([]);
    React.useEffect(() => {
        async function fetchData() {
            data =  await getUser(props.match.params.username);
            setUser(data)
        }
        fetchData();
      }, []);

    return (
        <div>
        {!user && "Loading user.."}
        {user && <UserCard user={user}></UserCard>}
        </div>
    )
}

export default ShowUser;