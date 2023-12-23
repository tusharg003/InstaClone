import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from '../../assets/constants';
import usePostComments from '../../hooks/usePostComments';
import useAuthStore from '../../store/authStore';
import useLikePost from '../../hooks/useLikePost';
import { timeAgo } from '../../utils/timeAgo';
import CommentsModal from '../Modals/CommentModal';

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  const { isCommenting, handlePostComment } = usePostComments();
  const [comment, setComment] = useState('');
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { likes, handleLikePost, isLiked } = useLikePost(post);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment('');
  };

  return (
    <Box mb={10} mt={'auto'}>
      <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={'pointer'} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box
          cursor={'pointer'}
          fontSize={18}
          onClick={() => commentRef.current.focus()}>
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={'sm'}>
        {likes} likes
      </Text>

      {isProfilePage && (
        <Text fontSize={'12'} color={'gray'}>
          Posted {timeAgo(post?.createdAt)}
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Text fontSize={'sm'} fontWeight={700}>
            {creatorProfile?.username}{' '}
            <Text as='span' fontWeight={400}>
              {post.caption}
            </Text>
            {post.comments.length > 0 && (
              <Text
                fontSize={'sm'}
                color={'gray'}
                cursor={'pointer'}
                onClick={onOpen}>
                View all {post.comments.length} comments
              </Text>
            )}
          </Text>
          {/* Comments modal only in the home page */}
          {isOpen && (
            <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />
          )}
        </>
      )}

      {authUser && (
        <Flex
          alignItems={'center'}
          gap={2}
          justifyContent={'space-between'}
          w={'full'}>
          <InputGroup>
            <Input
              variant={'flushed'}
              placeholder='Add a comment...'
              fontSize={14}
              ref={commentRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={'blue.500'}
                fontWeight={600}
                cursor={'pointer'}
                _hover={{ color: 'white' }}
                bg={'transparent'}
                isLoading={isCommenting}
                onClick={handleSubmitComment}>
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};
export default PostFooter;
