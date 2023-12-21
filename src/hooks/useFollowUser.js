import { useEffect, useState } from "react"
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../components/firebase/firebase";
import useAuthStore from "../store/authStore";

const useFollowUser = (userId) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const authUser = useAuthStore(state => state.user);
    const setAuthUser = useAuthStore(state => state.setUser)
    const { userProfile, setUserProfile } = useUserProfileStore();// the user profile we are checking
    const showToast = useShowToast();

    const handleFollowUser = async () => {
        setIsUpdating(true)
        try {
            const currentUserRef = doc(firestore, 'users', authUser.uid)
            const userToFollowOrUnfollowRef = doc(firestore, 'users', userId);
            console.log(userToFollowOrUnfollowRef)
            // updating the document in the database-
            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            })

            await updateDoc(userToFollowOrUnfollowRef, {
                followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })

            // updating the states
            if (isFollowing) {
                //unfollow 
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userId)// removes userId user from the following list of authUser
                })
                if (userProfile)// if we are mot visiting any user profile ie seraching from homepage then its giving error
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter((uid) => uid !== authUser.uid),
                    });

                localStorage.setItem('user-info', JSON.stringify({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userId)// removes userId user from the following list of authUser
                }))
                setIsFollowing(false);
            } else {
                //follow
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId]
                })

                if (userProfile)
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, authUser.uid],
                    });


                localStorage.setItem('user-info', JSON.stringify({
                    ...authUser,
                    following: [...authUser.following, userId],
                }))
                setIsFollowing(true)
            }
        } catch (error) {
            showToast('Error', error.message, 'error')
        } finally {
            setIsUpdating(false)
        }
    }

    useEffect(() => {
        if (authUser) {
            const isFollowing = authUser.following.includes(userId);// check if the auth user follows the userId--true/false
            setIsFollowing(isFollowing)// sets the isFollowing state to yes or no correspong to the userid user

        }
    }, [authUser, userId])// this effect runs when authenticated(logged in)user changes or the person (userid)changes

    return { isUpdating, isFollowing, handleFollowUser }
}


export default useFollowUser

// const updatedFollowing = isFollowing ? authUser.following.filter(uid => uid !== userId) : [...authUser.following, userId];
// const updatedFollowers = isFollowing ? userProfile.followers.filter(uid => uid !== authUser.uid) : [...userProfile.followers, authUser.uid];
