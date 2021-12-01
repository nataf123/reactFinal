import React from "react";
import { Stack, Button } from "@chakra-ui/react";

const Home = () => {

    return(<Stack spacing={10} direction='column' align='center'>
    <Button colorScheme='primary' size='lg'>
      <a href="/files">Manage Files</a>
    </Button>
    <Button colorScheme='primary' size='lg'>
      <a href="/users">Find Users</a>
    </Button>
  </Stack>)

}

export default Home;

