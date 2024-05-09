import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL1 = "http://192.168.1.98:8080/api/v1";
// const BASE_URL2 = "http://localhost:8080/api/auth";
// export const registrationToken =
//   "fn6u9reTmuHeWaR81HmfPZ%3AAPA91bG8SbSF_ESzM2weSzvf3WkzZZenf4_EtbgkLXORk45e0sDZKhWJMeQPsAHSfNDuvuMb1mQ2DuYAAWCrIsIE-8XMBkUmrgN4dA1yLeWd_78qA18e6X43TCQLpqxHlRJqaOC2_YV9";

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
