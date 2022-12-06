import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { SERVER_URL } from "../utils/serverUtil";
import { updateAccessToken } from "../utils/updateAccessToken";
import "../static/css/cart.css";

const Order = () => {
  const [order, setOrder] = useState("");
  const [gameDetails, setGameDetails] = useState("");
  const [gameId, setGameId] = useState("");
  const { id } = useParams();

  const gameData = async () => {
    const response = await axios(SERVER_URL + "/game/singlegame/" + order.game);
    setGameDetails(response.data);
  };

  useEffect(() => {
    const orderData = async () => {
      const response = await axios(SERVER_URL + "/order/singleorder/" + id, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      setOrder(response.data);
      await setGameId(response.data.game);
    };
    orderData();
    gameData();
  }, []);

  return (
    <div>
      <h1 className="cart-header">Order NO {order._id}</h1>
      <div className="cart-container">
        <div className="cart-game">
          <div className="cart-game-card">
            <img
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
                  {gameDetails.price}
                  <i className="material-icons">attach_money</i>
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
