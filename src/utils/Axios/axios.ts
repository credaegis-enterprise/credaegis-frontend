import axios from "axios";


const myInstance = axios.create({
    baseURL: "http://localhost:3001/",
    withCredentials: true,
    });

export default myInstance;