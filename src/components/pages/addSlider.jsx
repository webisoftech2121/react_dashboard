import React, { useState } from "react";
import axios from "axios";
import'../../css/style.css'

function PostDataForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(""); // State for success/error message
  const [errors, setErrors] = useState({}); // State for form errors

  // Handle title input change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Form validation function
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate title
    if (!title) {
      formErrors.title = "Title is required!";
      isValid = false;
    }

    // Validate image (check if image is selected and its type)
    if (!image) {
      formErrors.image = "Image is required!";
      isValid = false;
    } else if (!image.type.startsWith("image/")) {
      formErrors.image = "Please select a valid image file (jpg, png, jpeg, etc.)";
      isValid = false;
    }

    setErrors(formErrors); // Set the error messages
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) return; // If validation fails, prevent form submission

    // Prepare form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      // Send the POST request with the form data
      const response = await axios.post("http://localhost:8000/tours_site_crud/slider_post.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response
      if (response.data.message === "Data uploaded successfully!") {
        setMessage("Form submitted successfully!");
        setErrors({}); // Clear errors if the form is successful
      } else {
        setMessage("Error: " + response.data.message);
      }

      // Optionally clear form after submit
      setTitle("");
      setImage(null);
    } catch (error) {
      console.error("Error posting data:", error);
      setMessage("Error posting data. Please try again.");
    }
  };

  return (
    <div>
      <h2>Post Title and Image</h2>
      
      {/* Display success/error message */}
      {message && <div className="message success">{message}</div>} {/* Display green success message */}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
       
          />
          {errors.title && <div className="error-message">{errors.title}</div>} {/* Display title error */}
        </div>

        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
       
          />
          {errors.image && <div className="error-message">{errors.image}</div>} {/* Display image error */}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostDataForm;
