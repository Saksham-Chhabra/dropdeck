import { useState } from "react";
import "../css/SignUp.css";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const fetchUser = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/${username}`
      );
      return response.data; // Return the user data if found
    } catch (error) {
      console.error("Error fetching user:", error);
      return null; // Return null if user not found or error occurs
    }
  };

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent page refresh
    console.log("Form submitted:", formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/signup",
        formData
      );
      console.log("response", response);
      if (response.status === 201) {
        // If signup is successful, navigate to the login page
        alert("Signup successful!");
        navigate("/add-artist", { replace: true }); // Navigate to login page
        localStorage.setItem("userId", response.data.user._id); // Store user ID in localStorage
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
    // Add your signup logic here
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <h1>SignUp Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button> {/* Fixed button text */}
      </form>
    </div>
  );
}
