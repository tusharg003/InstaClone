import { Avatar, Text, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const SuggestedHeader = () => {
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Avatar name='Tushar Gupta' size={'md'} src='/img1.png' />
        <Text fontSize={12} fontWeight={'bold'}>
          Tushar Gupta
        </Text>
      </Flex>
      <Link
        as={RouterLink}
        to={'/auth'}
        fontSize={14}
        fontWeight={'medium'}
        color={'blue.500'}
        style={{ textDecoration: 'none' }}
        _hover={{ color: 'white' }}
        cursor={'pointer'}>
        Log out
      </Link>
    </Flex>
  );
};
export default SuggestedHeader;
