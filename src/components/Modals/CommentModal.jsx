import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Comment from '../Comment/Comment';
import usePostComments from '../../hooks/usePostComments';
import { useEffect, useRef } from 'react';

const CommentsModal = ({ isOpen, onClose, post }) => {
  const { handlePostComment, isCommenting } = usePostComments();
  const commentRef = useRef(null);
  const commentsContainerRef = useRef(null);

  const handleSubmitComment = async (e) => {
    // do not refresh the page, to prevent it
    e.preventDefault();
    await handlePostComment(post.id, commentRef.current.value);
    commentRef.current.value = '';
  };

  useEffect(() => {
    const scrollToBottom = () => {
      commentsContainerRef.current.scrollTop =
        commentsContainerRef.current.scrollHeight;
    };
    if (isOpen) {
      // so taht first thime the scroll hieght error is not encoundted
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    }
  }, [isOpen, post.comments]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
      <ModalOverlay />
      <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={'column'}
            maxH={'250px'}
            overflowY={'auto'}
            ref={commentsContainerRef}>
            {post.comments.map((comment, idx) => (
              <Comment key={idx} comment={comment} />
            ))}
          </Flex>
          <form onSubmit={handleSubmitComment} style={{ marginTop: '2rem' }}>
            <Input placeholder='Comment' size={'sm'} ref={commentRef} />
            <Flex w={'full'} justifyContent={'flex-end'}>
              <Button
                type='submit'
                ml={'auto'}
                size={'sm'}
                my={4}
                isLoading={isCommenting}>
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
