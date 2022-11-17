import axios from "axios";
import { SERVER_URL } from "./serverUtil";

export const updateAccessToken = async (callbackRefreshed) => {
  await axios
    .post(
      SERVER_URL + "/login/refreshaccess/",
      {
        refresh: localStorage.getItem("refresh-token"),
      },
      { "Content-Type": "application/json" }
    )
    .then((response) => {
      console.log(response.data.access);
      localStorage.setItem("access-token", response.data.access);
      callbackRefreshed();
    });
};
