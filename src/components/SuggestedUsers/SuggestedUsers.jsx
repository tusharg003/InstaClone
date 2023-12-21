import { Text, Flex, VStack, Box, Link, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import SuggestedHeader from './SuggestedHeader';
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers';
import SuggestedUser from './SuggestedUser';

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  // optional: render loading skeleton
  if (isLoading) {
    // Display a loading skeleton while data is being fetched
    return (
      <VStack py={8} px={6} gap={3}>
        <SuggestedHeader />

        <Flex alignItems='center' justifyContent='space-between' w='full'>
          <Skeleton height='16px' width='120px' />
          <Skeleton height='16px' width='50px' />
        </Flex>

        {[...Array(3)].map((_, index) => (
          <Flex alignItems='center' justifyContent='space-between' gap={2} key={index}>
            <SkeletonCircle size={12}/>
            <VStack spacing={2} alignItems='flex-start'>
              <Skeleton height='12px' width='120px' />
              <Skeleton height='12px' width='50px' />
            </VStack>
          </Flex>
        ))}
      </VStack>
    );
  }

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

      {suggestedUsers.length !== 0 && (
        <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
          <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={'bold'}
            _hover={{ color: 'gray.400' }}
            cursor={'pointer'}>
            See All
          </Text>
        </Flex>
      )}

      {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))}

      <Box fontSize={12} color={'gray.500'} mt={5} alignSelf={'flex-start'}>
        © 2023 Built By{' '}
        <Link
          href='https://github.com/tusharg003'
          target='_blank'
          color={'blue.500'}
          fontSize={12}>
          Tushar Gupta
        </Link>
      </Box>
    </VStack>
  );
};
export default SuggestedUsers;
