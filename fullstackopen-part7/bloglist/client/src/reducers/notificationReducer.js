
const notificationReducer = (state={message: '', type: null}, action) => {
    switch(action.type) {
        case 'LOGIN_ERR':
            return {...state, message: action.data, type: 'danger'};
        case 'CLEAR_NOTIFICATION':
            return {...state, message: action.data, type: null};
        default:
            return state;
    };
};

export const loginErrorNotification = () => {
    return async dispatch => {
        dispatch({
            type: 'LOGIN_ERR',
            data: 'Invalid Username or Password'
        });
    };
};

export const clearNotification = () => {
    return async dispatch => {
        dispatch({
            type: 'CLEAR_NOTIFICATION',
            data: ''
        });
    };
};

export default notificationReducer;