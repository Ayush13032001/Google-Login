import axios from "axios";

const api = axios.create({
  baseURL: "https://google-login-31.onrender.com/auth",
});

export const googleAuth = (code) =>
  api.get(`/google?code=${code}`);
