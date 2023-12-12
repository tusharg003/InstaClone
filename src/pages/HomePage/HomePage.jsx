import { Box, Container, Flex } from '@chakra-ui/react';
import FeedPosts from '../../components/FeedPosts/FeedPosts';
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers';

const HomePage = () => {
  return (
    <Container maxW={'container.lg'}>
      <Flex gap={10} justifyContent={'space-between'}>
        <Box flex={2} py={10}>
          <FeedPosts />
        </Box>
        <Box
          flex={1}
          mr={20}
          display={{ base: 'none', md: 'block' }}
          maxW={'300px'}
          minW={'240px'}>
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};
export default HomePage;
