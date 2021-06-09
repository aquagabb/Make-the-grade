import React,{useState,useEffect} from 'react'
import axios from 'axios'

import "./ShortAnswerTest.css"


const gradesScore = [1,2,3,4,5,6,7,8,9,10]
function ScoreTest(props) {

    const [coursesData,setCoursesData] = useState([])
    const [grade,setGrade] = useState("")
    const [id,setId] = useState("")
    useEffect(() => {
        getCourses()
    
      }, []);


      function getCourses() {

        axios.get('https://school-made-easy.ew.r.appspot.com/pending/'+ props.id+'/short-answer-tests')
          .then((response) => {
    
            console.log("ALOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
            console.log(response.data)
            setCoursesData(response.data)
            
    
          
          });
      }

      function handleScore(e){
          e.preventDefault();
          setGrade(e.target.title)
          setId(coursesData[0].id)
          
      }
    //   http://localhost:5000/v1/essay-tests/1/score/7
      function handleGrade(e){

        e.preventDefault();
        
        console.log(coursesData)
        console.log(coursesData[0])
        // console.log(coursesData[0].testId)

        axios.post('https://school-made-easy.ew.r.appspot.com/catalogs',{
          studentId: coursesData[0].studentId,
          teacherId: coursesData[0].teacherId,
          examId: coursesData[0].examId,
          testId: coursesData[0].testId,
          grade: grade,
        })
        .then((response) => {
  
        
          console.log(response.data)
          setCoursesData(response.data)


          
  
        
        });
        // window.location.reload(false);
    }
        
      

    return (
        <> 
      
        <div style={{ backgroundColor:"rgba(102, 204, 0, 0.7)", borderRadius:"15px"}}className="container w-75">
        <div style={{display:"flex",justifyContent:"space-between"}}>
            { coursesData[0] !=undefined && <p style={{fontFamily:"fantasy", fontSize:"15px"}}>Grade {coursesData.grade}</p> } 
            { coursesData[0] !=undefined &&  <p style={{color:"white",textAlign:"end",marginRight:"25px", fontStyle:"italic"}}>Student Name: {coursesData[0].studentId}</p>
          }
    
            </div>
            { coursesData[0] !=undefined && <h1 style={{textAlign:"center", marginBottom:"10px", fontFamily:"fantasy", fontSize:"22px", paddingTop:"15px"}}>{ coursesData[0].question }</h1> } 
        

           { coursesData[0] !=undefined && <p style={{fontFamily:"serif"}}>{coursesData[0].response}</p> } 
  







            <div className="grades">
            {gradesScore.map( (grade,index) =>{
                return(
                    <>
                        <div title={grade} id="grade" onClick={handleScore}>{grade}</div>
     
                </>
                );

            }
     
            )}
                 
            </div>
            <div style={{marginTop:"25px", display:"flex",justifyContent:"center"}}>
            <button onClick={handleGrade}style={{ marginBottom:"25px"}}className="btn btn-primary"> Grade Test</button>
        </div>
        </div>

        </>
    )
}

export default ScoreTest
