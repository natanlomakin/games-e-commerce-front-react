import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/serverUtil";
import { updateAccessToken } from "../utils/updateAccessToken";
import "../static/css/cart.css";
import { NavLink } from "react-router-dom";

const Wishlist = () => {
  const [wishlistDetails, setWishlistDetails] = useState([]);
  const [wishlistGameDetails, setWishlistGameDetails] = useState([]);
  const [isWishlistUpdated, setIsWishlistUpdated] = useState(false);

  useEffect(() => {
    setIsWishlistUpdated(false);
    /**
     * It makes a request to the server to get the wishlist data of the user.
     */
    const wishlistData = async () => {
      const result = await axios(SERVER_URL + "/wishlist/getuserwishlist/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      }).catch((error) => {
        if (error.response.status === 401) {
          updateAccessToken(wishlistData);
        }
      });
      setWishlistDetails(result.data);
    };
    wishlistData();
  }, [isWishlistUpdated]);

  useEffect(() => {
    setIsWishlistUpdated(false);
    const result = [];
    /**
     * It loops through wishlistDetails which contains the game ids, and for each id, it pushes the result of an axios call
     * to an array.
     */
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

  /**
   * It removes a game from the user's wishlist.
   * @param e - the event object which contains
   *            the game id to remove
   */
  const removeGameFromWishlist = async (e) => {
    const result = await axios
      .delete(
        SERVER_URL + "/wishlist/deltefromuserwishlist/" + e.target.value,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("access-token"),
          },
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      )
      .catch((error) => {
        if (error.response.status === 401) {
          updateAccessToken(removeGameFromWishlist(e));
        }
      });
    setIsWishlistUpdated(!isWishlistUpdated);
  };

  /**
   * It removes a game from the user's wishlist,
   * and creats a new cart with that game.
   * @param e - the event object which contains
   *            the game id to remove
   */
  const moveGameToCart = async (e) => {
    const result = await axios
      .post(
        SERVER_URL + "/cart/addgametousercart/",
        {
          user: localStorage.getItem("user"),
          game: e.target.value,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("access-token"),
          },
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      )
      .catch((error) => {
        if (error.response.status === 401) {
          updateAccessToken(moveGameToCart(e));
        }
      })
      .then(removeGameFromWishlist(e));
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
                  className="remove-btn"
                  value={gameDetails._id}
                  onClick={removeGameFromWishlist}
                >
                  Remove
                </button>{" "}
                <button value={gameDetails._id} onClick={moveGameToCart}>
                  Add to cart
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
