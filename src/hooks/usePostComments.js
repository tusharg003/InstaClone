import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../components/firebase/firebase";
import usePostStore from "../store/postStore";

const usePostComments = () => {
    const [isCommenting, setIsCommenting] = useState(false);
    const showToast = useShowToast()
    const authUser = useAuthStore(state => state.user)
    const addComment = usePostStore(state => state.addComment)

    const handlePostComment = async (postId, comment) => {

        if (isCommenting) return
        if (!authUser) return showToast('Error', 'You must be logged in to comment', 'error')

        // Check if the comment is empty or contains only whitespace
        if (!comment || !comment.trim()) {
            showToast('Error', 'Comment cannot be empty', 'error');
            return;
        }
        
        setIsCommenting(true);
        const newComment = {
            comment,// if the lhs and rhs are same we can just assing like this
            createAt: Date.now(),
            createBy: authUser.uid,
            postId
        }
        try {

            await updateDoc(doc(firestore, 'posts', postId), {
                comments: arrayUnion(newComment)
            })
            addComment(postId, newComment)

        } catch (error) {
            showToast('Error', error.message, 'error')
        } finally {
            setIsCommenting(false)
        }
    }
    return { isCommenting, handlePostComment }
}
export default usePostComments