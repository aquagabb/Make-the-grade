import React,{useState,useEffect} from 'react'
import "./ProfessorTests.css"
import { Redirect} from 'react-router-dom'
import GradeTest from '../GradeTest/GradeTest'
import NavbarProfile from '../NavbarProfile/NavbarProfile'
import axios from 'axios'
const allExams = [ {
    studentName: "Jhon111",
    courseName: "Mate",
    credits: 6
}
,
{
    studentName: "Hatz",
    courseName: "C#",
    credits: 5
},
{
    studentName: "Aloo",
    courseName: "Engleza",
    credits: 5
}
]
const ProfessorTests = () => {

    const [valid,setValid] = useState(false);
    const [exams,setExams] = useState(true)
    const [idCourse,setIdCourse] = useState("")
    const [courseName,setCourseName] = useState("")
    const [scoreExam,setScoreExam] = useState(false)
    // if (valid === true) {
    //     return <Redirect to='/score' />
    //   }
    

    function handleScore(e){
        e.preventDefault()
       
        console.log(e.target.id)
        setIdCourse(coursesData[e.target.id].examId)
        setCourseName(coursesData[e.target.id].title)
        console.log(idCourse)
        setValid(true)


    }
    const [coursesData,setCoursesData] = useState([])
    useEffect(() => {
        getCourses()
    
      }, []);


      function getCourses() {


        axios.get('https://school-made-easy.ew.r.appspot.com/exams')
          .then((response) => {
    
     
            console.log(response.data)
            setCoursesData(response.data)
            
    
          
          });
      }
    return (
       <>
       
       <NavbarProfile/>
     
        {exams && 
        
        <>           
        <div style={{ display:"flex", justifyContent:"center", padding:"50px", backgroundColor:"#f8f9fa", borderRadius:"15px"}}className="container">
            


          
             <div className="col-5">
          
           <h1 style={{textAlign:"center", color:"#181818"}}>All Exams</h1>
             {coursesData.map((exam,index) => {
                 return(
                <div id="row-exams" key={index} className="row">
                <div id="exam-number" key={index} className="col-5">
                     <div style={{display:"grid"}}>
                    <p1 style={{fontSize:"20px", color:"white"}}>{exam.description}</p1>
                    <div className="text-muted" style={{display:"flex", marginTop:"15px", fontStyle:"italic"}}>
    
                                 </div>
                    </div>

                    <button id={index} onClick={handleScore} className="buton-score">Score test</button>
                    </div>
                    </div>
                
                 );
                  } ) 
                 }
            
            </div>

            <div className="col-6">

            {valid && <GradeTest id={idCourse} courseName={courseName}/>}
            </div>

           

            </div>
            </>
       }


       </>
    )
}

export default ProfessorTests
