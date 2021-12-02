import react, { useState } from "react"
import { virustotal, removeFile } from '../../requestHandler'
import {
    Box, Image, Badge, Text, Stack,
    useColorMode, Button, Flex, Spacer
}
    from "@chakra-ui/react";
const FileCard = (props) => {
    const [buttonText, setButtonText] = useState("Check Virustotal")
    const [disableButton, setDisableButton] = useState(false);

    if (props.file == null) {
        return <div></div>
    }

    const deleteFile = async () => {
        const res = await removeFile(sessionStorage.getItem("username"), props.file._id);
        if (res.err) {
            console.log(res.err)
        } else {
            props.refresh();
        }
    }

    const checkVirusTotal = async () => {
        setDisableButton(true);
        setButtonText("Loading..")
        const data = await virustotal(props.file.md5);  //TODO: check y backend isnt working
        console.log(data)
        if (data.err) {
            setButtonText("Error. press to try again")
            setDisableButton(false);
        } else {
            const malicious = data.malicious;
            setButtonText(`${malicious} malicious Found!`)
        }

    }


    return (
        <div className="app">
            <Box w="500px" rounded="20px"
                overflow="hidden" bg="gray.200" mt={10}>
                <Box p={5}>
                    <Stack align="center">
                        <Badge variant="solid" colorScheme="green"
                            rounded="full" px={2}>
                            {props.file.name}
                        </Badge>
                    </Stack>
                    <Stack align="center">
                        <Text as="h2" fontWeight="normal" my={2} >
                            Size: {props.file.size}
                        </Text>
                        <Text fontWeight="light">
                            MD5: {props.file.md5}
                        </Text>
                    </Stack>
                    <Flex>
                        <Spacer />
                        <Button variant="solid"
                            colorScheme="green" size="sm" onClick={checkVirusTotal} disabled={disableButton}>
                            {buttonText}
                        </Button>

                        <Button variant="solid"
                            colorScheme="red" size="sm" onClick={deleteFile}>
                            Remove File
                        </Button>

                    </Flex>

                </Box>
            </Box>
        </div>
    )
}

export default FileCard;
