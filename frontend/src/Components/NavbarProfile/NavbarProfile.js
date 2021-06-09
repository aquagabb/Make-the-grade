import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "./NavbarProfile.css"
import fakeAuth from "../../FakeAuth"
import logo from "./LogoB.png"
import { useAuth } from "../../Auth";
const Navbar = () => {

  const status = localStorage.getItem("status");
    const [isLogged,setIsLogged] = useState(1)
    var isLogged2 = localStorage.getItem('logged')
    const [
      redirectToReferrer,
      setRedirectToReferrer
    ] = React.useState(true)
  
    const loginOut = () => fakeAuth.authenticate(() => {
      setRedirectToReferrer(false)
    })
  
     const { setAuthTokens } = useAuth();
  function logOut() {
    setAuthTokens("");
    localStorage.setItem("status","")
  }



    return (
        <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
          <div style={{marginBottom:"50px",width:"96%"}} >
          <nav style={{ backgroundColor:"rgb(102, 204, 0,0.7)",borderRadius:"12px",boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 1px 7px"}}class="navbar navbar-expand-md navbar-light">
    <a style={{marginLeft:"25px"}} href="#">
        <img src={logo} height="45" alt="CoolBrand"></img>
      
    </a>
    <div>
      <a style={{fontSize:"25px" , fontFamily:"monospace",marginLeft:"15px"}}> School made easy </a>
      </div>
 

    <div style={{  justifyContent: "flex-end"}} class="collapse navbar-collapse" id="navbarCollapse">
        <div class="row">
          

        { status == "teacher" &&     <div style={{ display:"flex",alignItems:"center"}}class="col">
        <Link  style={{fontSize:"20px"}} id="item" to="/create">+</Link>
          </div>
          }

     
         { status == "teacher" &&  <div style={{ display:"flex",alignItems:"center"}} class="col">
          <Link id="item" to="/professorTests">Grade</Link>
          </div>
          }
       

        
       { status == "student" &&  <div style={{ display:"flex",alignItems:"center"}} class="col">
        <Link  id="item" to="/exams">Exams</Link>
          </div>
          }


        
          
          <div  style={{ display:"flex",alignItems:"center"}} class="col">
          <Link  id="item" to="/profile">Profile</Link>
          </div>

          { status == "student" &&      <div style={{ display:"flex",alignItems:"center"}} class="col">
        <Link  id="item" to="/catalog">Catalog</Link>
          </div>
          }

      
          
          <div style={{ display:"flex",alignItems:"center"}} class="col">
           <p  style={{marginRight:"30px", cursor:"pointer",marginTop:"15px"}}  onClick={logOut}>Logout</p>
          </div>
           
            
        </div>
    
    </div>
</nav>
</div>
  
      {/* <div className="navigation-bar">
        <nav>
            <div className="nav-items">

            <li>
              <Link to="/dotest">Tests</Link>
            </li>
            <li>
              <Link to="/grades">Grades</Link>
              </li>

              <li>
              <Link to="/myteachers">Contacts</Link>
              </li>

              <li>
            <Link to="/home">Home</Link>
            </li>
            <li >
              
              <button onClick={loginOut} className="logout-button">Logout</button>
            
            </li>
              </div>
              
        </nav>
      
   
        </div>
    
   */}
        </div>
    )
}

export default Navbar
