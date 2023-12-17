import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../components/firebase/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../store/AuthStore';

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore(state => state.login)// using login from authstore using zustand


    const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
            showToast("Error", "Please fill all the feilds", "error")
            return
        }

        const userRef = collection(firestore, "users")//creates a reference to the users arryobj in the db
        const q = query(userRef, where('username', '==', inputs.username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty == false) {
            showToast("Error", "Username already exists", "error");
            return
        }
        
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser && error) {
                showToast("Error", error.message, "error")
                return
            }
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullName: inputs.fullName,
                    bio: '',
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem('user-info', JSON.stringify(userDoc));
                showToast("Success", "Account created", "success");
                loginUser(userDoc)
            }

        } catch (error) {
            showToast("Error", error, "error")
        }
    }

    return { loading, error, signup }
}
export default useSignUpWithEmailAndPassword