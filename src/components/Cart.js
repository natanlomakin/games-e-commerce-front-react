import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { SERVER_URL } from "../utils/serverUtil";
import { updateAccessToken } from "../utils/updateAccessToken";
import "../static/css/cart.css";

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
      }).catch((error) => {
        console.log(error.response.status);

        if (error.response.status === 401) {
          updateAccessToken(cartData);
        }
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
    const result = await axios
      .delete(SERVER_URL + "/cart/deletefromcart/" + e.target.value, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      })
      .catch((error) => {
        console.log(error.response.status);

        if (error.response.status === 401) {
          updateAccessToken(removeGameFromCart(e));
        }
      });
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
      .catch((error) => {
        console.log(error.response.status);

        if (error.response.status === 401) {
          updateAccessToken(moveGameToWishlist(e));
        }
      })
      .then(removeGameFromCart(e));
    console.log(result);
  };

  const checkout = async () => {
    console.log();
    for (let i = 0; i < cartDetails.length; i++) {
      const response = await axios
        .post(
          SERVER_URL + "/order/adduserorder/",
          {
            user: localStorage.getItem("user"),
            cart: `${cartDetails[i]._id}`,
            total: `${totalPrice}`,
            payment: "2",
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
          console.log(error);
          if (error.response.status === 401) {
            updateAccessToken();
          }
        });

      removeGameAfterCheckout(cartDetails);
    }
  };

  const removeGameAfterCheckout = async (gamesList) => {
    for (let i = 0; i < gamesList.length; i++) {
      const result = await axios
        .delete(SERVER_URL + "/cart/deletefromcart/" + gamesList[i].game, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("access-token"),
          },
          Accept: "application/json",
          "Content-Type": "application/json",
        })
        .catch((error) => {
          console.log(error.response.status);

          /*  if (error.response.status === 401) {
            updateAccessToken(removeGameFromCart(e));
          } */
        });
    }
    setIscartUpdated(true);
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
          <button value={cartGameDetails} onClick={checkout}>
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
