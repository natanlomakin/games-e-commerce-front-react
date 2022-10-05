import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";
import { Button } from "bootstrap";

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
    <div>
      <div className="row">
        {games.map((game, ind) => (
          <div key={ind} className="col-sm-2">
            <div
              className="card text-bg-dark"
              style={{ width: "18rem", margin: "10px" }}
            >
              <img
                src="https://picsum.photos/seed/picsum/200"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text">{game.description}</p>
                <NavLink
                  // href={SERVER_URL + "game/singlegame/" + game._id}
                  className="btn btn-primary"
                  to={"/game/" + game._id}
                >
                  More information
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default MainBoard;
