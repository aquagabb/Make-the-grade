import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css"
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import TestQuiz from "./Components/MakeTest/DoTest";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import SeeTests from "./Components/Tests/Avalabile";
import EssayTest from "./Components/MakeTest/Eassay";
import ThinkWords from "./Components/MakeTest/ThinkWords";
import Courses from "./Components/Courses/Courses"
import Exam from "./Components/Exam/Exam"
import ProfessorTest from "./Components/ProfessorTests/ProfessorTests"
import CreateTest from "./Components/CreateTest/CreateTest"
import ScoreTest from "./Components/ScoreTest/ScoreTest"
import { AuthContext } from "./Auth";
import Catalog from "./Components/Catalog/Catalog";
function App() {
  const loggedIn = localStorage.getItem("logged");

  const autentificat = localStorage.getItem("logged");
  console.log("Estem logati ??" + loggedIn);


  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
    console.log(authTokens)
  }
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <div  className="App">
      <Router>
      {/* <PublicRoute path="/" component={Home} /> */}

         <PublicRoute exact path="/" component={Home} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/login" component={Login} />

          <PrivateRoute path="/essay" component={EssayTest} />

          <PrivateRoute path="/profile" component={Profile} />

          <PrivateRoute path="/test" component={TestQuiz} />
          <PrivateRoute path="/create" component={CreateTest} />
          <PrivateRoute path="/dotest" component={SeeTests} />
          <PrivateRoute path="/courses" component={Courses} />
          <PrivateRoute path="/exams" component={Exam} />
          <PrivateRoute path="/professorTests" component={ProfessorTest} />
          <PrivateRoute path="/score" component={ScoreTest} />
          <PrivateRoute path="/word" component={ThinkWords} />
          <PrivateRoute path="/catalog" component={Catalog} />
      
      </Router>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
