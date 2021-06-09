import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Link
 
  } from "react-router-dom";
import Navbar from "../NavbarProfile/NavbarProfile"
import Avalabile from "../Tests/Avalabile"

const Exam = () => {
    const [examArray, setExamArray] = useState("");
    const [isExam,setIsExam] = useState(false)
    const [idExam,setIdExam] = useState("")
    const [titleExam,setTitleExam] = useState("");


    function handleExam(e){
      e.preventDefault()
      setIsExam(true)
      setIdExam(e.target.id)


      setTitleExam(e.target.title);
    }
    async function  getExams() {


     
        await axios.get('https://school-made-easy.ew.r.appspot.com/exams')
          .then((response) => {
    
            console.log(response.data)
            setExamArray(response.data)
    
            console.log(examArray)
    
          
          
          });
      }
         
      useEffect(() => {
        getExams()
    
      }, []);
      function handleSubmit(e){
          console.log(examArray)
      }
 
    return (
        <>
          <Navbar/>
        {!isExam &&
        <> <div  style={{ justifyItems:"center", display:"grid"}} className="container">
            <h1 style={{ marginBottom:"50px"}}>Exams</h1>
             
            {examArray !="" && 
            
            examArray.map(item => {

                return (
                    <div class="card" style={{ width:"18rem"}}>
                    <div class="card-body">
                      <p  title={item.description} id={item.examId} onClick={handleExam}class="card-text">{item.description}</p>
                    </div>
                  </div>
                )
            })
        }
          <Link to="/profile">   <button  id="item" className="btn btn-dark"onClick={handleSubmit}>Back</button></Link>
         
 
        
            </div>
            </>
}
          {isExam && <Avalabile examId={idExam} titleExam={titleExam}/>}
          
            
        </>
    )
}

export default Exam
