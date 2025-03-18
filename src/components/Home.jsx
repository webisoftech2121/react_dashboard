import Sidebar from "../global_component/Sidebar"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import Navbar from "../global_component/navbar";
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/dashboard.css'


function Home(){
  const [data, setData] = useState({
    slider: 0,
    blogs: 0,
 
});

// State to hold loading and error states
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

// Fetch the data from the API when the component is mounted
useEffect(() => {
    // Use axios to fetch data from the backend API
    axios
        .get('http://localhost:8000/tours_site_crud/dashboard.php')
        .then((response) => {
            // Assuming the response data looks like { users: 120, posts: 50, comments: 200 }
            setData(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("There was an error fetching the data!", error);
            setError('Failed to load data');
            setLoading(false);
        });
}, []);

if (loading) {
    return <div>Loading...</div>;
}

if (error) {
    return <div>{error}</div>;
}

    return(
        <>
        <Box height={30}>
          <Box sx={{ display: 'flex' }}>
        
             <Sidebar></Sidebar>
               <Navbar ></Navbar>
         


    
      <Box component="main" sx={{ flexGrow: 1, p: 12 }}>
        {/* <Typography sx={{ marginBottom: 2,marginTop: 10}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography sx={{ marginBottom: 2}}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}


<div className="dashboard-container">
            <div className="card-container">
                <div className="card">
                    <h3>Slider</h3>
                    <p>{data.slider}</p>
                </div>
                <div className="card">
                    <h3>Blog</h3>
                    <p>{data.blogs}</p>
                </div>
               
            </div>
        </div>
      </Box>
      </Box>

      </Box>
     
      

        </>
    )
}


export default Home