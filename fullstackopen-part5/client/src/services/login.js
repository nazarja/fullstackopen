import axios from 'axios';

const baseUrl = '/api/login';

const login = async form => {
	const response = await axios.post(baseUrl, form);
	return response.data;
};

export default { login };