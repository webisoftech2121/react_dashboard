import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Sidebar from "../../global_component/Sidebar";
import Navbar from "../../global_component/navbar";
import'../../css/blog_image.css';



const EditBlog = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(""); // For storing existing image URL
  const [message, setMessage] = useState("");
  const { id } = useParams(); // Get the ID from the URL parameters
  const navigate = useNavigate(); // useNavigate hook to navigate after upload

  const imageUrl = `http://localhost:8000/tours_site_crud/images/${id}.jpg
`;
  
  useEffect(() => {
    const fetchExistingImage = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/tours_site_crud/blog_get.php?id=${id}`,{
    
        });
        if (response.data && response.data.imageUrl) {
            setExistingImageUrl(imageUrl);
        }
      } catch (error) {
        setMessage("Error fetching existing image.");
      }
    };

    fetchExistingImage();
  }, [id]); // This will run whenever the component mounts or the `id` changes

  // Handle file change (when the user selects a new image)
  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Handle form submission (image upload)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      setMessage("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id); // The ID from the URL
    formData.append("image", selectedImage);

    try {
      // Upload image to the server
      const response = await axios.post("http://localhost:8000/tours_site_crud/blog_put.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data); // Display success message from backend
      setTimeout(() => {
        
        navigate("/blog");
      }, 1000); // Navigate after 1 second
    } catch (error) {
      setMessage("Error uploading image.");
    }
  };

  return (
    <>
<Navbar></Navbar>     
       <Box height={100}>
        <Box sx={{ display: 'flex' }}>
     
      
                <Sidebar></Sidebar>
                <Box component="main" sx={{ flexGrow: 1, p: 15 }}>





    <div className="container">
        <div className="column">
      <h2>Edit Image for Item {id}</h2>

      {/* Display existing image if available */}
      {setExistingImageUrl && (
        <div>
          <h3>Existing Image</h3>
          <img
            src={imageUrl}
            alt={`Image for ID ${id}`}
            width={200}
            height={200}
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Select New Image: </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit">Upload</button>
      </form>

      {message && <p>{message}</p>}
    </div>
    </div>
    </Box>
    </Box>
    </Box>
  
    </>
  );
};

export default EditBlog;
