import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import { auth, firestore } from '../components/firebase/firebase';
import useAuthStore from '../store/AuthStore';
import { doc, getDoc } from 'firebase/firestore';

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password)
      return showToast('Error', 'Please fill all the feilds', 'error');

    try {
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
      console.log(userCred);
      if (userCred) {
        const docRef = doc(firestore, 'users', userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem('user-info', JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return { loading, error, login };
};
export default useLogin;
