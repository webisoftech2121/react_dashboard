import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { useState } from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import AddBlog from './addBlog';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function BlogList() {
   const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([0]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);

    const handleEditClick = (id) => {
      setSelectedItemId(id); // Set the item ID to trigger the upload form
      setShowUploadForm(true);
      navigate(`/blog/edit/${id}`);// Show the upload form
    };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
     
    }
  };


  const navigate = useNavigate();

  function blog(){
  axios.get("http://localhost:8000/tours_site_crud/blog_get.php")
  .then(response => {
      setRows(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
   useEffect(()=>{blog()},[]);



   function deleteRecord(id){
   const response= axios.post("http://localhost:8000/tours_site_crud/blog_delete.php",{
      delete_id: id

  });
  if (response.data) {
    setItems(items.filter(item => item.id !== id)); // Remove item from UI

    // Show success alert after deletion
    alert(`Record with ID ${id} has been deleted successfully.`);
}

    }
   
     useEffect(()=>{deleteRecord()},[]);

    

     
    


  return (
    <>
     <div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <AddBlog></AddBlog>
       
        </Box>
      </Modal>
    </div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
         <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
          Blog Crud
          </Typography>
          <Divider />
          <Box height={10} />

          
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 200 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(row) => row.id || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Products" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon /> } onClick={handleOpen}>
              Add
            </Button>
          </Stack>



      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              
                <TableCell
                 
                  align="left"
                  style={{ minWidth: "100px" }}
                >
                    Id
                 
                </TableCell>
                
               <TableCell
                 
                 align="left"
                 style={{ minWidth: "100px" }}
               >
                   Images
                
               </TableCell>

               <TableCell
                 
                 align="left"
                 style={{ minWidth: "100px" }}
               >
                   Action
                
               </TableCell>
           
            </TableRow>
          </TableHead>
          <TableBody className='submitted-list'>
            {rows.map &&rows.map((row,index) => {
                return (

                  <TableRow hover role="checkbox" tabIndex={-1} >
                 
                        <TableCell   align="left">
                  
                         {row.id}
                        
                        </TableCell>
                        
                       
                        <TableCell   align="left">
                         {row.image} 
                        </TableCell>
                        

                        <TableCell   align="left">
                    
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                          
                              className="cursor-pointer" 
                              onClick={() => {handleEditClick(row.id)}}
                            />
                            


                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteRecord(row.id);
                              }}
                            />
                          </Stack>
                       
                        </TableCell>
                    
                   
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}