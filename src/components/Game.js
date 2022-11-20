import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/game.css";
import { updateAccessToken } from "../utils/updateAccessToken";

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
      console.log(error.response.status);

      if (error.response.status === 401) {
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
        console.log("Game allredy in cart");
        setCartButtonContent("Game allredy in cart");
        setcartButtonState("game-cart-button-block");
        return;
      }
    }

    for (let i = 0; i < wishlistResult.data.length; i++) {
      if (wishlistResult.data[i].game === game._id) {
        setCanAddGameToCart(false);
        return;
      }
    }

    if (canAddGameToCart) {
      console.log(canAddGameToCart);
      addGameToCart();
    }
  };

  const addGameToCart = async () => {
    console.log("Bearer " + localStorage.getItem("access-token"));
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
      console.log(error.response.status);

      if (error.response.status === 401) {
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
    setWishlistModal(true);
  };

  const toggleCartModal = () => {
    setCartModal(!cartModal);
  };

  const toggleWishlistModal = () => {
    setWishlistModal(!wishlistModal);
  };

  return (
    <div className="game-container">
      <div className="game-images">
        <img className="game-feature-image" src={feturedImage} alt=""></img>
        <div className="game-caruosel">
          <img
            className="game-caruosel-images"
            src={SERVER_URL + game.imageOne}
            alt=""
            onClick={(e) => setFeturedImage(e.target.src)}
          ></img>

          <img
            className="game-caruosel-images"
            src={SERVER_URL + game.imageTwo}
            alt=""
            onClick={(e) => setFeturedImage(e.target.src)}
          ></img>
          <img
            className="game-caruosel-images"
            src={SERVER_URL + game.imageThree}
            alt=""
            onClick={(e) => setFeturedImage(e.target.src)}
          ></img>
          <img
            className="game-caruosel-images"
            src={SERVER_URL + game.imageFour}
            alt=""
            onClick={(e) => setFeturedImage(e.target.src)}
          ></img>
          <img
            className="game-caruosel-images"
            src={SERVER_URL + game.imageFive}
            alt=""
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
            {cartModal && (
              <div className="modal">
                <div className="modal-content">
                  Game succesfully added to cart
                  <span>
                    <i
                      type="button"
                      className="material-icons"
                      onClick={toggleCartModal}
                    >
                      close
                    </i>
                  </span>
                </div>
              </div>
            )}
            {wishlistModal && (
              <div className="modal">
                <div className="modal-content">
                  Game succesfully added to wishlist
                  <span>
                    <i
                      type="button"
                      className="material-icons"
                      onClick={toggleWishlistModal}
                    >
                      close
                    </i>
                  </span>
                </div>
              </div>
            )}
            <button className={cartButtonState} onClick={isGameInCart}>
              {cartButtonContent}
              {/* <i className="material-icons">add</i> */}
            </button>{" "}
            <button className={wishlistButtonState} onClick={isGameInWishlist}>
              {wishlistButtonContent}{" "}
              {/* <i className="material-icons">add</i> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
