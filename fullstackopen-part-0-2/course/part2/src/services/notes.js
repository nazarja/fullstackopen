import axios from 'axios';
const baseUrl = '/api/notes';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
}

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data);
}

const create = newObject => {
    const config = {
        headers: { Authorization: token },
    };
    const request = axios.post(baseUrl, newObject, config);
    return request.then(res => res.data);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(res => res.data);
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(res => res.data);
}

export default {
    getAll,
    create,
    update,
    remove,
    setToken
};