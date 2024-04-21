import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL1 = "http://localhost:8080/api/v1";
// const BASE_URL2 = "http://localhost:8080/api/auth";

const getCookie = (name) => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

const token = Cookies.get("_auth");
export const publicRequest = axios.create({
  baseURL: BASE_URL1,
});

export const userRequest = axios.create({
  baseURL: BASE_URL1,
  headers: { Authorization: `Bearer ${Cookies.get("_auth")}` },
});
