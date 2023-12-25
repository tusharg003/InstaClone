import { Button, Container, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Container maxW={'container.lg'} my={1}>
      <Flex
        w={'full'}
        justifyContent={{ base: 'center', sm: 'space-between' }}
        alignItems={'center'}>
        <Image
          src='../../../logo.png'
          h={16}
          display={{ base: 'none', sm: 'block' }}
          cursor={'pointer'}
        />
        <Flex gap={4}>
          <Link to='/auth'>
            <Button colorScheme={'blue'} size={'sm'}>
              Login
            </Button>
          </Link>
          <Link to='/auth'>
            <Button variant={'outline'} size={'sm'}>
              Signup
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
