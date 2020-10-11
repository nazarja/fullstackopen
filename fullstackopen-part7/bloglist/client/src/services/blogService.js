import axios from 'axios';

const baseURL = BACKEND_URL + '/api/blogs';

// eslint-disable-next-line no-unused-vars
let token = null;

const setToken = newToken => {
	token = `bearer ${newToken}`;
};

const getAll = () => {
	const req = axios.get(baseURL);
	return req.then(res => res.data);
};

const create = form => {
	const req = axios.post(baseURL, form, {
		headers: { Authorization: token }
	});
	return req.then(res => res.data);
};

const update = data => {
	const req = axios.put(`${baseURL}/${data.id}`, data, {
		headers: { Authorization: token }
	});
	return req.then(res => res.data);
};

const remove = id => {
	const req = axios.delete(`${baseURL}/${id}`, {
		headers: { Authorization: token }
	});
	return req.then(res => res.data);
};

const like = obj => {
	obj.likes += 1;
	const req = axios.put(`${baseURL}/${obj.id}`, obj, {
		headers: { Authorization: token }
	});
	return req.then(res => res.data);
};

export default { getAll, create, update, remove, like, setToken };
