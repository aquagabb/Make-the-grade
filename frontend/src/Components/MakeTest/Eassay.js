import React,{useState,useRef,useEffect} from 'react'
import axios from 'axios'
import Countdown from 'react-countdown';
import  { Redirect} from 'react-router-dom'

const Eassay = (props) => {

    const [essay,setEssay] = useState("")
    const startDate = new Date()
    const [validTest,setValidTest] = useState(false)
    const [currentDate,setCurrentDate] = useState(startDate.getSeconds())
    const [question,setQuestion] = useState("")
    const [idEssay,setIdEssay] = useState("")
    async function handleSubmit(e){
        e.preventDefault()

        // const EssayTestText = essay

        const user = localStorage.getItem("logged");
        const sendEssayResponse = {
          question: question,
          response: essay,
          essayId: idEssay,
          examId: props.examenId,
          studentId: user,
        }
        console.log(sendEssayResponse)
        await axios.post('https://school-made-easy.ew.r.appspot.com/pending/essay',sendEssayResponse)
        .then((response) => {
    
          console.log(response.data)
          setValidTest(true)
          setTimeout(() => {       window.location.reload(false); },3000);
           
    
        });

          
        
        console.log("am dat submit")

    }




      useEffect(() => {
        getEssay()
      },[]);

      


      
  function getEssay() {


    axios.get('https://school-made-easy.ew.r.appspot.com/'+props.examenId + '/essay-tests')
      .then((response) => {

        console.log(props.examenId)
        setQuestion(response.data.question)
        
        setIdEssay(response.data.essayId)

        console.log(response.data)
        console.log(response);
      
        console.log(idEssay)
        console.log("ID ESSAY ?")
        console.log(idEssay)

      
      
      });
  }
    function handleInput(e){
        setEssay(e.target.value)
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

        {/* <div style={{ marginTop:"2%"}} className="row">
          <div style={{ marginLeft:"5%", width:"50px", height:"50px", backgroundColor: "skyblue" ,textAlign: "center", borderRadius:"50%",display:"flex", alignItems:"center"}}className="time">
        < Countdown date={Date.now() + 600000} renderer={renderer}>
      <h1>GATA</h1>
    </Countdown>
    </div>
    </div> */}

        <div className="container">
             <form>



<div style={{ textAlign:"center", fontSize:"24px",marginTop:"50px"}}class="form-group">
 { question != "" &&  <label style={{marginBottom:"50px"}} for="exampleFormControlTextarea1"> {question} </label> }
  <textarea onChange={handleInput} style={{ height:"200px"}}class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  <button style={{ width:"200px", marginTop:"20px"}} className="btn btn-success" onClick={handleSubmit}> Submit</button>
</div>

</form>

</div>

        </>
    )
}

export default Eassay
