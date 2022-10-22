import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/cart.css";
import { NavLink } from "react-router-dom";

const Wishlist = () => {
  const [wishlistDetails, setWishlistDetails] = useState([]);
  const [wishlistGameDetails, setWishlistGameDetails] = useState([]);
  const [isWishlistUpdated, setIsWishlistUpdated] = useState(false);

  useEffect(() => {
    setIsWishlistUpdated(false);
    const wishlistData = async () => {
      const result = await axios(SERVER_URL + "/wishlist/getuserwishlist/", {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      setWishlistDetails(result.data);
    };
    wishlistData();
  }, [isWishlistUpdated]);

  useEffect(() => {
    setIsWishlistUpdated(false);
    const result = [];
    const gameData = async () => {
      for (let i = 0; i < wishlistDetails.length; i++) {
        result.push(
          (
            await axios(
              SERVER_URL + "/game/singlegame/" + wishlistDetails[i].game
            )
          ).data
        );
      }
      setWishlistGameDetails(result);
    };
    gameData();
  }, [wishlistDetails]);

  const removeGameFromWishlist = async (e) => {
    console.log(e.target);
    const result = await axios.delete(
      SERVER_URL + "/wishlist/deltefromuserwishlist/" + e.target.value,
      {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    );
    /* window.location.reload(); */
    setIsWishlistUpdated(true);
  };

  return (
    <div>
      <h1 className="cart-header">My Wishlist</h1>
      <div className="cart-container">
        <div className="cart-game">
          {wishlistGameDetails.map((gameDetails, ind) => (
            <div key={ind} className="cart-game-card">
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
                <button
                  value={gameDetails._id}
                  onClick={removeGameFromWishlist}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
