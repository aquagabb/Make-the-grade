import React,{useState, useEffect} from 'react'
import "./Avalabile.css"
import NavbarProfile from "../NavbarProfile/NavbarProfile";
import  { Redirect} from 'react-router-dom'
import axios from 'axios'
import DoTest from '../MakeTest/DoTest'
import Essay from "../MakeTest/Eassay"
import MultipleChoice from "../MakeTest/ThinkWords"
const quizNumbers = [{
    materie:"Math",
    dificultate:"Hard",
    questions: 17
    
},
{
    materie:"IT",
    dificultate:"Medium",
    questions: 15
    
},
{
    materie:"English",
    dificultate:"Easy",
    questions: 25
    
}
,
{
    materie:"Biology",
    dificultate:"Medium",
    questions: 30
    
}
]
const Avalabile = (props) => {
   
    const [quizState,setQuizState] = useState(false)
    const [essayState,setEssayState] = useState(false)
    const [thinkState,setThinkState] = useState(false)

    const [isAllExams,setIsAllExams] = useState(true)

    const [quizArray,setQuizArray] = useState([])
    const [thinkArray,setThinkArray] = useState([])
    const [essayArray,setEssayArray] = useState([])

    function handleQuiz(e){
        setQuizState(true);
        setIsAllExams(false)
    }
    
    function handleEssay(e){
        setEssayState(true);
        setIsAllExams(false)
    }

    
    function handleThink(e){
        setThinkState(true);
        setIsAllExams(false)
    }
    
    function getQuiz(){
     axios.get('https://school-made-easy.ew.r.appspot.com/'+props.examId+'/multiple-choice-tests')
    .then((response) => {

        console.log("MULTIPLE CHOICE")
      console.log(response.data)
      setQuizArray([response.data])

    //   const DataArray = response.data

    //   const unique = (value, index, self) => {
    //     return self.indexOf(value) === index
    //   }
      
    //   const uniqueExams = DataArray.filter(unique)
      
    //   console.log(DataArray)
    //   console.log(quizArray)

      

    
    
    });

}
function getThinks(){
    axios.get('https://school-made-easy.ew.r.appspot.com/'+props.examId+ '/short-answer-tests')
   .then((response) => {
    console.log("Thinks Words")
     console.log(response.data)
     setThinkArray([response.data])
   
   });

}

function getEssays(){
    axios.get('https://school-made-easy.ew.r.appspot.com/'+ props.examId + '/essay-tests')
   .then((response) => {

    console.log("essay")
     console.log(response.data)
     setEssayArray([response.data])
   
   });

}
useEffect(() => {
    getQuiz()

}, []);

useEffect(() => {
    getThinks()

}, []);

useEffect(() => {
    getEssays()

}, []);

    // if (quizState === true) {
    //     return <Redirect to='/test' />
    //   }

    //   if (essayState === true) {
    //     return <Redirect to='/essay' />
    //   }
      
    //   if (thinkState === true) {
    //     return <Redirect to='/word' />
    //   }
    return (
      <>
 
    
 { isAllExams && <>
    <div class="container">
       <h1>Exam {props.titleExam}</h1>
       <h1 style={{ fontFamily:"FontAwesome" , fontFamily:"oblique" }}>Quiz Tests</h1>
       <div class="row">
       {quizArray.map((item, index) => (
              <>
              <div key={index} class="col-md-4 col-xl-3">
            <div class="card bg-c-blue order-card">
                <div class="card-block">
                    <h6 class="m-b-20"> </h6>
                    <h2 class="text-right"><i class="fa fa-check-circle-o"></i><span>1</span></h2>
              
                    <p class="m-b-0">Difficulty <span class="f-right">Easy</span></p>
                    <button onClick={handleQuiz}type="button" class="btn btn-secondary">Start Quiz</button>
                </div>
            </div>
        </div>
                
              </>
            ))}

            </div>
            </div>
            <div class="container">
       <h1 style={{ fontFamily:"FontAwesome" , fontFamily:"oblique" }}>ThinkWords Tests </h1>
       <div class="row">
       {thinkArray.map((item, index) => (
              <>
              <div key={index} class="col-md-4 col-xl-3">
            <div class="card bg-c-green order-card">
                <div class="card-block">

                    <h2 class="text-right"><i class="fa fa-check-circle-o"></i><span>2</span></h2>
              
                    <p class="m-b-0">Difficulty <span class="f-right">Medium</span></p>
                    <button onClick={handleThink}type="button" class="btn btn-secondary">Start Thinking</button>
                </div>
            </div>
        </div>
                
              </>
            ))}

            </div>
            </div>


            <div class="container">
       <h1 style={{ fontFamily:"FontAwesome" , fontFamily:"oblique" }}>Essay Tests</h1>
       <div class="row">
       {essayArray.map((item, index) => (
              <>
              <div key={index} class="col-md-4 col-xl-3">
            <div class="card bg-c-yellow order-card">
                <div class="card-block">
                    {/* <h6 class="m-b-20">{item.materie} minutes</h6> */}
                    <h2 class="text-right"><i class="fa fa-check-circle-o"></i><span>3</span></h2>
              
                    <p class="m-b-0">Difficulty <span class="f-right">Hard</span></p>
                    <button onClick={handleEssay}type="button" class="btn btn-secondary">Start Writing</button>
                </div>
            </div>
        </div>
                
              </>
            ))}

            </div>
            </div>

      </>}
      


    { quizState && <DoTest examenId={props.examId} />}
    { essayState  && <Essay examenId={props.examId} /> }
    { thinkState  && <MultipleChoice examenId={props.examId} /> }
      </>
       
    )
}

export default Avalabile
