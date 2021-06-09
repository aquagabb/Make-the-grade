import React, { useState } from "react";
import "./Register.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTeacher,setIsTeacher] = useState(false);
  const [valid, setValid] = useState(false);

  function handleEvent(e) {
    if (e.target.id === "password") setPassword(e.target.value);
    else if (e.target.id === "username") setUsername(e.target.value);
    else if (e.target.id === "email") setEmail(e.target.value);
    else if (e.target.id === "phoneNumber") setPhoneNumber(e.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log("REQUEST REGISTER");
    console.log(password);
    console.log(username);
    console.log(email);
    console.log(phoneNumber);


    console.log(isTeacher)


    if(isTeacher){
      axios
      .post("https://school-made-easy.ew.r.appspot.com/teachers", {
        username: username,
        email: email,
        password: password,
        phone: phoneNumber,
      })
      .then((response) => {
        console.log(response.data);

        setValid(true);
      });
      
    }
    else
    {
      axios
      .post("https://school-made-easy.ew.r.appspot.com/students", {
        username: username,
        email: email,
        password: password,
        phone: phoneNumber,
      })
      .then((response) => {
        console.log(response.data);

        setValid(true);
      });
    }

   
  }

  if (valid === true) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="form-register">
          <form onSubmit={submitHandler} id="registerForm">
            <h1 style={{ textAlign: "center " }}> Register </h1>
            <div className="separator">
            <label style={{marginRight:"15px"}} for="name"> <span> <i className="fa fa-user"></i>  </span></label>
              <input onChange={handleEvent} type="text" id="username" placeholder="Username"  />
            </div>
            <div className="separator">
            <label style={{marginRight:"15px"}} for="name"> <span> <i className="fa fa-lock"></i>  </span></label>
              <input
                onChange={handleEvent}
                type="text"
                password="password"
                id="password"
                placeholder="Password" 
              />
            </div>

            <div className="separator">
            <label style={{marginRight:"15px"}} for="name"> <span> <i className="fa fa-envelope"></i>  </span></label>
              <input onChange={handleEvent} type="email" id="email" placeholder="Email" />
            </div>
            <div className="separator">
            <label style={{marginRight:"15px"}} for="name"> <span> <i className="fa fa-phone"></i>  </span></label>
              <input onChange={handleEvent} type="text" id="phoneNumber" placeholder="Phone Number"  />
            </div>
            <div  className="separator">
            <div style={{marginLeft:"15px"}}class="form-check">
            <label class="form-check-label" for="flexCheckDefault">
    Are you a teacher?
  </label>
  <input onClick={(e)=>setIsTeacher(!isTeacher)}class="form-check-input" type="checkbox" value="teacher" id="flexCheckDefault"/>

</div>
</div>

 
            <div style={{ textAlign: "center " }} className="validation">
              <button id="submitLogin">Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
