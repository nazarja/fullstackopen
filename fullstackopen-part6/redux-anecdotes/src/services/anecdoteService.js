import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createAnecdote = async content => {
    const object = { content, votes: 0 };
    const reponse = await axios.post(baseUrl, object );
    return reponse.data;
}

const voteAnecdote = async object => {
    const response = await axios.put(`${baseUrl}/${object.id}`, { ...object, votes: object.votes+1 })
    return response.data;
}

export default { getAll, createAnecdote, voteAnecdote };