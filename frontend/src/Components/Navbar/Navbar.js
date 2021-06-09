import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./Navbar.css"
const Navbar = () => {

  
    return (
        <div style={{display:"flex",justifyContent:"center"}}>
  
      <div className="navigation-bar">
        <nav>
            <div className="nav-items">

            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
              </li>


              <li>
        <     Link to="/">Home</Link>
            </li>
              </div>

              
        </nav>
        </div>
    
  
        </div>
    )
}

export default Navbar
