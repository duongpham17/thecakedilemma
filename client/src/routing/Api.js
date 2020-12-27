import axios from 'axios'

export default axios.create({
    baseURL: process.env.NODE_ENV === "production" ? process.env.REACT_APP_PRODUCTION_PORT : process.env.REACT_APP_DEVELOPMENT_SERVER_PORT,
    withCredentials: true,
    credentials: "include",
});