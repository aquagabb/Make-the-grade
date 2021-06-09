import React,{useState,useEffect} from 'react'
import Navbar from '../NavbarProfile/NavbarProfile'
import axios from 'axios'
import "./Catalog.css"
function Catalog() {

    const user = localStorage.getItem("logged");

    const [catalogData,setCatalogData] = useState([]);

    useEffect(() => {
        getCatalog();
      }, []);


    function getCatalog() {
        axios.get("https://school-made-easy.ew.r.appspot.com/catalogs/"+ user).then((response) => {
          console.log(response.data);
          setCatalogData(response.data);
        });
      }

    return (
        <div>

            <Navbar/>

            <div style={{backgroundColor:"rgb(248, 249, 250)",paddingBottom:"20px",borderRadius:"10px"}}className="container">
            <h1 style={{textAlign:"center"}}>My grades</h1>


            {catalogData.map( (item,index) =>{

                return(
                    <div style={{backgroundColor:"rgba(102, 204, 0, 0.7)",width:"60%",borderRadius:"15px",display:"flex",justifyContent:"space-evenly",marginLeft:"18%",marginTop:"20px"}} key={index}>
                    <h1 id="item"> Grade: {item.grade}</h1>
                    <h1 id="item" > Test id: {item.testId }</h1>
                    <h1 id="item" > Exam id: {item.examId }</h1>
             </div>
                )
            })}
                 </div>
        
            
        </div>
    )
}

export default Catalog



