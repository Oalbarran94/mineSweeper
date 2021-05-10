import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://minesweeper-api-java.herokuapp.com/'
});

export default axiosClient;