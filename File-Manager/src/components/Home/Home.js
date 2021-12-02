import React from "react";
import { Stack, Button } from "@chakra-ui/react";
import {removeUser} from '../../requestHandler'

const Home = () => {

  const deleteAccount = async (e) => {
    e.preventDefault();
    sessionStorage.setItem('isLogged', false);
    await removeUser(sessionStorage.getItem("username"));
    window.location.reload(false);
  }

    return(<Stack spacing={10} direction='column' align='center'>
    <Button colorScheme='primary' size='lg'>
      <a href="/files">Manage Files</a>
    </Button>
    <Button colorScheme='primary' size='lg'>
      <a href="/users">Find Users</a>
    </Button>

    <Button colorScheme='primary' size='lg' onClick={deleteAccount}>
      Delete Account
    </Button>
  </Stack>)

}

export default Home;

