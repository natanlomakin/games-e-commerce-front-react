import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/mainboard.css";

const MainBoard = () => {
  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    /**
     * If there is a searchValue,
     * then use the searchgame route to get the game that matches the search value,
     * otherwise use the allthegames route.
     */
    const server_data = async () => {
      const result = searchValue
        ? await axios(SERVER_URL + "/game/searchgame/" + searchValue)
        : await axios(SERVER_URL + "/game/allthegames/");
      setGames(result.data);
    };

    server_data();
  }, [searchValue]);

  /**
   * It takes the value of the search input and sends it to the server, which then returns a list of
   * games that match the search value.
   */
  const searchHandle = async () => {
    const result = await axios(SERVER_URL + "/game/searchgame/" + searchValue);
  };

  return (
    <div className="mainBoardContainer">
      <div className="search-box">
        <form onSubmit={searchHandle}>
          <h3>
            Search:{" "}
            <input
              type="text"
              placeholder="game title"
              autoComplete={"false"}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            ></input>
          </h3>
        </form>
      </div>
      <div className="games-grid">
        {games.map((game, ind) => (
          <NavLink key={ind} to={"/game/" + game._id} className="card stacked">
            <img
              src={SERVER_URL + game.imageOne}
              alt=""
              className="card__img"
            ></img>
            <h4 className="card__badge">{game.genre}</h4>
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
