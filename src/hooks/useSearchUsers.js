import { useState } from 'react';
import useShowToast from './useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../components/firebase/firebase';

const useSearchUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);// while searching the last searched is not rendered
    try {
      const q = query(
        collection(firestore, 'users'),
        where('username', '==', username)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty)
        return showToast('Error', 'User not found!', 'error');

    //   console.log('this is the querysnapshot' + querySnapshot);

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    //   console.log(user);
    } catch (error) {
      showToast('Error', error.message, 'error');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, getUserProfile, user,setUser };
};
export default useSearchUsers;
