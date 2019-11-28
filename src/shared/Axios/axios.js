// Dependencies
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export const apiKey = 'a34097a10fd6daf67cb09e71f3d7a0ea';

export default instance;