import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";

const Game = () => {
  const [game, setGame] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const server_data = async () => {
      const result = await axios(SERVER_URL + "/game/singlegame/" + id);
      console.log(result.data);
      setGame(result.data);
    };
    server_data();
  }, []);
  /* console.log(SERVER_URL + game.imageOne); */
  return (
    <div className="container text-center">
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-sm-8">
          <img
            src={SERVER_URL + game.imageOne}
            className="card-img-top"
            style={{ width: "500px" }}
            alt="..."
          />
        </div>
        <div className="col-sm-4"></div>
      </div>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">col-sm</div>
        <div className="col-sm">col-sm</div>
      </div>
    </div>
  );
};

export default Game;
