import { Flex, Image, Text } from '@chakra-ui/react';

const GoogleAuth = () => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
      <Image src='public/google.png' w={'6'} alt='google logo' />
      <Text mx={'2'} color={'blue.500'}>
        Log in with Google
      </Text>
    </Flex>
  );
};
export default GoogleAuth;
