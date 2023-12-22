import { Box, Link, Tooltip } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
const Home = () => {
  return (
    <Tooltip
      hasArrow
      label={'Home'}
      placement='right'
      openDelay={500}
      ml='1'
      display={{ base: 'block', md: 'none' }}>
      <Link
        display={'flex'}
        to={'/'}
        as={RouterLink}
        gap={4}
        p={2}
        w={{ md: 'full' }}
        borderRadius={6}
        alignContent={'center'}
        _hover={{ bg: 'whiteAlpha.400' }}
        justifyContent={{ base: 'center', md: 'flex-start' }}>
        <AiFillHome size={25} />
        <Box display={{ base: 'none', md: 'block' }}>Home</Box>
      </Link>
    </Tooltip>
  );
};
export default Home;
