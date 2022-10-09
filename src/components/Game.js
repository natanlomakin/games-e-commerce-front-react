import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/game.css";

const Game = () => {
  const [game, setGame] = useState("");
  const { id } = useParams();
  const [feturedImage, setFeturedImage] = useState("");

  useEffect(() => {
    const server_data = async () => {
      const result = await axios(SERVER_URL + "/game/singlegame/" + id);
      console.log(result.data.imageOne);
      setGame(result.data);
      setFeturedImage(SERVER_URL + result.data.imageOne);
    };
    server_data();
  }, []);
  console.log(feturedImage);
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
          <p>
            {game.description} !! Lorem ipsum dolor sit amet, consectetuer
            adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna aliquam erat volutpat.Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna aliquam erat volutpat.
          </p>
          <h4>Devloper : {game.developer}</h4>
          <h4>Publisher : {game.publisher}</h4>

          <h4>Platform : {game.platform}</h4>
          <div>
            <button>
              Add to cart
              <i className="material-icons">add</i>
            </button>
            <button>
              Add to wishlist <i className="material-icons">add</i>
            </button>
          </div>
        </div>

        <div className="game-specs">
          <h2>Specifications</h2>
          <h4>OS:</h4>
          <p>{game.osVersion}</p>
          <h4>CPU:</h4>
          <p>{game.cpu}</p>
          <h4>GPU:</h4>
          <p>{game.gpu}</p>
          <h4>Memory:</h4>
          <p>{game.memory}</p>
        </div>
      </div>
    </div>
  );
};

export default Game;
