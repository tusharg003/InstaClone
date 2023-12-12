import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';

const ProfileHeader = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: 'column', sm: 'row' }}>
      <AvatarGroup
        size={{ base: 'xl', md: '2xl' }}
        justifySelf={'center'}
        alignSelf={'flex-start'}
        mx={'auto'}>
        <Avatar src='/img1.png' name='lady' alt='lady' />
      </AvatarGroup>

      <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
        <Flex
          gap={4}
          direction={{ base: 'column', sm: 'row' }}
          justifyContent={{ base: 'column', sm: 'row' }}
          alignItems={'center'}
          w={'full'}>
          <Text fontSize={{ base: 'sm', md: 'lg' }}>tushar gupta</Text>
          <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
            <Button
              bg={'white'}
              color={'black'}
              _hover={{ bg: 'whiteAlpha.800' }}
              size={{ base: 'xs', md: 'sm' }}>
              Edit Profile
            </Button>
          </Flex>
        </Flex>

        <Flex alignItems={'center'} gap={{ base: 2, sm: 4 }}>
          <Text>
            <Text as='span' fontWeight={'bold'} mr={1}>
              4
            </Text>
            Posts
          </Text>{' '}
          <Text>
            <Text as='span' fontWeight={'bold'} mr={1}>
              4,000
            </Text>
            Followers
          </Text>
          <Text>
            <Text as='span' fontWeight={'bold'} mr={1}>
              40
            </Text>
            Following
          </Text>
        </Flex>

        <Flex alignItems={'center'}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            Tushar Gupta
          </Text>
        </Flex>
        <Text fontSize={'sm'}>
          Khul ke ro nahi sakogi, toh khul ke has kaise paogi?
        </Text>
      </VStack>
    </Flex>
  );
};
export default ProfileHeader;
