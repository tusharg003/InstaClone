import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
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
      
      <Button width={'full'} colorScheme='blue' size={'sm'} fontSize={15}>
        Sign Up
      </Button>
    </>
  );
};
export default Signup;
