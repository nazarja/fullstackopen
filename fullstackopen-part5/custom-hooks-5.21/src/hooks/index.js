import { useState } from 'react';
import axios from 'axios';

export const useField = type => {
    const [value, setValue] = useState('')
    const onChange = (event) => setValue(event.target.value);

    return { type, value, onChange };
};

export const useResource = baseUrl => {
    const [resources, setResources] = useState([]);

    const getAll = () => {
        const req = axios.get(baseUrl);
        return req.then(res => setResources([...res.data]));
    };

    const create = obj => {
        const req = axios.post(baseUrl, obj);
        return req.then(res => setResources([...resources].concat(res.data)));
    };

    const service = { getAll, create };
    return [resources, service];
};