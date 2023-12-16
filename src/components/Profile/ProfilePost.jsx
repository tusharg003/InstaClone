import {
  GridItem,
  Flex,
  Text,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  Avatar,
  Divider,
  VStack,
} from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { FaComment } from 'react-icons/fa';
import Comment from '../Comment/Comment';
import PostFooter from '../FeedPosts/PostFooter';
const ProfilePost = ({ img }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <GridItem
        borderRadius={4}
        cursor={'pointer'}
        overflow={'hidden'}
        border={'1px solid'}
        borderColor={'whiteAlpha.300'}
        position={'relative'}
        aspectRatio={1 / 1}
        onClick={onOpen}>
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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: '3xl', md: '5xl' }}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={'black'} pb={'5'}>
            <Flex
              gap={'4'}
              w={{ base: '90%', small: '70%', md: 'full' }}
              mx={'auto'}>
              <Box
                borderRadius={4}
                overflow={'hidden'}
                border={'1px solid'}
                borderColor={'whiteAlpha.300'}
                flex={1.5}>
                <Image src={img} alt='profile post' />
              </Box>
              <Flex
                flex={1}
                flexDir={'column'}
                px={10}
                display={{ base: 'none', md: 'flex' }}>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                  <Flex alignItems={'center'} gap={4}>
                    <Avatar
                      src='/profilepic.png'
                      size={'sm'}
                      name='name of pic'
                    />
                    <Text fontWeight={'bold'} fontSize={12}>
                      username1234
                    </Text>
                  </Flex>

                  <Box
                    _hover={{ bg: 'whiteAlpha.300', color: 'red.600' }}
                    borderRadius={4}
                    p={1}>
                    <MdDelete size={20} cursor={'pointer'} />
                  </Box>
                </Flex>
                <Divider my={4} bg={'gray.500'} />

                <VStack
                  w={'full'}
                  alignItems={'start'}
                  maxH={'350px'}
                  overflowY={'auto'}>
                  <Comment
                    createdAt='1d ago'
                    username='_iamsrk'
                    profliePic='/profilepic.png'
                    text='dummy pic from upslacsh'
                  />
                </VStack>
                <Divider my={4} bg={'gray.800'} />

                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ProfilePost;
