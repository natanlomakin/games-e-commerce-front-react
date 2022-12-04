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
  const [profileId, setProfileId] = useState("");
  const [country, setCountry] = useState(" ");
  const [city, setCity] = useState(" ");
  const [street, setStreet] = useState(" ");
  const [zipcode, setZipcode] = useState(" ");
  const [dateOfBirth, setDateOfBirth] = useState(" ");
  const [orders, setOrders] = useState([]);
  const [isProfileBeingUpdated, setIsProfileBeingUpdated] = useState(false);

  useEffect(() => {
    setIsProfileBeingUpdated(false);
    const profileData = async () => {
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
          updateAccessToken(profileData);
        }
      });
      setProfileId(result.data._id);
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
    profileData();
  }, []);

  useEffect(() => {
    const ordersData = async () => {
      const response = await axios(SERVER_URL + "/order/getuserorder/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setOrders(response.data);
    };
    ordersData();
  }, []);

  const handlePicture = (e) => {
    e.preventDefault();
    setPicture(e.target.files[0]);
  };

  const handleCountry = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
  };

  const handleCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const handleStreet = (e) => {
    e.preventDefault();
    setStreet(e.target.value);
  };

  const handleZipcode = (e) => {
    e.preventDefault();
    setZipcode(e.target.value);
  };

  const handleDateOfBirth = (e) => {
    e.preventDefault();
    setDateOfBirth(e.target.value);
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();

    const form_data = new FormData();
    form_data.append("profilePicture", picture);
    form_data.append("country", country);
    form_data.append("city", city);
    form_data.append("street", street);
    form_data.append("zipCode", zipcode);
    form_data.append("dateOfBirth", dateOfBirth);
    form_data.append("user", localStorage.getItem("user"));

    const response = await axios
      .put(
        SERVER_URL + "/userprofile/updateuserprofile/" + profileId,
        form_data,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("access-token"),
          },
          "content-type": "multipart/form-data",
        }
      )
      .catch((error) => {
        if (error.response.status === 401) {
          updateAccessToken(updateUserProfile(e));
        }
      });
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <img className="user-profile-image" src={picture}></img>
      {isProfileBeingUpdated ? (
        <div className="profile-information">
          <form onSubmit={updateUserProfile}>
            <h2>
              <span>Profile picture:</span>
            </h2>
            <input type="file" onChange={(e) => handlePicture(e)}></input>
            <h2>
              <span>Username:</span>
            </h2>
            <input></input>
            <h2>
              <span>First name:</span>
            </h2>
            <input></input>
            <h2>
              <span>Last name:</span>
            </h2>
            <input></input>
            <h2>
              <span>Email:</span>
            </h2>
            <input></input>
            <h2>
              <span>Country:</span>
            </h2>
            <input
              placeholder={country}
              type="text"
              onChange={(e) => handleCountry(e)}
            ></input>
            <h2>
              <span>City:</span>
            </h2>
            <input
              placeholder={city}
              type="text"
              onChange={(e) => handleCity(e)}
            ></input>
            <h2>
              <span>Street:</span>
            </h2>
            <input
              placeholder={street}
              type="text"
              onChange={(e) => handleStreet(e)}
            ></input>
            <h2>
              <span>Zipcode:</span>
            </h2>
            <input
              placeholder={zipcode}
              type="text"
              onChange={(e) => handleZipcode(e)}
            ></input>
            <h2>
              <span>Date of birth:</span>
            </h2>
            <input
              placeholder={dateOfBirth}
              type="text"
              onChange={(e) => handleDateOfBirth(e)}
            ></input>
            <div>
              <br />
              <button
                onClick={() => setIsProfileBeingUpdated(!isProfileBeingUpdated)}
              >
                Cancel
              </button>{" "}
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      ) : (
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
          <div>
            <button onClick={() => setIsProfileBeingUpdated(true)}>
              Update details
            </button>
          </div>
        </div>
      )}
      <div className="user-orders">
        <h2>Your orders:</h2>
        <div className="cart-container">
          <div className="cart-game">
            {orders.length !== 0 ? (
              orders.map((order, ind) => (
                <div key={ind} className="cart-game-card">
                  <div className="cart-game-information">
                    <div className="cart-game-title">
                      {order.createdTime.slice(0, 10)}
                    </div>
                    <div className="cart-game-price">
                      <h3>
                        {order.total}
                        <i className="material-icons">attach_money</i>
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <span>
                <h2>you didnt make any orders</h2>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
