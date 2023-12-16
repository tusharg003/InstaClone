import { Button, Input } from '@chakra-ui/react';
import { useState } from 'react';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
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
        placeholder='Password'
        fontSize={15}
        type='password'
        size={'sm'}
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />

      <Button width={'full'} colorScheme='blue' size={'sm'} fontSize={15}>
        Login
      </Button>
    </>
  );
};
export default Login;
