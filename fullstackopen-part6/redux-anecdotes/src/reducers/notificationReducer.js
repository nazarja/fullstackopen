
const initialNotification = {
    message: ''
}

const reducer = (state=initialNotification, action) => {
    switch(action.type) {
        case 'NEW':
            return {...state, message: action.data};
        case 'VOTE':
            return {...state, message: action.data};
        case 'REMOVE':
            return {...state, message: action.data};
        default:
            return state;
    };
};

export const newNotification = (anecdote, time) => {
    return async dispatch => {
        dispatch({
            type: 'NEW',
            data: `You created: "${anecdote}"`
        });
        setTimeout(() => 
            dispatch({
                type: 'REMOVE',
                data: ''
            }), time);
    };
};

export const voteNotification = (anecdote, time) => {
    return async dispatch => {
        dispatch({
            type: 'VOTE',
            data: `You voted for: "${anecdote}"`
        });
        setTimeout(() => 
            dispatch({
                type: 'REMOVE',
                data: ''
            }), time);
    };
};

export default reducer;