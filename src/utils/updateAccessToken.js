import axios from "axios";
import { SERVER_URL } from "./serverUtil";

/**
 * It takes a callback function as an argument, and then calls that callback function after it has
 * updated the access token.
 * @param callbackRefreshed - This is a function that is called after the access token is refreshed.
 */
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
