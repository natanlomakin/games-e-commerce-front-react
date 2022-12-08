import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { SERVER_URL } from "../utils/serverUtil";
import { updateAccessToken } from "../utils/updateAccessToken";
import { parseJwt } from "../utils/tokenDecode";
import "../static/css/cart.css";

const Order = () => {
  const [order, setOrder] = useState("");
  const [orderDate, setorderDate] = useState("");
  const [gameDetails, setGameDetails] = useState("");
  const { id } = useParams();
  const [userEmail, setuserEmail] = useState("");

  useEffect(() => {
    const orderData = async () => {
      /* Making a request to the server to get the order details. */
      const response = await axios(SERVER_URL + "/order/singleorder/" + id, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      }).catch((error) => {
        if (error.response.status === 401) {
          updateAccessToken(orderData);
        }
      });
      setOrder(response.data);
      setorderDate(response.data.createdTime.slice(0, 10));
      gameData(response.data.game);
    };
    orderData();
  }, []);

  /**
   * It takes a gameId as a parameter, sets the userEmail to the email of the user who is logged in,
   * and then sets the gameDetails to the data of the game with the gameId that was passed in.
   * @param gameId - the id of the game that is being displayed
   */
  const gameData = async (gameId) => {
    setuserEmail(parseJwt(localStorage.getItem("access-token")).email);
    const response = await axios(SERVER_URL + "/game/singlegame/" + gameId);
    setGameDetails(response.data);
  };

  return (
    <div>
      <h1 className="cart-header">Order № {order._id}</h1>
      <div className="cart-container">
        <div className="cart-game">
          <div className="cart-game-card">
            <img
              alt=""
              loading=" lazy"
              className="cart-game-image"
              src={SERVER_URL + gameDetails.imageOne}
            ></img>
            <div className="cart-game-information">
              <div className="cart-game-title">
                <NavLink
                  className="cart-game-link"
                  to={"/game/" + gameDetails._id}
                >
                  <h2>{gameDetails.title}</h2>
                </NavLink>
              </div>
              <div className="cart-game-price">
                <h3>
                  <span>Subtotal:</span> {gameDetails.price}
                  <i className="material-icons">attach_money</i>
                </h3>
                <h3>
                  <span>Date:</span> {orderDate}
                </h3>
                <h3>
                  <span>Email:</span> {userEmail}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
