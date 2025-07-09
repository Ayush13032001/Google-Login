import axios from 'axios';

const api = axios.create({
    baseURL: "https://google-login-io2y.onrender.com/auth/",
    // withCredentials: true,
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);