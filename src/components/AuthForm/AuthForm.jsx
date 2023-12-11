import {
  Box,
  VStack,
  Image,
  Input,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleAuth = () => {
    if (!inputs.email || !inputs.password) {
      alert('Please fill all the feilds');
      return;
    }
    navigate('/'); 
  };

  return (
    <>
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src='public/logo.png' />
          <Input
            placeholder='Email'
            fontSize={15}
            type='email'
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
          <Input
            placeholder='Password'
            fontSize={15}
            type='password'
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />

          {!isLogin ? (
            <Input
              placeholder='Confirm Password'
              fontSize={15}
              type='password'
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          ) : null}

          <Button
            width={'full'}
            colorScheme='blue'
            size={'sm'}
            fontSize={15}
            onClick={handleAuth}>
            {isLogin == true ? 'Login' : 'Sign-Up'}
          </Button>

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

          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            cursor={'pointer'}>
            <Image src='public/google.png' w={'6'} alt='google logo' />
            <Text mx={'2'} color={'blue.500'}>
              Log in with Google
            </Text>
          </Flex>
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
