import axios from 'axios';

const api = axios.create({
    baseURL: 'busfriendapi-production.up.railway.app'
});

export default api;