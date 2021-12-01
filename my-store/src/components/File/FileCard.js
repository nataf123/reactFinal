import react from "react"
import {virustotal} from '../../requestHandler'
import {
    Box, Image, Badge, Text, Stack,
    useColorMode, Button, Flex, Spacer
}
    from "@chakra-ui/react";
const FileCard = (props) => {

const checkVirusTotal = async () => {
    const data = await virustotal(props.file.md5);  //TODO: check y backend isnt working
    console.log(data)
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
                            colorScheme="green" size="sm" onClick={checkVirusTotal}>
                            Check Virustotal
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </div>
    )
}

export default FileCard;
