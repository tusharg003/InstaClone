import { Box, Button, Flex, Link, Tooltip } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { InstagramLogo, InstagramMobileLogo } from '../../assets/constants';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';
import SidebarItems from './SidebarItems';

const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  return (
    <Box
      height={'100vh'}
      borderRight={'1px solid'}
      borderColor={'whiteAlpha.300'}
      py={8}
      position={'sticky'}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}>
      <Flex direction={'column'} gap={5} w={'full'} h={'full'}>
        <Link
          to={'/'}
          as={RouterLink}
          pl={2}
          display={{ base: 'none', md: 'block' }}
          cursor='pointer'>
          <InstagramLogo />
        </Link>

        <Link
          display={{ base: 'block', md: 'none' }}
          to={'/'}
          as={RouterLink}
          gap={5}
          pl={3.5}
          w={{ md: 'full' }}
          borderRadius={6}
          alignContent={'center'}
          _hover={{ bg: 'whiteAlpha.400' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          mb={5}>
          <InstagramMobileLogo />
        </Link>

        <Flex direction={'column'} gap={3} cursor={'pointer'}>
          <SidebarItems />
        </Flex>

        {/*logout link*/}

        <Tooltip
          hasArrow
          label={'Log-Out'}
          placement='right'
          openDelay={500}
          ml='1'
          display={{ base: 'block', md: 'none' }}>
          <Flex
            onClick={handleLogout}
            gap={0}
            p={3}
            w={{ md: 'full' }}
            borderRadius={6}
            alignItems={'center'}
            _hover={{ bg: 'whiteAlpha.400' }}
            justifyContent={{ base: 'center', md: 'flex-start' }}
            mt={'auto'}>
            <BiLogOut size={25} />
            <Button
              display={{ base: 'none', md: 'block' }}
              variant={'ghost'}
              _hover={{ bg: 'transparent' }}
              isLoading={isLoggingOut}>
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};
export default Sidebar;
