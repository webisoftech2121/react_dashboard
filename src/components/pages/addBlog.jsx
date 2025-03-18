// import React, { useState } from 'react';
// import '../../css/style.css';








// function AddBlog() {
//   // State for form data, the list of submitted data, and success message
//   // const [formData, setFormData] = useState({
//   //   title: '',
//   //   image: null
//   // });
//   const [image,setImage]=useState("");
// //   const [title,setTitle]=useState("");
//   const [submittedData, setSubmittedData] = useState([]);
//   const [formSubmitted, setFormSubmitted] = useState(false); // To track form submission status

//   // Handle text input changes
//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData({
//   //     ...formData,
//   //     [name]: value
//   //   });
//   // };

//   // Handle file input change
//   // const handleFileChange = (e) => {
//   //   const { files } = e.target;
//   //   setFormData({
//   //     ...formData,
//   //     image: files[0]
//   //   });
//   // };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let data={image}

//     fetch(" http://localhost:8000/tours_site_crud/blog.php", 
//       {
//          method:'POST',
//          headers:{
//            'Accept':'application/json',
//            'Content-Type':'application/json'
//          },
//          body:JSON.stringify(data)
//      }
//      )
//      .then((result)=>{
//          console.log("result",result)
//          alert("record added scuessfully")
//      })

//     if (data.image) {
//       // Add the submitted data to the list
//       const newData = {
      
//         // image: (data.image),
//       };
//       setSubmittedData([...submittedData, newData]);

//       // Set form submission status to true to show the success message
//       setFormSubmitted(true);

//       // Clear the form after submission
//       // setFormData({
//       //   title: '',
//       //   image: null
//       // });

//       // Reset form submission status after a short delay to hide the success message
//       setTimeout(() => {
//         setFormSubmitted(false);
//       }, 5000); // Hide the success message after 3 seconds
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

//   return (
//     <div className="form-container">
//              {formSubmitted && <h5 className="success-message" style={{color:"green"}}>Form submitted successfully!</h5>}
//       <h1>Upload Form</h1>

//       {/* Form */}
 
//       <form onSubmit={handleSubmit} className="form">
//         {/* <div className="form-group"> */}
//           {/* <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={setTitle.title}
//             onChange={(e)=>{setTitle(e.target.value)}}
//             placeholder="Enter title"
//             required
//           />
//         </div> */}
//         <div className="form-group">
//           <label >Image:</label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             onChange={(e)=>{setImage(e.target.files[0])}}
//             required
//           />
//         </div>
//         <button type="submit" className="submit-btn">Submit</button>
//       </form>

//       {/* Success Message */}
     

     
//       {/* {submittedData.length > 0 ? (
//         <ul className="submitted-list">
//           {submittedData.map(( index) => (
//             <li key={index} className="submitted-item">
          
            
//             </li>
//           ))}
//         </ul>
//       ) :
//        (
//         <p>No data submitted yet.</p>
//       )} */}
//     </div>
//   );
// }

// export default AddBlog;

// export  default function Home(){
//     return(
//         <>
//         <div className="container my-4">
//         <section class="section">
//                 <div class="box-main">
//                     <div class="secondHalf">
//                         <h1 class="text-big" id="program">
//                             JavaScript Tutorial
//                         </h1>
//                         <p class="text-small">
//                             JavaScript is the world most
//                             popular lightweight, interpreted
//                             compiled programming language.
//                             It is also known as scripting
//                             language for web pages. It is
//                             well-known for the development
//                             of web page many non-browser
//                             environments also use it.
//                             JavaScript can be used for
//                             Client-side developments as well
//                             as Server-side developments.
//                         </p>
//                     </div>
//                 </div>
//             </section>
//             <section class="section">
//                 <div class="box-main">
//                     <div class="secondHalf">
//                         <h1 class="text-big" id="program">
//                             Java Programming Language
//                         </h1>
//                         <p class="text-small">
//                             When compared with C++, Java
//                             codes are generally more
//                             maintainable because Java does
//                             not allow many things which may
//                             lead to bad/inefficient
//                             programming if used incorrectly.
//                             For example, non-primitives are
//                             always references in Java. So we
//                             cannot pass large objects (like
//                             we can do in C++) to functions,
//                             we always pass references in
//                             Java. One more example, since
//                             there are no pointers, bad
//                             memory access is also not
//                             possible. When compared with
//                             Python, Java kind of fits
//                             between C++ and Python. The
//                             programs are written in Java
//                             typically run faster than
//                             corresponding Python programs
//                             and slower than C++. Like C++,
//                             Java does static type checking,
//                             but Python does not.
//                         </p>
//                     </div>
//                 </div>
//             </section>
//             <section class="section">
//                 <div class="box-main">
//                     <div class="secondHalf">
//                         <h1 class="text-big" id="program">
//                             What is Machine Learning?
//                         </h1>
//                         <p class="text-small">
//                             Machine Learning is the field of
//                             study that gives computers the
//                             capability to learn without
//                             being explicitly programmed. ML
//                             is one of the most exciting
//                             technologies that one would have
//                             ever come across. As it is
//                             evident from the name, it gives
//                             the computer that makes it more
//                             similar to humans: The ability
//                             to learn. Machine learning is
//                             actively being used today,
//                             perhaps in many more places than
//                             one would expect.
//                         </p>
//                     </div>
//                 </div>
//             </section>
//             <footer className="footer">
//                 <p className="text-footer">
//                     Copyright ©-All rights are reserved
//                 </p>
//             </footer>
//        </div>
//         </>
//     )
// }

import React, { useState } from 'react';
import axios from 'axios';

function AddBlog() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle file change
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

 
  // Handle file upload
  const onUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setMessage('');
    console.log(formData);
    

    try {
      const response = await axios.post('http://localhost:8000/tours_site_crud/blog.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploading(false);
      setMessage(response.data.message || 'File uploaded successfully!');
    } catch (error) {
      setUploading(false);
      setMessage('File upload failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Upload a file</h1>
      <input type="file" onChange={onFileChange} />
      <button onClick={onUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddBlog;



