import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/cart.css";
import { NavLink } from "react-router-dom";
import "../static/css/userProfile.css";

const UserProfile = () => {
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    const server_data = async () => {
      const result = await axios(SERVER_URL + "/userprofile/getuserprofile/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      })
      console.log(result.status);
      setProfileData(result.data);
    };
    server_data();
  }, []);

  return (
    <div className="profile-container">
      <img
        className="user-profile-image"
        src={SERVER_URL + profileData.profilePicture}
      ></img>
      <div className="profile-information">
        <h1>
          <span>Country:</span>
        </h1>
        <h2>{profileData.country}</h2>
        <h1>
          <span>City:</span>
        </h1>
        <h2>{profileData.city}</h2>
        <h1>
          <span>Street address:</span>
        </h1>
        <h2>{profileData.street}</h2>
        <h1>
          <span>Zipcode:</span>
        </h1>
        <h2>{profileData.zipCode}</h2>
        <h1>
          <span>Date of birth:</span>
        </h1>
        <h2>{profileData.dateOfBirth}</h2>
      </div>
    </div>
  );
};

export default UserProfile;
