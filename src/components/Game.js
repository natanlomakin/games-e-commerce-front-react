import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/game.css";
import { updateAccessToken } from "../utils/updateAccessToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";

const Game = () => {
  const [game, setGame] = useState("");
  const { id } = useParams();
  const [feturedImage, setFeturedImage] = useState("");
  const [cartButtonContent, setCartButtonContent] = useState("Add to cart");
  const [cartButtonState, setcartButtonState] = useState("game-cart-button");
  const [wishlistButtonContent, setWishlistButtonContent] =
    useState("Add to wishlist");
  const [wishlistButtonState, setWishlistButtonState] = useState(
    "game-wishlist-button"
  );
  const [cartModal, setCartModal] = useState(false);
  const [wishlistModal, setWishlistModal] = useState(false);
  const [canAddGameToCart, setCanAddGameToCart] = useState(true);
  const [canAddGameToWishlist, setcanAddGameToWishlist] = useState(true);

  const loginNeededToast = () => toast.error("Please log in");
  const gameInWishlistToast = () => toast.warning("Game alredy in wishlist");
  const gameInCartToast = () => toast.warning("Game alredy in cart");
  const addedSuccessfullyCartToast = () => toast.success("Game added to cart");
  const addedSuccessfullyWishlistToast = () =>
    toast.success("Game added to wishlist");

  useEffect(() => {
    const server_data = async () => {
      const result = await axios(SERVER_URL + "/game/singlegame/" + id);

      setGame(result.data);
      setFeturedImage(SERVER_URL + result.data.imageOne);
    };
    server_data();
  }, []);

  const isGameInCart = async () => {
    const cartResult = await axios(SERVER_URL + "/cart/getusercartgames/", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
      Accept: "application/json",
      "Content-Type": "application/json",
    }).catch((error) => {
      if (error.response.status === 401) {
        loginNeededToast();
        updateAccessToken(isGameInCart);
      }
    });

    const wishlistResult = await axios(
      SERVER_URL + "/wishlist/getuserwishlist/",
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    );

    for (let i = 0; i < cartResult.data.length; i++) {
      if (cartResult.data[i].game === game._id) {
        setCartButtonContent("Game allredy in cart");
        setcartButtonState("game-cart-button-block");
        return;
      }
    }

    for (let i = 0; i < wishlistResult.data.length; i++) {
      if (wishlistResult.data[i].game === game._id) {
        gameInWishlistToast();
        setCanAddGameToCart(false);
        return;
      }
    }

    if (canAddGameToCart) {
      addGameToCart();
    }
  };

  const addGameToCart = async () => {
    const result = await axios.post(
      SERVER_URL + "/cart/addgametousercart/",
      {
        user: localStorage.getItem("user"),
        game: String(game._id),
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    );
    addedSuccessfullyCartToast();
    setCartModal(true);
  };

  const isGameInWishlist = async () => {
    const wishlistResult = await axios(
      SERVER_URL + "/wishlist/getuserwishlist/",
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    ).catch((error) => {
      if (error.response.status === 401) {
        loginNeededToast();
        updateAccessToken(isGameInWishlist);
      }
    });

    const cartResult = await axios(SERVER_URL + "/cart/getusercartgames/", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("access-token"),
      },
      Accept: "application/json",
      "Content-Type": "application/json",
    });

    for (let i = 0; i < wishlistResult.data.length; i++) {
      if (wishlistResult.data[i].game === game._id) {
        setCanAddGameToCart(false);
        setWishlistButtonContent("Game allredy in wishlist");
        setWishlistButtonState("game-wishlist-button-block");
        return;
      }
    }

    for (let i = 0; i < cartResult.data.length; i++) {
      if (cartResult.data[i].game === game._id) {
        gameInCartToast();
        setcanAddGameToWishlist(false);
        return;
      }
    }

    if (canAddGameToWishlist) {
      addGameToWishlist();
    }
  };

  const addGameToWishlist = async () => {
    const result = await axios.post(
      SERVER_URL + "/wishlist/addtouserwishlist/",
      {
        user: localStorage.getItem("user"),
        game: String(game._id),
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    );
    addedSuccessfullyWishlistToast();
    setWishlistModal(true);
  };

  return (
    <div className="game-container">
      <div className="game-images">
        <ToastContainer limit={3} transition={Flip} />
        <img
          className="game-feature-image"
          src={feturedImage}
          alt=""
          loading=" lazy"
        ></img>
        <div className="game-caruosel">
          <img
            className="game-caruosel-images"
            src={SERVER_URL + game.imageOne}
            alt=""
            loading=" lazy"
            onClick={(e) => setFeturedImage(e.target.src)}
          ></img>

          <img
            className="game-caruosel-images"
            src={SERVER_URL + game.imageTwo}
            alt=""
            loading=" lazy"
            onClick={(e) => setFeturedImage(e.target.src)}
          ></img>
          <img
            className="game-caruosel-images"
            src={SERVER_URL + game.imageThree}
            alt=""
            loading=" lazy"
            onClick={(e) => setFeturedImage(e.target.src)}
          ></img>
          <img
            className="game-caruosel-images"
            src={SERVER_URL + game.imageFour}
            alt=""
            loading=" lazy"
            onClick={(e) => setFeturedImage(e.target.src)}
          ></img>
          <img
            className="game-caruosel-images"
            src={SERVER_URL + game.imageFive}
            alt=""
            loading=" lazy"
            onClick={(e) => setFeturedImage(e.target.src)}
          ></img>
        </div>
      </div>
      <div className="game-information">
        <div className="game-details">
          <h1>{game.title}</h1>
          <h3>
            {game.price}
            <i className="material-icons">attach_money</i>
          </h3>
          <h3>
            <span>Description</span> :
          </h3>
          <p>
            {game.description} !! Lorem ipsum dolor sit amet, consectetuer
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna aliquam erat volutpat.Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna aliquam erat volutpat.
          </p>
          <h4>
            <span>Devloper</span> : {game.developer}
          </h4>
          <h4>
            <span>Publisher</span> : {game.publisher}
          </h4>

          <h4>
            <span>Platform</span> : {game.platform}
          </h4>
          <h4>
            <span>Genre</span> : {game.genre}
          </h4>
          <div>
            <div className="game-specs">
              <h3>
                <span>Specifications</span> :
              </h3>
              <h4>
                <span>OS:</span> {game.osVersion}
              </h4>
              <h4>
                <span>CPU:</span> {game.cpu}
              </h4>
              <h4>
                <span>GPU:</span> {game.gpu}
              </h4>
              <h4>
                <span>Memory:</span> {game.memory}
              </h4>
            </div>
            <div className="game-buttons">
              <button
                type="submit"
                className={cartButtonState}
                onClick={isGameInCart}
              >
                {cartButtonContent}
              </button>{" "}
              <button
                type="submit"
                className={wishlistButtonState}
                onClick={isGameInWishlist}
              >
                {wishlistButtonContent}{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
