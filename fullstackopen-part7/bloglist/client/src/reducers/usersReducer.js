import usersService from '../services/usersService';

const usersReducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT_USER':
            return [...action.data];
        case 'USER_CREATED_BLOG':
            return [...action.data];
        default:
            return state;
    };
};

export const initialiseUsers = () => {
    return async dispatch => {
        const response = await usersService.getAll();
        dispatch({
            type: 'INIT_USER',
            data: response
        });
    };
};

export default usersReducer;