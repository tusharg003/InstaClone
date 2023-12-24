import { useState } from "react"
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../components/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore(state => state.user)//gets the authenticated user info from the LS 
    const setAuthUser = useAuthStore(state => state.setUser)//used to set the state of the logged in user after editing profile
    const setUserProfile = useUserProfileStore(state => state.setUserProfile)// tp update the userprofile

    const showToast = useShowToast();

    const editProfile = async (inputs, selectedFile) => {// inputs ie text part and slectedfile is the img part

        if (isUpdating || !authUser) return // if the profile is being updated or the user is not auth then return from the function
        setIsUpdating(true)// else set updating as true

        const storageRef = ref(storage, `profilePics/${authUser.uid}`)
        const userDocRef = doc(firestore, 'users', authUser.uid);

        let URL = ''
        try {
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, 'data_url')
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`))
            }
            const updatedUser = {
                ...authUser,
                fullName: inputs.fullName || authUser.fullName,
                // username: inputs.username ,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL,
            }// just change the name,username,bio adn image other data of authUSer should remain the same

            

            await updateDoc(userDocRef, updatedUser)// updating the profile of the current logged in user in the database
            localStorage.setItem('user-info', JSON.stringify(updatedUser))// updating the LS with updated profile of user
            setAuthUser(updatedUser);// to make sure every state is in sync
            setUserProfile(updatedUser);//to make sure every state is in sync

            showToast('Success', 'Profile updated succesfully', 'success')

        } catch (error) {
            showToast('Rrror', error.message, 'error')
        }
    }
    return { editProfile, isUpdating }// to edit the profile - editProfile function , to check if updating - isUpdating state
}
export default useEditProfile