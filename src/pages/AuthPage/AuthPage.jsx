import { Flex, Container, Box, Image, VStack } from '@chakra-ui/react';
import AuthForm from '../../components/AuthForm/AuthForm';
import authPNG from '../../../public/auth.png';

const AuthPage = () => {
  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'} px={4}>
      <Container maxW={'contaienr.md'} padding={0}>
        <Flex justifyContent={'center'} alignItems={'center'} gap={10}>
          {/**/}
          {/* left hand side */}
          <Box display={{ base: 'none', md: 'block' }}>
            {/* base none means that in small devices the pic display will be none else block*/}
            <Image src={authPNG} h={650} alt='Phone img' />
          </Box>

          {/* Righthand side */}
          <VStack spacing={4} align={'stretch'}>
            <AuthForm />
            {/* <Box textAlign={'center'}>Get the App</Box>
            <Flex gap={5} justifyContent={'center'}>
              <Image src='public/playstore.png' h={'10'} alt='Playstore logo' />
              <Image src='public/microsoft.png' h={'10'} alt='Playstore logo' />
            </Flex> */}
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};
export default AuthPage;
