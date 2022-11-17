import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/serverUtil";
import { updateAccessToken } from "../utils/updateAccessToken";
import { parseJwt } from "../utils/tokenDecode";
import "../static/css/cart.css";
import "../static/css/userProfile.css";

const UserProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileData, setProfileData] = useState("");
  const [picture, setPicture] = useState(
    "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
  );
  const [country, setCountry] = useState(" ");
  const [city, setCity] = useState(" ");
  const [street, setStreet] = useState(" ");
  const [zipcode, setZipcode] = useState(" ");
  const [dateOfBirth, setDateOfBirth] = useState(" ");

  useEffect(() => {
    const server_data = async () => {
      const result = await axios(SERVER_URL + "/userprofile/getuserprofile/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        if (error.response.status === 500) {
          setUsername(parseJwt(localStorage.getItem("access-token")).username);
          setFirstName(
            parseJwt(localStorage.getItem("access-token")).first_name
          );
          setLastName(parseJwt(localStorage.getItem("access-token")).last_name);
          setEmail(parseJwt(localStorage.getItem("access-token")).email);
        } else if (error.response.status === 401) {
          updateAccessToken(server_data);
        }
      });
      setPicture(SERVER_URL + result.data.profilePicture);
      setCountry(result.data.country);
      setCity(result.data.city);
      setStreet(result.data.street);
      setZipcode(result.data.zipCode);
      setDateOfBirth(result.data.dateOfBirth);
      setUsername(parseJwt(localStorage.getItem("access-token")).username);
      setFirstName(parseJwt(localStorage.getItem("access-token")).first_name);
      setLastName(parseJwt(localStorage.getItem("access-token")).last_name);
      setEmail(parseJwt(localStorage.getItem("access-token")).email);
    };
    server_data();
  }, []);

  const handlePicture = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    await setPicture(e.target.files[0].name);
  };

  const handleCountry = async (e) => {
    e.preventDefault();
    await setCountry(e.target.value);
  };

  const handleCity = async (e) => {
    e.preventDefault();
    await setCity(e.target.value);
  };

  const handleStreet = async (e) => {
    e.preventDefault();
    await setStreet(e.target.value);
  };

  const handleZipcode = async (e) => {
    e.preventDefault();
    await setZipcode(e.target.value);
  };

  const handleDateOfBirth = async (e) => {
    e.preventDefault();
    await setDateOfBirth(e.target.value);
  };

  const CreateUserProfile = async (e) => {
    e.preventDefault();

    let form_data = new FormData();
    form_data.append("picture", picture);
    form_data.append("country", country);
    form_data.append("city", city);
    form_data.append("street", street);
    form_data.append("zipCode", zipcode);
    form_data.append("dateOfBirth", dateOfBirth);
    form_data.append("user", localStorage.getItem("user"));

    const response = await axios
      .post(SERVER_URL + "/userprofile/adduserprofile/", form_data, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        "content-type": "multipart/form-data",
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          updateAccessToken(CreateUserProfile(e));
        }
      });
    console.log(response);
    /* .then(window.location.reload()); */
  };

  return (
    <div className="profile-container">
      <img className="user-profile-image" src={picture}></img>
      <div className="profile-information">
        <h2>
          <span>Username:</span>
        </h2>
        <h3 className="profile-information-cell">{username}</h3>
        <h2>
          <span>First name:</span>
        </h2>
        <h3 className="profile-information-cell">{firstName}</h3>
        <h2>
          <span>Last name:</span>
        </h2>
        <h3 className="profile-information-cell">{lastName}</h3>
        <h2>
          <span>Email:</span>
        </h2>
        <h3 className="profile-information-cell">{email}</h3>
        <h2>
          <span>Country:</span>
        </h2>
        <h3 className="profile-information-cell">{country}</h3>
        <h2>
          <span>City:</span>
        </h2>
        <h3 className="profile-information-cell">{city}</h3>
        <h2>
          <span>Street:</span>
        </h2>
        <h3 className="profile-information-cell">{street}</h3>
        <h2>
          <span>Zipcode:</span>
        </h2>
        <h3 className="profile-information-cell">{zipcode}</h3>
        <h2>
          <span>Date of birth:</span>
        </h2>
        <h3 className="profile-information-cell">{dateOfBirth}</h3>
      </div>
      <div className="user-orders">
        <h2>Your orders:</h2>
      </div>
    </div>
  );
};

export default UserProfile;
