import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Countdown from 'react-countdown';
import  { Redirect} from 'react-router-dom'
const ThinkWords = (props) => {


  const [questionsArray,setQuestionsArray] = useState([])
  const [responseData,setResponseData] = useState([])
  const [validTest,setValidTest] = useState(false)
  const [question,setQuestion] = useState("");
  const [idTest,setIdQuestion] = useState("");
  useEffect(() => {
    getWords()

  }, []);

  async function handleSubmit(e){
    console.log(questionsArray)
    console.log(responseData)
    console.log(responseData[0])
    console.log(responseData[0].UserAnswers)
    console.log(responseData[0].UserAnswers[0].Value)
    var trimite ="";
    responseData.map( item =>{
        trimite = trimite + item.UserAnswers[0].Value + ","
    })

    const user = localStorage.getItem("logged");
    const sendEssayResponse = {
      question: question,
      response: trimite,
      essayId: idTest,
      examId: props.examenId,
      studentId: user,
    }
    console.log(sendEssayResponse)
    console.log(trimite)
    await axios.post('https://school-made-easy.ew.r.appspot.com/pending/short-answer',sendEssayResponse)
    .then((response) => {

      console.log(response.data)
      // setValidTest(true)
      setTimeout(() => {       window.location.reload(false); },3000);
       

    });

 
    // setValidTest(true)
    // questionsArray.map( item => console.log(item.Id))
  }

  function handleChange(e){
  
 
    const questionNumber = e.target.id;
    const questionId= e.target.name;
    const questionValue = e.target.value;

    const questionDetails = { QuestionId: questionNumber, UserAnswers: [ { InputId : questionId, Value: questionValue}] };

    console.log(questionDetails)

    console.log("numarul intrebarii" + questionNumber)
   console.log(" id input " + questionId)
   console.log(" valoare input " + questionValue)
   console.log(questionNumber)
   console.log(responseData)
    const questionIdFind = responseData.filter(
      (question) => question.QuestionId == questionNumber
    );
    let ok = 0
    console.log("S-a gasit intrebarea?")
    console.log(questionIdFind.length)
    if (questionIdFind.length == 0) {
      const newList = responseData.concat(questionDetails);
      setResponseData(newList);
    } else {
      const updateArray = responseData;
      updateArray.map( item => {
        ok = 0
        if (item.QuestionId == questionNumber){

          let index = item.UserAnswers.findIndex(item2 => item2.InputId == questionId)
          if (index != - 1) 
            item.UserAnswers[index].Value = questionValue
          else
            item.UserAnswers = item.UserAnswers.concat({ InputId : questionId, Value: questionValue})
       
              
               }


              // if(ok == 1)
              //   item.UserAnswers = item.UserAnswers.concat({ InputId : questionId, Value: questionValue})

       
      })
    
      setResponseData(updateArray)
    }
  }


  function getWords() {

    console.log(props.examenId)
    axios.get('https://school-made-easy.ew.r.appspot.com/'+props.examenId +'/short-answer-tests')
      .then((response) => {

        setQuestion(response.data.question)
        setIdQuestion(response.data.shortAnswerTestId)
        console.log(response.data)

        const listAnswers = [response.data]

        listAnswers.map( item => {
          // console.log(item)
          const question = { Id: item.id , ShortAnswerText : item.question.split('*')}
          // const addItem = questionsArray.concat(question)
          // console.log(addItem)
          // setQuestionsArray(addItem)
          const questionId = questionsArray.filter(
            (question) => question.Id == item.id
          );
         
          if ( questionId.length === questionsArray.length)
              setQuestionsArray(oldArray => [...oldArray, question]);

          console.log(questionsArray)
        })
        // const question = { Id: response.data.id , ShortAnswerText : response.data.question.split('*')}
        // const addItem = questions.concat(question)
        
        // console.log(addItem)
        // setQuestions(addItem)
        // console.log(response.data)
     
      
      
      });
  }

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return "GATA"
    } else {
      // Render a countdown
      return (
        <div >
          {minutes}:{seconds}
          </div>
      );
    }}

    if (validTest === true) {
      return <Redirect to='/exams' />
    }
  

    return (
        <>
        <div className="container">
        {/* <div style={{ marginTop:"2%"}} className="row">
          <div style={{ marginBottom:"5%" ,marginLeft:"5%", width:"50px", height:"50px", backgroundColor: "skyblue" ,textAlign: "center", borderRadius:"50%",display:"flex", alignItems:"center"}}className="time">
        < Countdown date={Date.now() + 600000} renderer={renderer}>
      <h1>GATA</h1>
    </Countdown>
    </div>
    </div> */}
        {/* <h4>{questionsArray[0] == undefined ? "None" : questionsArray[0].ShortAnswerText[0]}</h4> */}

       
         {questionsArray.map(item => {
           return(
             <>

           <p>{item.Id}.</p>
           <div style={{display:'flex'}} >
           {item.ShortAnswerText.map((item2,index) => 
           {if(item.ShortAnswerText.length-1 > index)
             return (
               <p> {item2} <input name={index+1} id={item.Id} onChange={handleChange} type="text"  /></p>
          )
        else{
          return ( <p> {  item2}</p>)
        }}
          
         
      
          // {index}   {item.ShortAnswerText.length-1}
          //  {item.ShortAnswerText.length != index &&    <p> {item2}  {index}       <input type="text"  /></p>}
             
          
            
           
            )}
          
            </div>
</>
           )
         })}
       
        {/* questionsArray.map(item =>       
            {
            
              <h4>{item.Id == undefined ? "None" : item.Id} </h4>
              // <h1>{item.Id}</h1>
              // {item.ShortAnswerText.map( answers =>{
              //  <h1> answers </h1>
              // })
            }

        }) */}
          

          <button style={{ width:"200px", marginTop:"20px"}} className="btn btn-success" onClick={handleSubmit}> Finish Test</button>
          </div>
        </>
    )
}

export default ThinkWords
