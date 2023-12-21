import { Box, Link, Tooltip } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { NotificationsLogo } from '../../assets/constants';
const Notifications = () => {
  return (
    <Tooltip
      hasArrow
      label={'Notifications'}
      placement='right'
      openDelay={500}
      ml='1'
      display={{ base: 'block', md: 'none' }}>
      <Link
        display={'flex'}
        to={'/'}
        as={RouterLink}
        gap={4}
        p={3}
        w={{ md: 'full' }}
        borderRadius={6}
        alignContent={'center'}
        _hover={{ bg: 'whiteAlpha.400' }}
        justifyContent={{ base: 'center', md: 'flex-start' }}>
        <NotificationsLogo />
        <Box display={{ base: 'none', md: 'block' }}>Notifications</Box>
      </Link>
    </Tooltip>
  );
};
export default Notifications;
