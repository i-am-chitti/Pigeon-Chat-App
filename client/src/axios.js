import axios from 'axios';

// make HTTP requests to API
const instance = axios.create({
    baseURL: 'http://localhost:9000'
});

export default instance;