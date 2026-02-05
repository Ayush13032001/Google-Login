import axios from 'axios';

const api = axios.create({
    baseURL: "https://google-login-2.onrender.com/auth/",
    // withCredentials: true,
});

export const googleAuth = (code) => api.get(`/google/callback?code=${code}`);