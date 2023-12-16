import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  return (
    <>
      <Input
        placeholder='Email'
        fontSize={15}
        type='email'
        size={'sm'}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder='Username'
        fontSize={15}
        type='text'
        size={'sm'}
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />
      <Input
        placeholder='Full Name'
        fontSize={15}
        type='text'
        size={'sm'}
        value={inputs.fullName}
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
      />
      <InputGroup>
        <Input
          placeholder='Password'
          fontSize={15}
          type={showPassword ? 'text' : 'password'}
          value={inputs.password}
          size={'sm'}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />

        <InputRightElement>
          <Button
            variant={'ghost'}
            size={'sm'}
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Your browser is outdated!</AlertTitle>
          <AlertDescription>
            Your Chakra experience may be degraded.
          </AlertDescription>
        </Alert>
      )}
      
      <Button
        width={'full'}
        colorScheme='blue'
        size={'sm'}
        fontSize={15}
        isLoading={loading}
        onClick={() => signup(inputs)}>
        Sign Up
      </Button>
    </>
  );
};
export default Signup;
