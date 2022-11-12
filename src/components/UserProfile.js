import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/cart.css";
import { NavLink } from "react-router-dom";
import "../static/css/userProfile.css";

const UserProfile = () => {
  const [profileData, setProfileData] = useState("");
  const [picture, setPicture] = useState("default");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");

  const testPic = (e) => {
    console.log(e.slice(11));
  };

  const CreateUserProfile = async (e) => {
    console.log(picture);
    e.preventDefault();
    const response = console.log(picture);
    await axios
      .post(
        SERVER_URL + "/userprofile/adduserprofile/",
        {
          user: localStorage.getItem("user"),
          profilePicture: picture,
          country: country,
          city: city,
          street: street,
          zipcode: zipcode,
          dateOfBirth: dateOfBirth,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("access-token"),
          },
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      )
      .then((result) => console.log(result));

    /* .then(window.location.reload()); */
  };

  useEffect(() => {
    const server_data = async () => {
      try {
        const result = await axios(
          SERVER_URL + "/userprofile/getuserprofile/",
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("access-token"),
            },
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        );
        setProfileData(
          <div className="profile-container">
            <img
              className="user-profile-image"
              src={SERVER_URL + result.data.profilePicture}
            ></img>
            <div className="profile-information">
              <h2>
                <span>Country:</span>
              </h2>
              <h3>{result.data.country}</h3>
              <h2>
                <span>City:</span>
              </h2>
              <h3>{result.data.city}</h3>
              <h2>
                <span>Street:</span>
              </h2>
              <h3>{result.data.street}</h3>
              <h2>
                <span>Zipcode:</span>
              </h2>
              <h3>{result.data.zipCode}</h3>
              <h2>
                <span>Date of birth:</span>
              </h2>
              <h3>{result.data.dateOfBirth}</h3>
            </div>
            <div className="user-orders">
              <h2>Your orders:</h2>
            </div>
          </div>
        );
      } catch (error) {
        if (error.response.status === 500) {
          setProfileData(
            <div className="profile-container">
              <div className="profile-information">
                <h1>Please update your profile details </h1>
                <br />
                <form onSubmit={CreateUserProfile}>
                  <div>
                    <h2>
                      <span>Profile pic </span>
                    </h2>
                    <input
                      type="file"
                      id="profilePicture"
                      autoComplete="false"
                      onChange={(e) =>
                        setPicture("/media/" + e.target.value.slice(12))
                      }
                    ></input>
                  </div>
                  <div>
                    <h2>
                      <span>Country:</span>
                    </h2>
                    <input
                      id="country"
                      type="text"
                      autoComplete={"false"}
                      onChange={(e) => setCountry(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <h2>
                      <span>City:</span>
                    </h2>
                    <input
                      id="city"
                      type="text"
                      autoComplete={"false"}
                      onChange={(e) => setCity(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <h2>
                      <span>Street:</span>
                    </h2>
                    <input
                      id="street"
                      type="text"
                      autoComplete={"false"}
                      onChange={(e) => setStreet(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <h2>
                      <span>Zipcode:</span>
                    </h2>
                    <input
                      id="zipCode"
                      type="text"
                      autoComplete={"false"}
                      onChange={(e) => setZipcode(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <h2>
                      <span>Date of birth:</span>
                    </h2>
                    <input
                      id="dateOfBirth"
                      type="text"
                      autoComplete={"false"}
                      onChange={(e) => setdateOfBirth(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <br />
                    <button type="submit">Create profile</button>
                  </div>
                </form>
              </div>
            </div>
          );
        } else if (error.response.status === 401) {
          setProfileData(
            <div className="profile-container">
              <h2>Please log in or register</h2>
            </div>
          );
        }
      }
    };
    server_data();
  }, []);

  return profileData;
};

export default UserProfile;
