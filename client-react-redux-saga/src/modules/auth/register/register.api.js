import { apiUrl } from "../../../config";

import axios from "axios";

const api = {
  /**
   * Remember !! for production ALWAYS USE https connection.
   */
  register(email, password, username = null) {
    console.log("post register.. e:", email, apiUrl);
    return axios.post(apiUrl + "/register", {
      email,
      password,
      username,
    });
  },
};

export default api;
