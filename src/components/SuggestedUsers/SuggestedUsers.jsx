import { Text, Flex, VStack, Box, Link } from '@chakra-ui/react';
import SuggestedHeader from './SuggestedHeader';
import SuggestedUser from './SuggestedUser';

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

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

      <SuggestedUser
        name='Tushar Gupta'
        followers={'12121'}
        avatar='https://bit.ly/dan-abramov'
      />
      <SuggestedUser
        name='Tushar Gupta'
        followers={'12121'}
        avatar='https://bit.ly/dan-abramov'
      />
      <SuggestedUser
        name='Tushar Gupta'
        followers={'12121'}
        avatar='https://bit.ly/dan-abramov'
      />

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
