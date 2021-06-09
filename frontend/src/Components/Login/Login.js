import React,{useState} from "react";
import "./Login.css";
import  { Redirect , Link, Route} from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import fakeAuth from "../../FakeAuth"
import { useAuth } from "../../Auth";
import axios from 'axios'
function Login() {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [isLogged,setLoggedin] = useState(false)
    const [isTeacher,setIsTeacher] = useState(false);
    const { setAuthTokens } = useAuth();
    function handleEvent(e){
        if(e.target.id === "password")
            setPassword(e.target.value)
        else if(e.target.id === "username")
            setUsername(e.target.value)
            
    }

    function submitHandler(event){
        event.preventDefault();
        console.log("REQUEST");


        if(isTeacher){
            axios.post('https://school-made-easy.ew.r.appspot.com/teachers/login',{
                username: username,
                password:  password
            })
            .then((response) => {
        
              console.log(response.data)
              console.log("===================")
              localStorage.setItem("logged",response.data);
              localStorage.setItem("status","teacher");
              setLoggedin(1);
              setAuthTokens("TOKEN")
               
        
            });
        }
        else{
            axios.post('https://school-made-easy.ew.r.appspot.com/students/login',{
            username: username,
            password:  password
        })
        .then((response) => {
    
          console.log(response.data)
          console.log("===================")
          localStorage.setItem("logged",response.data);
          localStorage.setItem("status","student");
          setLoggedin(1);
          setAuthTokens("TOKEN")
           
    
        });
        }
    

        // if(password !="" && username!="" ){
        //     setLoggedin(1);
        //     setAuthTokens("TOKEN")
        //     // localStorage.setItem('logged', username);
       
        // }
      
       
    }

    const [
        redirectToReferrer,
        setRedirectToReferrer
      ] = React.useState(false)
    
      const login = () => fakeAuth.authenticate(() => {
        setRedirectToReferrer(true)
      })
    
      if (isLogged) {
        console.log(isLogged)
        console.log("TOKEN LOGAT ?")
        console.log(localStorage.getItem('tokens'))
        return <Redirect to="/profile" />;
      }

    return (
        <>
           <Navbar />
        <div id="header">
             <div className="form-register">
    
            <form onSubmit={submitHandler} id="loginForm">
            <h1 style={{fontSize:"32px",marginBottom:"15px"}}> Welcome back </h1>
                <div className="separator">
                    <label style={{marginRight:"15px"}} for="name"> <span> <i className="fa fa-user"></i>  </span></label>
                    <input onChange={handleEvent} type="text" id="username" placeholder="Username" />
                </div>
                <div className="separator" id="separator2">
                    <label style={{marginRight:"15px"}}for="password"> <span> <i class="fa fa-lock"></i> </span></label>
                    <input onChange={handleEvent} type="password" password="password"  placeholder="Password" id="password" />
                </div>

                <div  className="separator">
            <div style={{marginLeft:"15px"}}class="form-check">
            <label class="form-check-label" for="flexCheckDefault">
    Are you a teacher?
  </label>
  <input onClick={(e)=>setIsTeacher(!isTeacher)}class="form-check-input" type="checkbox" value="teacher" id="flexCheckDefault"/>

</div>
</div>
                <button id="submitLogin" >Login</button>
                
            </form>  
            </div>   
        </div>
        </>
    );
}

export default Login;