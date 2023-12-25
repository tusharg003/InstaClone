import { Box, VStack, Image, Flex, Text } from '@chakra-ui/react';

import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';
import instaLogo from '../../../public/logo.png'
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image
            src={instaLogo}
            h={24}
            cursor={'pointer'}
            alt='Instagram'
          />

          {isLogin ? <Login /> : <Signup />}

          {/* --------------OR---------------- */}

          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            my={4}
            gap={1}
            w={'full'}>
            <Box flex={2} h={'1px'} bg={'gray.400'} />
            <Text mx={'1'} color={'white'}>
              OR
            </Text>
            <Box flex={2} h={'1px'} bg={'gray.400'} />
          </Flex>

          <GoogleAuth prefix={isLogin ? 'Log in' : 'Sign in'} />
        </VStack>
      </Box>

      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Box mx={2} fontSize={15}>
            {isLogin ? 'Dont have an account?' : 'Already have an account?'}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            color={'blue.500'}
            cursor={'pointer'}>
            {isLogin ? 'Sign Up' : 'Log In'}
          </Box>
        </Flex>
      </Box>
    </>
  );
};
export default AuthForm;
