import { Box, Container, Flex } from '@chakra-ui/react';
import FeedPosts from '../../components/FeedPosts/FeedPosts';

const HomePage = () => {
  return (
    <Container maxW={'container.lg'} bg={''}>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <FeedPosts />
        </Box>
        <Box
          flex={1}
          mr={20}
          display={{ base: 'none', md: 'block' }}
          maxW={'300px'}>
          Suggested
        </Box>
      </Flex>
    </Container>
  );
};
export default HomePage;
