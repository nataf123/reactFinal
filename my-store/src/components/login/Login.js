import { getUser } from "../../requestHandler";
import { useState } from "react";
import Alert from 'react-bootstrap/Alert'
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router';

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Home from "../Home/Home";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = (props) => {

  const [username, setUsername] = useState("")
  const [password, setpassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    //e.preventDefault();
    const user = await getUser(username);
    if (user.err) {
      setShowAlert(true);
    }
    else {
      sessionStorage.setItem('isLogged', true);
      sessionStorage.setItem('username', user.username);
    }
  }

  const onClickSignup = () => {
    sessionStorage.setItem('loginMethod', "signup");
  }

  // if(sessionStorage.getItem('isLogged')){
  //   return <Link to="/files"></Link>
  // }

  return (
    <div>

      {showAlert && <Alert variant='danger' justifyContent="center"
        alignItems="center">
        User doesn't exist!
      </Alert>}

      <Flex
      flexDirection="column"
      width="100wh"
      height="80vh"
      justifyContent="center"
      alignItems="center"
      >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="primary.500" />
        <Heading color="primary.500">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleLogin}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input placeholder="Username" onChange={(e) => setUsername(e.currentTarget.value)} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setpassword(e.currentTarget.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                backgroundColor="primary.500"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="primary.500" onClick={onClickSignup} href="/signup">
          Sign Up
        </Link>
      </Box>
    </Flex>
    </div >
  );
};

export default Login;
