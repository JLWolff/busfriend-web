import axios from 'axios';

const api = axios.create({
    baseURL: 'https://busfriendapi-production.up.railway.app'
});

export default api;