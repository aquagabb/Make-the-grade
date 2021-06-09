import React,{useState,useEffect} from 'react'
import Navbar from "../NavbarProfile/NavbarProfile"
import "./CreateTest.css"
import axios from 'axios'
import  { Redirect , Link, Route} from 'react-router-dom'

const numberQuiz = [1,2,3,4,5,6,7,8,9,10]

function CreateTest() {
    const [isCreatedCourse,setIsCreatedCourse] = useState(false)
    const [isCreatedExam,setIsCreatedExam] = useState(false)
    const [isCreatedTests,setIsCreatedTests] = useState(false)
    const [isCreatedTests2,setIsCreatedTests2] = useState(false)
    const [isEssay,setIsEssay] = useState(false)
    const [isShortAnswer,setIsShortAnswer] = useState(false)
    const [isMultipleChoice,setIsMultipleChoice] = useState(false)
    const [numberOfQuestions,setNumberOfQuestions] = useState(2)
    const [selectCourse,setSelectCourse] = useState("")
    const [selectExam,setSelectExam] = useState("")
    const [credits,setCredits] = useState("0")
    const [courses,setCourses] = useState([])
    const [studentName,setStudentName] = useState("")
    const [examId,setExamId] = useState("")
    const [questionEssay,setQuestionEssay] = useState("") 
    const [questionShortAnswer,setQuestionShortAnswer] = useState("")
    const [correctQuestionShortAnswer,setCorrectQuestionShortAnswer] = useState("")


    const [quizQuestion,setQuizQuestion] = useState("")
    const [correctQuizQuestion,setCorrectQuizQuestion] = useState("")
    const [possibleAnswersQuizQuestion,setPossibleAnswersQuizQuestion] = useState("")
    
    useEffect(() => {
        getCourses()
  
    }, []);

    function getCourses(){
        axios.get('http://localhost:5000/v1/courses/')
        .then((response) => {
  
            console.log(response.data)
            setCourses(response.data)
  
        
        });
    }
    
    function handleCreateCourse(e){
        e.preventDefault();



        axios.post('http://localhost:5000/v1/courses',{
            title: selectCourse,
            credits: credits
        })
        .then((response) => {
    
          console.log(response.data)
           
        
    
        });

        setIsCreatedCourse(true)
    }
    function handleCreateExam(e){
        e.preventDefault();
        const user = localStorage.getItem("logged");
        axios.post('https://school-made-easy.ew.r.appspot.com/exams',{
            teacherId: user ,
            description: studentName
        })
        .then((response) => {
    
          console.log(response.data)
          setExamId(response.data)
           
        
    
        });

        console.log(selectExam)
        setIsCreatedExam(true)
        setIsEssay(true)

    }
    function handleCreateEssay(e){
        e.preventDefault();

        console.log(examId)
        axios.post('https://school-made-easy.ew.r.appspot.com/essay-tests',{
            question: questionEssay,
            examId:  String(examId)
        })
        .then((response) => {
    
          console.log(response.data)
           
        
    
        });

        setIsEssay(false)
        setIsShortAnswer(true)

    }
    function handleCreateShortAnswer(e){
        e.preventDefault();

        axios.post('https://school-made-easy.ew.r.appspot.com/short-answer-tests',{
            question: questionShortAnswer,
            examId: String(examId)
        })
        .then((response) => {
    
          console.log(response.data)
           
        
    
        });
        setIsShortAnswer(false)
        setIsMultipleChoice(true)
    }
    function handleCreateMultipleChoice(e){
        e.preventDefault();

        console.log(possibleAnswersQuizQuestion)
        console.log(correctQuizQuestion)
        console.log(quizQuestion)
        axios.post('https://school-made-easy.ew.r.appspot.com/multiple-choice-tests',{
            question: quizQuestion,
            examId: String(examId),
            possibleAnswers: possibleAnswersQuizQuestion ,
            correctAnswers: correctQuizQuestion
        })
        .then((response) => {
    
          console.log(response.data)
           
        
    
        });
        setIsMultipleChoice(false)
        setIsCreatedTests(true)
     
        setTimeout(() => {     setIsCreatedTests2(true); },3000);
    }


    if (isCreatedTests2) {

        return <Redirect to="/profile" />
        
      }
    return (
        <>
        <Navbar/>

        <div style={{display:"grid",justifyContent:"center",backgroundColor:"rgb(248, 249, 250)",borderRadius:"12px" ,boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}} className="container w-50">


        { !isCreatedExam && 
            <div style={{display:"inline-grid",marginTop:"20px"}}>
          
<label for="student">Name exam: </label>   
<input onChange={ (e) => setStudentName(e.target.value)} type="text"/>
<button id="create-course"  onClick={handleCreateExam}id="create-course">Create Exam</button>
  </div>
 
        }
 
  { isCreatedExam && <>

<div style={{justifyContent:"center",textAlign:"center",marginTop:"20px"}}>
    <p style={{fontFamily:"emoji"}}>Exam created successfully</p>
    <i style={{ padding:"20px",backgroundColor:"#66FF00", borderRadius:"30px", color:"#f8f9fa"}}class="fa fa-check" aria-hidden="true"></i> </div>

    { isEssay && <> <label style={{ marginTop:"20px", fontFamily:"fantasy"}}for="credits">What is the title of the essay?</label>   
<input onChange={ (e) => setQuestionEssay(e.target.value)} type="text"/>
    <button onClick={handleCreateEssay}id="create-course">Create Essay</button> </>
    }

{ isShortAnswer && <> <label style={{ marginTop:"20px", fontFamily:"fantasy"}}for="credits">What is the Question?</label>   
    <p style={{fontSize:"15px", fontStyle:"italic"}}>Use * where you want to add an input</p>
    <input onChange={ (e) => setQuestionShortAnswer(e.target.value)} type="text"/>
    {/* <label style={{ marginTop:"20px" ,fontFamily:"fantasy"}}for="credits">Correct Answer?</label>    */}
  
    {/* <p style={{fontSize:"15px", fontStyle:"italic"}}>Separate the words using the comma</p> */}
    <button onClick={handleCreateShortAnswer} id="create-course">Create Short Answer</button> </>
    }

{ isMultipleChoice && <> 

    <label style={{ marginTop:"20px"}}for="question">Question:</label>   
    <input onChange={ (e) => setQuizQuestion(e.target.value)} type="text"/>
    <label style={{ marginTop:"20px"}}for="possible">Possible Answers</label>   
    <input onChange={ (e) => setPossibleAnswersQuizQuestion(e.target.value)} type="text"/>
    <label style={{ marginTop:"20px"}}for="correct">Correct Answers</label>   
    <input onChange={ (e) => setCorrectQuizQuestion(e.target.value)} type="text"/>



    
    <button onClick={handleCreateMultipleChoice}id="create-course">Create Quiz</button> </>
    }

    
  { isCreatedTests && <>

<div style={{marginTop:"20px",justifyContent:"center",textAlign:"center"}}>
    <p style={{fontFamily:"emoji"}}>All is good</p>
    <i style={{ padding:"20px",backgroundColor:"#66FF00", borderRadius:"30px", color:"#f8f9fa",marginBottom:"15px"}}class="fa fa-check" aria-hidden="true"></i> </div>

    <p style={{fontFamily:"emoji"}}>You will be redirected to profile in 3 seconds...</p>
</>
}

 

</>
}


  </div>
        </>
    )
}

export default CreateTest
