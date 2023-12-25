import { Button, Container, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import instaLogo from '../../../public/logo.png';

const Navbar = () => {
  return (
    <Container maxW={'container.lg'} my={1}>
      <Flex
        w={'full'}
        justifyContent={{ base: 'center', sm: 'space-between' }}
        alignItems={'center'}>
        <Image
          src={instaLogo}
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
