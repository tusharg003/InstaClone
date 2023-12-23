import { Box, Image } from '@chakra-ui/react';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  // console.log(userProfile);
  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box my={2} borderRadius={4} overflow={'hidden'}>
        <Image src={post.imageURL} alt='Feed Post image' />
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
    </>
  );
};
export default FeedPost;
