import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SERVER_URL } from "../utils/serverUtil";
import { updateAccessToken } from "../utils/updateAccessToken";
import "../static/css/cart.css";
import { parseJwt } from "../utils/tokenDecode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";

const Cart = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const [cartGameDetails, setCartGameDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [iscartUpdated, setIscartUpdated] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [cardProvider, setCardProvider] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [paymentId, setPaymentId] = useState(0);
  const noGamesInCartToast = () => toast.error("Your cart is empty");

  const user = parseJwt(localStorage.getItem("access-token"));

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

  const handlePaymentInformation = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(
        SERVER_URL + "/payment/adduserpaymentdetails/",
        {
          user: localStorage.getItem("user"),
          provider: cardProvider,
          card_number: cardNumber,
          expiration_month: expirationMonth,
          expiration_year: expirationYear,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("access-token"),
          },
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      )
      .then((res) => setPaymentId(res.data._id));
    cartDetails.length ? handleCheckoutForm() : noGamesInCartToast();
  };

  const handleCheckoutForm = async () => {
    for (let i = 0; i < cartDetails.length; i++) {
      const response = await axios
        .post(
          SERVER_URL + "/order/adduserorder/",
          {
            user: localStorage.getItem("user"),
            game: `${cartDetails[i].game}`,
            total: `${totalPrice}`,
            payment: paymentId,
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
      displayHideCheckoutForm();
      removeGameAfterCheckout(cartDetails);
    }
  };

  const displayHideCheckoutForm = () => {
    setCheckingOut(!checkingOut);
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
        <ToastContainer limit={3} transition={Flip} />
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
        {checkingOut ? (
          <div className="row">
            <div className="col-75">
              <div className="container">
                <form onSubmit={handlePaymentInformation}>
                  <div className="row">
                    <div className="col-50">
                      <h3>Billing Address</h3>
                      <label for="fname">
                        <i className="fa fa-user"></i> Full Name
                      </label>
                      <input
                        value={user.first_name + " " + user.last_name}
                        type="text"
                        id="fname"
                        placeholder="John M. Doe"
                      />
                      <label for="email">
                        <i className="fa fa-envelope"></i> Email
                      </label>
                      <input
                        value={user.email}
                        type="text"
                        id="email"
                        placeholder="john@example.com"
                      />
                      <label for="adr">
                        <i className="fa fa-address-card-o"></i> Address
                      </label>
                      <input
                        type="text"
                        id="adr"
                        placeholder="542 W. 15th Street"
                      />
                      <label for="city">
                        <i className="fa fa-institution"></i> City
                      </label>
                      <input type="text" id="city" placeholder="New York" />
                      <div className="row">
                        <label for="state">State</label>
                        <input type="text" id="state" placeholder="NY" />
                        <label for="zip">Zip</label>
                        <input type="text" id="zip" placeholder="10001" />
                      </div>
                    </div>
                    <div className="col-50">
                      <h3>Payment</h3>
                      <label for="fname">Accepted Cards</label>
                      <div className="icon-container">
                        <i className="fa fa-cc-visa"></i>{" "}
                        <i className="fa fa-cc-amex"></i>{" "}
                        <i className="fa fa-cc-mastercard"></i>{" "}
                        <i className="fa fa-cc-discover"></i>
                      </div>
                      <label for="cname">Provider</label>
                      <input
                        onChange={(e) => setCardProvider(e.target.value)}
                        type="text"
                        id="provider"
                        placeholder="visa"
                      />
                      <label for="ccnum">Credit card number</label>
                      <input
                        onChange={(e) => setCardNumber(e.target.value)}
                        type="text"
                        id="ccnum"
                        placeholder="1111-2222-3333-4444"
                      />
                      <label for="expmonth">Exp Month</label>
                      <input
                        onChange={(e) => setExpirationMonth(e.target.value)}
                        type="text"
                        id="expmonth"
                        placeholder="09"
                      />
                      <div className="row">
                        <label for="expyear">Exp Year</label>
                        <input
                          onChange={(e) => setExpirationYear(e.target.value)}
                          type="text"
                          id="expyear"
                          placeholder="18"
                        />
                        <label for="cvv">CVV</label>
                        <input type="text" id="cvv" placeholder="352" />
                      </div>
                    </div>
                  </div>

                  <div className="form-buttons">
                    <button type="button" onClick={displayHideCheckoutForm}>
                      Cancel
                    </button>
                    <div>
                      <h2>
                        <span>Total: </span>
                        {totalPrice}
                        <i className="material-icons">attach_money</i>
                      </h2>
                    </div>
                    <button type="submit">Finish order</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart-order-information">
            <h2>Summery</h2>
            <h3>
              <span>Total: </span>
              {totalPrice}
              <i className="material-icons">attach_money</i>
            </h3>
            <button value={cartGameDetails} onClick={displayHideCheckoutForm}>
              CHECK OUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
