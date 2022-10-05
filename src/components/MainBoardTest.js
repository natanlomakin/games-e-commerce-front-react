import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";
import { Button } from "bootstrap";
import "../static/css/mainboard.css";

const MainBoardTest = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const server_data = async () => {
      const result = await axios(SERVER_URL + "/game/allthegames/");
      setGames(result.data);
    };

    server_data();
  }, []);

  return (
    <div className="mainBoardContainer">
      {games.map((game, ind) => (
        <div key={ind} className="game-grid">
          <NavLink to={"/game/" + game._id} className="card stacked">
            <img
              src={SERVER_URL + game.imageOne}
              alt=""
              className="card__img"
            ></img>
            <div className="card__content">
              <h2 className="card__title">{game.title}</h2>
              <p className="card__price">{game.price}$</p>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default MainBoardTest;
