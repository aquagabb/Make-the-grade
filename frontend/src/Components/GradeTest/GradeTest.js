import React,{useState,useEffect} from 'react'
import "./GradeTest.css"
import { Redirect} from 'react-router-dom'
import axios from 'axios'
import ScoreTest from '../ScoreTest/ScoreTest'
import ScoreTestShortAnswer from '../ShortAnswerTest/ShortAnswerTest'


function GradeTest(props) {

    const idExamenba = props.id;

    const [valid,setValid] = useState(false);
    const [validShortAnswer,setValidShortAnswer] = useState(false);
    const [isExam,setIsExam] = useState(true);
    const [idStudent,setIdStudent] = useState(true);
    const [studentName,setStudentName] = useState("")
    function handleScore(e){
        
        console.log(e.target.id)
        setIdStudent(examData[e.target.id].id)
        setStudentName(examData[e.target.id].studentName)
        setValid(true)
        setIsExam(false)
    }

    function handleShortAnswer(e){

        console.log(e.target.id)
        setIdStudent(examData[e.target.id].id)
        setStudentName(examData[e.target.id].studentName)
        setValidShortAnswer(true)
        setIsExam(false)

    }
    

    function handleBack(e){
        e.preventDefault();
        setValid(false)
        setIsExam(true)
    }
    const [examData,setExamData] = useState([])
      
    useEffect(() => {
          getExams()
    
      }, []);


      function getExams() {

        console.log("EXAMENE")
        axios.get('https://school-made-easy.ew.r.appspot.com/pending/'+ props.id+'/essay')
          .then((response) => {
    
     
            console.log(response.data)
            setExamData(response.data)
            
    
          
          });
      }



    // if (valid === true) {
    //     return <Redirect to='/score' />
    //   }
    


    return (

        <>

   
        {isExam &&  examData.map( (exam,index) =>{
            return(
                <div style={{ justifyContent:"center", display:"grid", marginTop:"10px"}}className="container">


                <div style={{ backgroundColor:"rgba(102, 204, 0, 0.7)" , padding:"50px", borderRadius:"15px",marginLeft:"15px"}}className="container w-100">
                <div style={{ textAlign:"center", fontFamily:"emoji"}}className="row">
                <h1 style={{ color:"white" , marginBottom:"20px", fontSize:"26px"}}>Pending Exams </h1>
                </div>
    
                <div className="row">
                
    
                <div id ="test" className="col-4">
    
                    <p style={{ fontFamily:"fantasy", marginTop:"15px"}}>Essay Test</p>
    
                    <button onClick={handleScore}id={index}  style={{ fontSize:"15px"}} className="btn btn-dark" > Open </button>
                </div>
                <div id ="test"  className="col-4">
                <p style={{ fontFamily:"fantasy", marginTop:"15px"}}> Short Answer Test</p>
       
                <button onClick={handleShortAnswer}id={index} style={{ fontSize:"15px"}}className="btn btn-dark" > Open </button>
            </div>
                </div>
                </div>
            </div>
            );

        }


        )}
       
    
       { valid && <>
         
            <ScoreTest id={props.id} studentName={studentName}/>
            <button className="btn btn-dark" onClick={handleBack}>Back</button>
            </>}

            {validShortAnswer && <>
         
         <ScoreTestShortAnswer id={props.id} studentName={studentName}/>
         <button className="btn btn-dark" onClick={handleBack}>Back</button>
         </>}
    
        </>
    )
 
}

export default GradeTest
