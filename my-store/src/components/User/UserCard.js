import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function UserCard(props) {
      var fileAmount = 0;
      if(props.user.files){
          fileAmount = props.user.files.length;
      }
    return (
      <Center py={6}>
        <Box
          maxW={'500px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src='../../sources/avatar.png'
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {props.user.username}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            @{props.user.username}
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
                
            Has {fileAmount} Files
                
            </Text>
        </Box>
      </Center>
    );
  }