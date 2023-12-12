import { GridItem, Flex, Text, Image } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
const ProfilePost = ({ img }) => {
  return (
    <GridItem
      borderRadius={4}
      cursor={'pointer'}
      overflow={'hidden'}
      border={'1px solid'}
      borderColor={'whiteAlpha.300'}
      position={'relative'}
      aspectRatio={1 / 1}>
      <Flex
        opacity={0}
        _hover={{ opacity: 1 }}
        position={'absolute'}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={'blackAlpha.700'}
        transition={'all 0.3s ease'}
        zIndex={1}
        justifyContent={'center'}>
        <Flex alignItems={'center'} justifyContent={'center'} gap={50}>
          <Flex>
            <AiFillHeart size={25} />
            <Text fontWeight={'bold'}> 7</Text>
          </Flex>
          <Flex>
            <FaComment size={25} />
            <Text fontWeight={'bold'}> 7</Text>
          </Flex>
        </Flex>
      </Flex>

      <Image
        src={img}
        alt='profile-pic'
        w={'100%'}
        h={'100%'}
        objectFit={'cover'}
      />
    </GridItem>
  );
};
export default ProfilePost;
