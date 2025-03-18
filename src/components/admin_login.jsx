import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import React Router for navigation
import '../css/login.css'; // Import the CSS file

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to validate email format
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  // Function to validate password (simple length check)
  const validatePassword = (password) => {
    return password.length >= 6; // Minimum length requirement (you can adjust this)
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clear previous error messages
    setError('');

    // Validate email and password
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true); // Set loading state to true
    
    try {
      // Sending the data as JSON
      const response = await fetch('http://localhost:8000/tours_site_crud/admin_login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Important for JSON requests
        },
        body: JSON.stringify({ email, password }),  // Ensure the data is being stringified to JSON
      });

      const data = await response.json(); // Parse the JSON response from the server
  
      console.log('Backend Response:', data);  // Log the response from the backend
  
      if (data.success) {
        localStorage.setItem('userData', JSON.stringify(data.user));
        alert("Successfully logged in");
        navigate('/'); // Use React Router to navigate to the homepage (or another protected page)
      } else {
        setError(data.message); // Set error message if login failed
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" disabled={loading}> {/* Disable button when loading */}
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="login-form .error ">{error}</p>} {/* Error message with class */}
      </form>
    </div>
  );
};

export default AdminLogin;
