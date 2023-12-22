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
  Avatar,
  Divider,
  VStack,
  Button,
} from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { FaComment } from 'react-icons/fa';
import Comment from '../Comment/Comment';
import PostFooter from '../FeedPosts/PostFooter';
import useUserProfileStore from '../../store/userProfileStore';
import useAuthStore from '../../store/authStore';
import useShowToast from '../../hooks/useShowToast';
import { useState } from 'react';
import { firestore, storage } from '../firebase/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import usePostStore from '../../store/postStore';

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setIsDeleting(true);
    if (isDeleting) return;
    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, 'users', authUser.uid);
      await deleteDoc(doc(firestore, 'posts', post.id));
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      deletePost(post.id);
      decrementPostsCount(post.id);
      showToast('Success', 'Post deleted successfully', 'success');
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

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
          <Flex alignItems={'center'} justifyContent={'center'} gap={10}>
            <Flex gap={1}>
              <AiFillHeart size={25} />
              <Text fontWeight={'bold'}> {post.likes.length}</Text>
            </Flex>
            <Flex gap={1}>
              <FaComment size={25} />
              <Text fontWeight={'bold'}> {post.comments.length}</Text>
            </Flex>
          </Flex>
        </Flex>

        <Image
          src={post.imageURL}
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
              mx={'auto'}
              maxH={'90vh'}
              minH={'50vh'}>
              <Flex
                borderRadius={4}
                overflow={'hidden'}
                border={'1px solid'}
                borderColor={'whiteAlpha.300'}
                flex={1.5}
                justifyContent={'center'}
                alignItems={'center'}>
                <Image src={post.imageURL} alt='profile post' />
              </Flex>
              <Flex
                flex={1}
                flexDir={'column'}
                px={10}
                display={{ base: 'none', md: 'flex' }}>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                  <Flex alignItems={'center'} gap={4}>
                    <Avatar
                      src={userProfile.profilePicURL}
                      size={'sm'}
                      name='name of pic'
                    />
                    <Text fontWeight={'bold'} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {/*conditonal rendering of the delete post btn */}
                  {authUser &&
                    authUser.uid === userProfile.uid && ( // authUser?.uid is chained version of same code
                      <Button
                        size={'sm'}
                        bg={'transparent'}
                        _hover={{ bg: 'whiteAlpha.300', color: 'red.600' }}
                        borderRadius={4}
                        p={1}
                        isLoading={isDeleting}
                        onClick={handleDeletePost}>
                        <MdDelete size={20} cursor={'pointer'} />
                      </Button>
                    )}
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
