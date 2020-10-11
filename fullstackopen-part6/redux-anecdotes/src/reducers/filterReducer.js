
const filterReducer = (state='', action) => {
    if (action.type === 'FILTER') {
        return action.data;
    }
    return state;
};

export const filterText = (text) => {
    return {
        type: 'FILTER',
        data: text
    }
}

export default filterReducer;