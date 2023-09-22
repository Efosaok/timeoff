import axios from "axios";

const fetchInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
  headers: {
    react_app: 'true',
  },
  withCredentials: true,
});

export default fetchInstance;
