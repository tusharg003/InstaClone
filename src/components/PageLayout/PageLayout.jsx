import { Box, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const PageLayout = ({ children }) => {
  const { pathName } = useLocation();

  return (
    <Flex>
      {/* Side bar on the left */}
      {pathName !== '/auth' ? (
        <Box w={{ base: '70px', md: '240px' }}>
          <Sidebar />
        </Box>
      ) : null}
      {/*the page on the right */}
      <Box flex={1} w={{ base: 'calc(100%-70px)', md: 'calc(100%-240px)' }}>
        {children}
      </Box>
    </Flex>
  );
};
export default PageLayout;
