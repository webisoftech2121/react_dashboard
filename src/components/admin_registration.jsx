import React, { useState } from 'react';
import '../css/registrationform.css';  // Import the updated CSS file


const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');  // Message to display status

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate form data
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // First Name validation
    if (!formData.firstName) {
      formErrors.firstName = 'First Name is required';
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName) {
      formErrors.lastName = 'Last Name is required';
      isValid = false;
    }

    // Contact validation
    if (!formData.contact) {
      formErrors.contact = 'Contact number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.contact)) {
      formErrors.contact = 'Contact number must be 10 digits';
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm()) return;

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      contact: formData.contact,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    // localStorage.setItem('userRegistrationData', JSON.stringify(formData));
    // setSuccess('Registration data saved successfully!');
   


    // Send data to PHP backend via POST request
    fetch('http://localhost:8000/tours_site_crud/registration.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Registration successful') {
          setMessage('Registration successful');
          alert('Registration successful');
          // Optionally, you can redirect the user or reset the form
        } else {
          setMessage(data.message);  // Display error message
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('There was an error during registration');
      });
  };

  return (
    <div className="custom-registration-form-container">
      <h2 className="custom-registration-form-title">Registration</h2>
      {message && (
        <div className="custom-registration-form-message">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="custom-registration-form">
        <div className="custom-registration-form-group">
          <label htmlFor="firstName" className="custom-registration-form-label">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="custom-registration-form-input"
          />
          {errors.firstName && <span className="custom-registration-form-error">{errors.firstName}</span>}
        </div>

        <div className="custom-registration-form-group">
          <label htmlFor="lastName" className="custom-registration-form-label">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="custom-registration-form-input"
          />
          {errors.lastName && <span className="custom-registration-form-error">{errors.lastName}</span>}
        </div>

        <div className="custom-registration-form-group">
          <label htmlFor="contact" className="custom-registration-form-label">Contact:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="custom-registration-form-input"
          />
          {errors.contact && <span className="custom-registration-form-error">{errors.contact}</span>}
        </div>

        <div className="custom-registration-form-group">
          <label htmlFor="email" className="custom-registration-form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="custom-registration-form-input"
          />
          {errors.email && <span className="custom-registration-form-error">{errors.email}</span>}
        </div>

        <div className="custom-registration-form-group">
          <label htmlFor="password" className="custom-registration-form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="custom-registration-form-input"
          />
          {errors.password && <span className="custom-registration-form-error">{errors.password}</span>}
        </div>

        <div className="custom-registration-form-group">
          <label htmlFor="confirmPassword" className="custom-registration-form-label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="custom-registration-form-input"
          />
          {errors.confirmPassword && <span className="custom-registration-form-error">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="custom-registration-form-button">Register</button>
  <p >already have an account <a href='admin-login' style={{color:"blue"}}>Login</a></p>
        
      </form>

      {/* {message && (
        <div className="custom-registration-form-message">
          {message}
        </div>
      )} */}
    </div>
  );
};

export default AdminRegistration;
