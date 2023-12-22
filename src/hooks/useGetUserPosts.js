// Import necessary hooks and functions from React and other files
import { useEffect, useState } from "react";
import usePostStore from "../store/postStore"; // Importing custom store for posts
import useShowToast from "./useShowToast"; // Custom hook for showing toast messages
import useUserProfileStore from "../store/userProfileStore"; // Custom store for user profiles
import { collection, getDocs, query, where } from "firebase/firestore"; // Firebase Firestore functions
import { firestore } from "../components/firebase/firebase"; // Firebase Firestore instance

const useGetUserPosts = () => {
    // State variables to manage loading state and user posts
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore(); // Accessing posts from the custom store
    const showToast = useShowToast(); // Accessing the toast function for displaying messages
    const userProfile = useUserProfileStore((state) => state.userProfile); // Accessing user profile from the custom store

    // Effect to fetch user-specific posts from Firestore
    useEffect(() => {
        const getPosts = async () => {
            if (!userProfile) return; // If no user profile, exit function
            setIsLoading(true); // Set loading state to true
            setPosts([]); // Clear existing posts in the store

            try {
                // Construct a query to get posts created by the user
                const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
                const querySnapshot = await getDocs(q); // Get the documents based on the query

                const fetchedPosts = [];
                querySnapshot.forEach((doc) => {
                    fetchedPosts.push({ ...doc.data(), id: doc.id }); // Extract post data and add an 'id' field
                });

                fetchedPosts.sort((a, b) => b.createdAt - a.createdAt); // Sort posts by 'createdAt' timestamp
                setPosts(fetchedPosts); // Set the fetched posts in the store
            } catch (error) {
                showToast("Error", error.message, "error"); // Display an error toast message
                setPosts([]); // Clear posts in case of an error
            } finally {
                setIsLoading(false); // Set loading state to false when done
            }
        };

        getPosts(); // Invoke the function to fetch user posts
    }, [setPosts, userProfile, showToast]); // Dependencies for the useEffect hook

    return { isLoading, posts }; // Return loading state and fetched posts
};

export default useGetUserPosts; // Export the custom hook for use in components
