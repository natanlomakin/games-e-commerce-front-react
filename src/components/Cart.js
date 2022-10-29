import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/cart.css";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [cartGameDetails, setCartGameDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [iscartUpdated, setIscartUpdated] = useState(false);
  const [isGameInWishlist, setisGameInWishlist] = useState(false);

  useEffect(() => {
    setTotalPrice(0.0);
    const cartData = async () => {
      const resultCart = await axios(SERVER_URL + "/cart/getusercartgames/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      setCartDetails(resultCart.data);
    };
    cartData();
  }, [iscartUpdated]);

  useEffect(() => {
    setIscartUpdated(false);
    let total = 0.0;
    const resultGame = [];
    const gameData = async () => {
      for (let i = 0; i < cartDetails.length; i++) {
        resultGame.push(
          (await axios(SERVER_URL + "/game/singlegame/" + cartDetails[i].game))
            .data
        );
        total = total + Number(resultGame[i].price);
        setTotalPrice(total);
      }
      setCartGameDetails(resultGame);
    };

    gameData();
  }, [cartDetails]);

  const removeGameFromCart = async (e) => {
    console.log(e.target);
    const result = await axios.delete(
      SERVER_URL + "/cart/deletefromcart/" + e.target.value,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    );
    /* window.location.reload(); */
    setIscartUpdated(true);
  };

  const moveGameToWishlist = async (e) => {
    const result = await axios
      .post(
        SERVER_URL + "/wishlist/addtouserwishlist/",
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
      .then(removeGameFromCart(e));
  };

  return (
    <div>
      <h1 className="cart-header">My Cart</h1>
      <div className="cart-container">
        <div className="cart-game">
          {cartGameDetails.map((gameDetails, ind) => (
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
                  onClick={removeGameFromCart}
                >
                  Remove
                </button>
                <button value={gameDetails._id} onClick={moveGameToWishlist}>
                  Move to wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-order-information">
          <h2>Summery</h2>
          <h3>
            <span>Total: </span>
            {totalPrice}
            <i className="material-icons">attach_money</i>
          </h3>
          <button>CHECK OUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
