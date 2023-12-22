import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { CreatePostLogo } from '../../assets/constants';
import { BsFillImageFill } from 'react-icons/bs';
import { useRef, useState } from 'react';
import usePreviewImg from '../../hooks/usePreviewImg';
import useShowToast from '../../hooks/useShowToast';
import useAuthStore from '../../store/authStore';
import usePostStore from '../../store/postStore';
import useUserProfileStore from '../../store/userProfileStore';
import { useLocation } from 'react-router-dom';
import { firestore } from '../../components/firebase/firebase';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from '../firebase/firebase';

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState('');
  const imageRef = useRef(null);
  const { selectedFile, setSelectedFile, handleImageChange } = usePreviewImg();
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption(null);
      setSelectedFile(null);
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={'Create'}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: 'block', md: 'none' }}>
        <Flex
          alignItems={'center'}
          gap={4}
          _hover={{ bg: 'whiteAlpha.400' }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: 'full' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          onClick={onOpen}>
          <CreatePostLogo />
          <Box display={{ base: 'none', md: 'block' }}>Create</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />

        <ModalContent bg={'black'} border={'1px solid gray'}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder='Post caption...'
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <Input
              type='file'
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <BsFillImageFill
              style={{
                marginTop: '15px',
                marginLeft: '5px',
                cursor: 'pointer',
              }}
              size={16}
              onClick={() => imageRef.current.click()}
            />
            {selectedFile && (
              <Flex
                mt={5}
                w={'full'}
                position={'relative'}
                justifyContent={'center'}>
                <Image src={selectedFile} alt='selected Img' />
                <CloseButton
                  position={'absolute'}
                  top={2}
                  right={2}
                  _hover={{
                    opacity: 1,
                    cursor: 'pointer',
                    transform: 'scale(1.1)',
                    fontWeight: 'bold',
                    border: '2 px solid white',
                    borderRadius: 'full',
                  }}
                  onClick={() => setSelectedFile(null)}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

// Custom hook for handling post creation logic
function useCreatePost() {
  // Various state initializations and hook usage
  const showToast = useShowToast(); // Hook for displaying toast notifications
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state during post creation
  const authUser = useAuthStore((state) => state.user); // Hook for accessing authenticated user info
  const createPost = usePostStore((state) => state.createPost); // Custom store hook for creating a post
  const addPost = useUserProfileStore((state) => state.addPost); // Custom store hook for adding a post to user profile
  const pathName = useLocation(); // React Router hook to access current location

  // Function to handle creating a new post
  const handleCreatePost = async (selectedFile, caption) => {
    // Checking if the operation is already loading or if an image is selected
    if (isLoading) return;
    if (!selectedFile) {
      throw new Error('Please select an Image'); // Throws an error if no image is selected
    }
    setIsLoading(true); // Sets loading state to true

    // Creating a new post object with post details
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      // Adding the new post to the 'posts' collection in Firestore
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);

      // Updating the user's document in Firestore with the new post ID
      const userDocRef = doc(firestore, 'users', authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      // inserts new post id in posts array of auth user doc
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

      // Uploading the selected image to Firebase Storage int the imageRef location
      await uploadString(imageRef, selectedFile, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);// retrives that url
      

      // Updating the post in Firestore with the image URL
      await updateDoc(postDocRef, { imageURL: downloadURL });// updating the post doc with that url
      
      // Updating the local state in the custom store hooks
      newPost.imageURL = downloadURL;
      createPost({ ...newPost, id: postDocRef.id });
      addPost({ ...newPost, id: postDocRef.id });

      showToast('Success', 'Post created successfully', 'success'); // Displaying a success toast message
    } catch (error) {
      showToast('Error', error.message, 'error'); // Displaying an error toast message
    } finally {
      setIsLoading(false); // Setting loading state back to false
    }
  };

  // Returning loading state and function to handle post creation
  return { isLoading, handleCreatePost };
}
