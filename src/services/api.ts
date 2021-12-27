import axios from 'axios';

const api = axios.create({
    baseURL: 'https://busfriendapi.herokuapp.com'
});

export default api;