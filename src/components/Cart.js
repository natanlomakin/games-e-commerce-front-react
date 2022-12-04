import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SERVER_URL } from "../utils/serverUtil";
import { updateAccessToken } from "../utils/updateAccessToken";
import "../static/css/cart.css";

const Cart = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [cartGameDetails, setCartGameDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [iscartUpdated, setIscartUpdated] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    setTotalPrice(0.0);
    /**
     * It gets the user's cart details from the server and sets the state of the cartDetails variable
     * to the result.
     */
    const cartData = async () => {
      const resultCart = await axios(SERVER_URL + "/cart/getusercartgames/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      }).catch((error) => {
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
    /**
     * It loops through the games in the user cart, and for each game, it makes an API call to get more
     * data, and then calculates the total price and sets it to totalPrice variable.
     */
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

  /**
   * It removes a game from the cart.
   * @param e - the event that is triggered when the button is clicked
   */
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
        if (error.response.status === 401) {
          updateAccessToken(removeGameFromCart(e));
        }
      });
    setIscartUpdated(!iscartUpdated);
  };

  /**
   * It creates a new wishlist row in the DB, then calls another function to remove the game from the
   * cart.
   * @param e - the event that is passed to the function
   */
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
        if (error.response.status === 401) {
          updateAccessToken(moveGameToWishlist(e));
        }
      })
      .then(removeGameFromCart(e));
  };

  /**
   * It creates a new order row in the DB according to the cartDetails,
   * then it sends the same cartDetails to the remove cart function,
   * to remove the relevent cart rows in the DB.
   * </code>
   */
  const checkout = async () => {
    setCheckingOut(!checkingOut);
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
          if (error.response.status === 401) {
            updateAccessToken();
          }
        });

      removeGameAfterCheckout(cartDetails);
    }
  };

  /**
   * It's a function that removes a game from the cart after the user has checked out.
   * @param gamesList - an array of objects that contain the game details.
   */
  const removeGameAfterCheckout = async (gamesList) => {
    for (let i = 0; i < gamesList.length; i++) {
      const result = await axios.delete(
        SERVER_URL + "/cart/deletefromcart/" + gamesList[i].game,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("access-token"),
          },
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      );
    }
    setIscartUpdated(!iscartUpdated);
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
        {/* {checkingOut && (
          <div className="checkout-info">
            <form>
              <label>First name</label>
              <br />
              <input></input>
              <br />
              <label>Last name</label>
              <br />
              <input></input>
              <br />
              <label>Email</label>
              <br />
              <input></input>
              <br />
              <label>Name on Card</label>
              <br />
              <input></input>
              <br />
              <label>Credit card number</label>
              <br />
              <input></input>
              <br />
              <label>Exp Month</label>
              <br />
              <input></input>
              <br />
              <label>Exp Year</label>
              <br />
              <input></input>
              <br />
              <label>CVV</label>
              <br />
              <input></input>
            </form>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Cart;
