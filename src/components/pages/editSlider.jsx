import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams for getting the post ID
import Box from '@mui/material/Box';
import Sidebar from "../../global_component/Sidebar";
import Navbar from "../../global_component/navbar";

const EditSlider = () => {
  // State for holding title, image, and other UI states
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get the post ID from the URL using useParams
  const { id } = useParams(); // The ID parameter will be part of the URL like /edit/:id

  useEffect(() => {
    // Fetch the existing post data when the component is mounted (optional)
    const fetchPost = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/tours_site_crud/slider_get.php/${id}`);
        setTitle(response.data.title); // Assuming the API returns a post object
      } catch (err) {
        setError('Failed to fetch post data.');
      }
    };

    fetchPost();
  }, [id]); // Run the effect whenever the `id` changes

  // Handle form data changes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      setError('Title and image are required!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    // Prepare the form data to send in the POST request
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('id', id); 

    try {
      // Send the POST request to update the specific post by ID
      const response = await axios.post(`http://localhost:8000/tours_site_crud/slider_put.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Post updated successfully!');
      setTitle('');
      setImage(null); // Reset image after successful upload
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
     <>
    <Navbar></Navbar>     
           <Box height={100}>
            <Box sx={{ display: 'flex' }}>
         
          
                    <Sidebar></Sidebar>
                    <Box component="main" sx={{ flexGrow: 1, p: 15 }}>
    <div style={{width:"400px" ,alignItems:"center" ,padding:"30px",backgroundColor:"lightgrey"}}>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} style={{textAlign:"center"}}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
    </Box>
    </Box>
    </Box>
    </>
  );
};

export default EditSlider;
