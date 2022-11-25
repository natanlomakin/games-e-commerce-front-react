import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";
import "../static/css/mainboard.css";

const MainBoard = () => {
  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterGamesBy, setFilterGamesBy] = useState("");
  const [generes, setGeneres] = useState([]);

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

  /* A for loop that is iterating through the games array and pushing the genre of each game into the
  generes array. */
  for (let i = 0; i < games.length; i++) {
    if (!generes.includes(games[i].genre)) {
      generes.push(games[i].genre);
    }
  }

  /**
   * When the user selects a genre, the value of is passed to the function,
   * which then updates the state of the filterGamesBy variable.
   * @param e - the genre value
   */
  const handleFilterGames = (e) => {
    setFilterGamesBy(e);
  };

  /**
   * It takes the value of the search input and sends it to the server, which then returns a list of
   * games that match the search value.
   */
  const searchHandle = async () => {
    const result = await axios(SERVER_URL + "/game/searchgame/" + searchValue);
  };

  return (
    <div className="mainBoardContainer">
      <div className="dropdown-filter-games">
        <button className="dropdown-filter-games-button">Filter by</button>
        <div className="dropdown-filter-games-content">
          <a onClick={() => handleFilterGames("")}>None</a>
          {generes.map((genre, ind) => (
            <a onClick={() => handleFilterGames(genre)} key={ind}>
              {genre}
            </a>
          ))}
        </div>
      </div>
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
        {games && filterGamesBy
          ? games
              .filter((game) => {
                let countGenres = 0;
                if (game.genre === filterGamesBy) {
                  countGenres++;
                  if (countGenres > 0) {
                    return true;
                  } else {
                    return false;
                  }
                }
              })
              .map((game, ind) => (
                <NavLink
                  key={ind}
                  loading=" lazy"
                  to={"/game/" + game._id}
                  className="card stacked"
                >
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
              ))
          : games.map((game, ind) => (
              <NavLink
                key={ind}
                loading=" lazy"
                to={"/game/" + game._id}
                className="card stacked"
              >
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
