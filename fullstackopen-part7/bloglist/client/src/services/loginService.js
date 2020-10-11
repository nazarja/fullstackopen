import axios from 'axios';

const baseUrl = BACKEND_URL + '/api/login';

const login = async form => {
	const response = await axios.post(baseUrl, form);
	return response.data;
};

export default { login };