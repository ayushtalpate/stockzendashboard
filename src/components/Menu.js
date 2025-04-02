import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';



const Menu = () => {
  const navigate = useNavigate();

  const [selecteMenu,setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen,setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) =>{
      setSelectedMenu(index);
  }
  const handleProfileClick = (index) =>{
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
}


const menuClass = "menu";
const activeMenuClass="menu selected"

const handleLogout = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/logout`, {}, { withCredentials: true });
    
    if (response.status === 200) {
      console.log("Logout successful");
      window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/`; // Redirect to frontend
    } else {
      console.error("Logout failed:", response.data);
    }
  } catch (error) {
    console.error("Error logging out:", error.response ? error.response.data : error.message);
  }
};


  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link 
            style={{textDecoration:"none"}} 
            to="/" 
            onClick={()=>handleMenuClick(0)}>
              <p className={selecteMenu===0 ? activeMenuClass :  menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
          <Link 
            style={{textDecoration:"none"}} 
            to="/orders" 
            onClick={()=>handleMenuClick(1)}>
              <p className={selecteMenu===1 ? activeMenuClass :  menuClass}>Orders</p>
            </Link>
          </li>
          <li>
          <Link 
            style={{textDecoration:"none"}} 
            to="/holdings" 
            onClick={()=>handleMenuClick(2)}>
              <p className={selecteMenu===2 ? activeMenuClass :  menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
          <Link 
            style={{textDecoration:"none"}} 
            to="/positions" 
            onClick={()=>handleMenuClick(3)}>
              <p className={selecteMenu===3 ? activeMenuClass :  menuClass}>Positions</p>
            </Link>
          </li>
          <li>
          <Link 
            style={{textDecoration:"none"}} 
            to="/funds" 
            onClick={()=>handleMenuClick(4)}>
              <p className={selecteMenu===4 ? activeMenuClass :  menuClass}>Funds</p>
            </Link>
          </li>
          <li>
          <Link 
            style={{textDecoration:"none"}} 
            to="/apps" 
            onClick={()=>handleMenuClick(5)}>
              <p className={selecteMenu===5 ? activeMenuClass :  menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <button onClick={handleLogout} className="logout-btn" style={{ width: "80px" }}>
  Logout
</button>

        </div>
    </div>
  );
};

export default Menu;
