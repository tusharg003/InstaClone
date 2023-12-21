import { create } from "zustand";
// checks which user profile are we checking
const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),

}))

export default useUserProfileStore;