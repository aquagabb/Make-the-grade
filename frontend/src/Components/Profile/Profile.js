import React, { useState, useEffect } from "react";
import NavbarProfile from "../NavbarProfile/NavbarProfile";
import "./Profile.css";
import axios from "axios";
function Profile() {
  const user = localStorage.getItem("logged");
  const status = localStorage.getItem("status");
  console.log(user);
  
  const [profileData, setProfileData] = useState("");
  useEffect(() => {
    getProfileData();
  }, []);

  function getProfileData() {


    if( status == "teacher" ){
      axios.get("https://school-made-easy.ew.r.appspot.com/teachers/" + user).then((response) => {
        console.log(response.data);
        setProfileData(response.data);
      });
    }
    else{
      axios.get("https://school-made-easy.ew.r.appspot.com/students/" + user).then((response) => {
        console.log(response.data);
        setProfileData(response.data);
      });
    }

  
  }
  return (
    <>
      <NavbarProfile />


      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "50px",
          borderRadius: "15px",
        }}
        class="container w-75"
      >
        <div class="team-single">
          <div class="row">
            <div class="col-lg-4 col-md-5 xs-margin-30px-bottom">
              <div class="team-single-img">
                <img
                  style={{ borderRadius: "15px" }}
                  src="https://www.usr.ro/wp-content/uploads/2021/01/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
                  alt=""
                />
              </div>
              <div
                style={{ borderRadius: "15px", marginTop: "15px" }}
                class="bg-light-gray padding-30px-all md-padding-25px-all sm-padding-20px-all text-center"
              >
                <h4 class="margin-10px-bottom font-size24 md-font-size22 sm-font-size20 font-weight-600">
                 {status == "teacher" ? "Teacher" : "Student"} 
                </h4>
                <p class="sm-width-95 sm-margin-auto"></p>
                <div class="margin-20px-top team-single-icons"></div>
              </div>
            </div>

            <div class="col-lg-8 col-md-7">
              <div class="team-single-text padding-50px-left sm-no-padding-left">
                <h4
                  style={{ color: "black",marginBottom:"15px"}}
                  class="font-size25 sm-font-size32 xs-font-size30"
                >
                  {" "}
                  Welcome back , {profileData.username} !
                </h4>

                <div class="contact-info-section margin-40px-tb">
                  <ul class="list-style9 no-margin">
                  
                    <li>
                      <div class="row">
                        <div class="col-md-5 col-5">
                          <i style={{marginRight:"10px"}}class="fa fa-phone text-black"></i>
                          <strong class="margin-10px-left xs-margin-four-left text-black">
                            Phone:
                          </strong>
                        </div>
                        <div class="col-md-7 col-7">
                          <p>{profileData.phone}</p>
                          {/* (+740) 123 456 789 */}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="row">
                        <div class="col-md-5 col-5">
                          <i style={{marginRight:"10px"}}class="fa fa-map-marker text-black"></i>
                          <strong class="margin-10px-left xs-margin-four-left text-black">
                            Address:
                          </strong>
                        </div>
                        <div class="col-md-7 col-7">
                          <p>Iasi,Romania</p>
                          {/* (+740) 123 456 789 */}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="row">
                        <div class="col-md-5 col-5">
                          <i style={{marginRight:"10px"}} class="fa fa-envelope text-black"></i>
                          <strong class="margin-10px-left xs-margin-four-left text-black">
                            Email:
                          </strong>
                        </div>
                        <div class="col-md-7 col-7">
                          <p>
                            <a href="javascript:void(0)">{profileData.email}</a>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
