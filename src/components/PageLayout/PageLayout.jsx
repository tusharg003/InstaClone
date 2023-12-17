import { Box, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';

// instead of adding sidebar component to every page we just it once in the pageLayout componet and wrap the children with it, This
// way we can have sidebar in every page expect for the auth page

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const canRenderSidebar = pathname !== '/auth' && user;
  
  //   console.log(location);
  return (
    <Flex>
      {/* Side bar on the left */}
      {canRenderSidebar ? (
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
