import axios from 'axios'

const client = axios.create({
    baseURL: "http://localhost:8080/api/",
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
});

export default client;

