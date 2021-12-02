import { useState } from "react";
import { addUser } from "../../requestHandler";
import { Redirect } from "react-router-dom";
import { Alert } from "bootstrap";
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

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const Signup = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    const [showAlert, setShowAlert] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const onClickSignup = () => {
        sessionStorage.setItem('loginMethod', "signup");
      }

    const handleSignup = async (e) => {
        e.preventDefault();
        const res = await addUser(username, password)
        if (res == true) {
            sessionStorage.setItem('isLogged', true);
            window.location.reload(false);
        }
        else {
            setShowAlert(true);
        }
    }


    return (

        <Flex
            flexDirection="column"
            width="100wh"
            height="80vh"
            justifyContent="center"
            alignItems="center"
        >
            {showAlert && <Alert key='primary'>
                Username or Password are invalid!
            </Alert>}
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="primary.500" />
                <Heading color="primary.500">Create An Account</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form onSubmit={handleSignup}>
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
                                Signup
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                Already have an account?{" "}
                <Link color="primary.500" href="/login" onClick={onClickSignup}>
                    Log in
                </Link>
            </Box>
        </Flex>
    );
};


export default Signup;