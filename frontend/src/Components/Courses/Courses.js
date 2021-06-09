import React,{useState,useEffect} from 'react'
import Navbar from "../NavbarProfile/NavbarProfile"
import axios from 'axios'
const Courses = () => {


  useEffect(() => {
    getCourses()

}, []);

  const [courses,setCourses] = useState([])
  function getCourses(){
    axios.get('http://localhost:5000/v1/courses/')
    .then((response) => {

        console.log(response.data)
        setCourses(response.data)

    
    });
}

    return (
        <>
            <Navbar/>
     

  
            <div className="container">
                <div style={{ justifyContent:"space-around"}} className="row">
                {courses !=[] && courses.map( (course,index) => {
return(
<div class="card" style={{width: '18rem'}}>
<img class="card-image-top" style={{ width:"300px", height:"200px"}} src="https://i.imgur.com/sowmFvY.jpg" alt="Card image cap"/>
<div class="card-body">
  <h5 class="card-title">{course.title}</h5>
 
  <p class="card-text"></p>
  <p className="card-text" >Credits 6</p>
  <a href="/exam" class="btn btn-primary">Open Course</a>
</div>
</div>
)  
      })}
            

{/* <div class="card" style={{width: '18rem'}}>
  <img class="card-image-top" style={{ width:"300px", height:"200px"}} src="data:image/png;base64,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" alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">Computer Science</h5>
    <p class="card-text"></p>
    <p className="card-text" >Credits 5</p>
    <a href="#" class="btn btn-primary">Open Course</a>
  </div>
</div>
<div class="card" style={{width: '18rem'}}>
  <img class="card-image-top" src="https://i1.wp.com/studyabroadnations.com/wp-content/uploads/2020/12/12-Free-Online-English-Test-with-Certificates.jpg?resize=650%2C488&ssl=1" style={{ width:"300px", height:"200px"}} alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">English</h5>
    <p class="card-text"></p>
    <p className="card-text" >Credits 4</p>
    <a href="#" class="btn btn-primary">Open Course</a>
  </div>
</div>
<div class="card" style={{width: '18rem'}}>
  <img class="card-image-top" style={{ width:"300px", height:"200px"}} src="https://i.pinimg.com/736x/36/5f/cd/365fcde7505189ff820e455312007857.jpg" alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">Biology</h5>
    <p class="card-text"></p>
    <p className="card-text" >Credits 5</p>
    <a href="#" class="btn btn-primary">Open Course</a>
  </div>
</div> */}
</div>
</div>


        </>
    )
}

export default Courses
