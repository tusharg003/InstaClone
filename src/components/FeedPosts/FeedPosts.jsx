import { Container } from '@chakra-ui/react';
import FeedPost from '../../components/FeedPosts/FeedPost';
const FeedPosts = () => {
  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      <FeedPost img='/img1.png' username='janeaMaria_' avatar='/img1.png' />
      <FeedPost img='/img2.png' username='_iamGod31' avatar='/img2.png' />
      <FeedPost img='/img3.png' username='SoPhia_2' avatar='/img3.png' />
      <FeedPost img='/img4.png' username='nature_lover_71' avatar='/img4.png' />
    </Container>
  );
};
export default FeedPosts;
