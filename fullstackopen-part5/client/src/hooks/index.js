import { useState } from 'react';

export const useField = (name, type) => {
    const [value, setValue] = useState('');
    const onChange = ({ target }) => setValue(target.value);

    return { value, onChange, name, type }
};