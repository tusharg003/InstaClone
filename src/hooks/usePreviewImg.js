import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const showToast = useShowToast();
    const maxFileSizeInBytes = 2 * 1024 * 1024; // Maximum file size allowed (2MB)


    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file from the input element

        // Check if a file is selected and if it's an image
        if (file && file.type.startsWith("image/")) {

            if (file.size > maxFileSizeInBytes) {
                showToast('Error', "File size must be less than 2MB", 'error');
                setSelectedFile(null);
                return;
            }

            const reader = new FileReader(); // Create a FileReader object(new instance of fileReader)


            // Event triggered when file reading is completed
            reader.onloadend = () => {
                setSelectedFile(reader.result); // Set selectedFile state to the result (data URL)
            };

            reader.readAsDataURL(file); // Read the selected file as a data URL
            console.log(reader)

        } else {
            showToast('Error', 'Please select an Image file!', 'error');
            setSelectedFile(null);
        }
    };
    return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;


// //Asynchronous File Reading:
// reader.readAsDataURL(file); initiates the reading of the selected file as a data URL.
// This operation runs asynchronously, allowing other code to continue executing.

// Event - Driven Handling:
// reader.onloadend = () => { setSelectedFile(reader.result); }; sets up an action to handle the completion of the file reading operation.
// It waits for the reading operation to finish(onloadend event) and executes the provided function when the file is completely read.

// Execution Flow:
// readAsDataURL starts the file reading process but doesn’t wait for it to complete.
// onloadend sets up what to do when the file reading operation finishes.