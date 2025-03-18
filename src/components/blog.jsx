import Sidebar from "../global_component/Sidebar";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useState } from "react";
import '../Style/Slider.css';
import Navbar from "../global_component/navbar";
import BlogList from "./pages/blogList";
import React, { useEffect } from 'react';

import { useNavigate } from "react-router-dom";



function Blog (){
    
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
console.log(isLoggedIn);

const navigate = useNavigate()
  if (!isLoggedIn) {
  navigate ('/admin-login');
  }


    return(
        <>
        
    <Navbar></Navbar>     
       <Box height={100}>
        <Box sx={{ display: 'flex' }}>
     
      
                <Sidebar></Sidebar>
                <Box component="main" sx={{ flexGrow: 1, p: 15 }}>
             
                      <BlogList></BlogList>
      
         

       

              
             



     {/* <div className="container">
      <h1 className="form-title">Title and Image Upload</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter your title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        {image && (
          <div className="image-preview">
            <h3>Image Preview:</h3>
            <img src={image} alt="Image Preview" />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div> */}


              
        

   </Box>
    </Box>
        </Box>
  
        </>
    )

}

export default Blog;






 

 

