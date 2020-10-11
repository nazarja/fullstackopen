import loginService from '../services/loginService';

const loginReducer = (state=null, action) => {
    switch(action.type) {
        case 'LOGIN':
            return action.data;
        case 'LOGOUT':
            return action.data;
        case 'SET_USER':
            return action.data;
        default:
            return state;
    };
};

export const loginUser = data => {
    return async dispatch => {
        try {
            const user = await loginService.login(data);
            dispatch({
                type: 'LOGIN',
                data: user
            });
            return user;
        }
        catch (err) {
            dispatch({
                type: 'LOGIN_ERR',
                data: 'Invalid Username or Password'
            });
            setTimeout(() => dispatch({
                type: 'CLEAR_NOTIFICATION',
                data: ''
            }), 3000);
            return err;
        };
    };
};

export const logoutUser = () => {
    return async dispatch => {
        dispatch({
            type: 'LOGOUT',
            data: null
        });
    };
};

export const setUser = user => {
    return async dispatch => {
        dispatch({
            type: 'SET_USER',
            data: user
        });
    };
};


export default loginReducer;