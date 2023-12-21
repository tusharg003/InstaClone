import { useEffect, useState } from 'react';
import useShowToast from './useShowToast';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '../components/firebase/firebase';
import useAuthStore from '../store/AuthStore';

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true); //initially loading
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user); //getting the authUser so that we dont suggest it or ppl it already follows
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true);
      try {
        const userRef = collection(firestore, 'users');
        const q = query(
          userRef,
          where('uid', 'not-in', [authUser.uid, ...authUser.following]), // authUser.uid or its following not needed
          orderBy('uid'),
          limit(3) // limit the query size to 3
        );

        const querySnapshot = await getDocs(q);
        const users = [];
        
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id }); //creating an obj by spreading the doc.data and adding in it an id as doc.id for rendering unqiue componets in react
        });

        setSuggestedUsers(users);
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getSuggestedUsers();
  }, [authUser, showToast]);// if the authenticated user changes then re render 

  return { isLoading, suggestedUsers };
};
export default useGetSuggestedUsers;
