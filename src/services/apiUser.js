import axios from "axios";
import { SERVER } from "../utils/constants";

export async function getLoginUser(email, password) {
  const { data } = await axios.post(
    `${SERVER}/user/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return data;
}

export async function getLogoutUser() {
  const { data } = await axios.get(`${SERVER}/user/logout`, {
    withCredentials: true,
    params: { _cb: new Date().getTime() },
    responseType: "json",
  });
  return data;
}

export async function getUser() {
  const { data } = await axios.get(`${SERVER}/user/me`, {
    withCredentials: true,
    params: { _cb: new Date().getTime() },
    responseType: "json",
  });

  return data;
}
