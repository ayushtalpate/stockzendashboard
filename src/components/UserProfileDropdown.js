import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

const UserProfileDropdown = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null); // Reference for detecting outside clicks

  useEffect(() => {
    fetchUserDetails();

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}user`, { withCredentials: true });
      if (data.success && data.user) {
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="profile" ref={dropdownRef}>
      {/* Click to toggle dropdown */}
      <div className="avatar" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {loading ? "L" : userData?.username ? userData.username.charAt(0).toUpperCase() : "U"}
      </div>
      <p className="username" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {loading ? "Loading..." : userData?.username || "USERID"}
      </p>

      {isDropdownOpen && !loading && userData && (
        <div className="profile-dropdown">
          <p><strong>Username:</strong> {userData.username || "N/A"}</p>
          <p><strong>Email:</strong> {userData.email || "N/A"}</p>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
