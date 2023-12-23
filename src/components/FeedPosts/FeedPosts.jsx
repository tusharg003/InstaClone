import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from '@chakra-ui/react';
import FeedPost from '../../components/FeedPosts/FeedPost';
import useGetFeedPosts from '../../hooks/useGetFeedPosts';
const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
            <Flex gap='2'>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={'flex-start'}>
                <Skeleton h={'10px'} w={'200px'} />
                <Skeleton h={'10px'} w={'200px'} />
              </VStack>
            </Flex>
            <Skeleton w={'full'}>
              <Box h={'400px'}>contents wrapeed</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}

      {!isLoading && posts.length === 0 && (
        <>
          <Text fontSize={'l'} color={'red.600'}>
            Looks like you dont have any friends,
          </Text>
          <Text fontSize={'l'} color={'red.600'}>
            Follow people to see there posts!
          </Text>
        </>
      )}
    </Container>
  );
};
export default FeedPosts;
