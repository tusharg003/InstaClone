import { create } from "zustand";
// checks which user profile are we checking
const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),

    //this is used to update the number of posts in the profle pagte
    addPost: (post) => set(state => ({
        userProfile: { ...state.userProfile, posts: [post.id, ...state.userProfile.posts] }
    }))
}))

export default useUserProfileStore;