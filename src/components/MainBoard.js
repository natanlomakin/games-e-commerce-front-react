import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/mainboard.css";

const MainBoard = () => {
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
      <div className="games-grid">
        {games.map((game, ind) => (
          <NavLink key={ind} to={"/game/" + game._id} className="card stacked">
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
        ))}
      </div>
    </div>
  );
};

export default MainBoard;
