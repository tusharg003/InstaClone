import { Avatar, Box, Button, Flex, Link, Tooltip } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
} from '../../assets/constants';
import { AiFillHome } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';

const Sidebar = () => {
  const sidebarItems = [
    {
      icon: <AiFillHome size={25} />,
      text: 'Home',
      link: '/',
    },
    {
      icon: <SearchLogo />,
      text: 'Search',
    },
    {
      icon: <NotificationsLogo />,
      text: 'Notifications',
    },
    {
      icon: <CreatePostLogo />,
      text: 'Create Post',
    },
    {
      icon: <Avatar size={'sm'} name='Tushar Gupta' src='#' />,
      text: 'Profile',
      link: '/:username',
    },
  ];
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
          {sidebarItems.map((item, index) => (
            <Tooltip
              key={index}
              hasArrow
              label={item.text}
              placement='right'
              openDelay={500}
              ml='1'
              display={{ base: 'block', md: 'none' }}>
              <Link
                display={'flex'}
                to={item.link || null}
                as={RouterLink}
                gap={4}
                p={3}
                w={{ md: 'full' }}
                borderRadius={6}
                alignContent={'center'}
                _hover={{ bg: 'whiteAlpha.400' }}
                justifyContent={{ base: 'center', md: 'flex-start' }}>
                {item.icon}
                <Box display={{ base: 'none', md: 'block' }}>{item.text}</Box>
              </Link>
            </Tooltip>
          ))}
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
