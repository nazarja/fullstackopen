import blogService from '../services/blogService';
import usersService from '../services/usersService';

const sort = state => state.sort((a, b) => (a.likes < b.likes) ? 1 : -1);

const blogReducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return sort(action.data);
        case 'CREATE_BLOG':
            return sort([...state, action.data]);
        case 'LIKE_BLOG':
            return sort(state.map(blog => blog.id !== action.data.id ? blog : action.data));
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data.id);
        case 'CREATE_COMMENT':
            return state.map(blog => blog.id !== action.data.id ? blog : action.data);
        default:
            return state;
    };
};

export const initialiseBlogs = () => {
    return async dispatch => {
        const response = await blogService.getAll();
        dispatch({
            type: 'INIT_BLOGS',
            data: response
        });
    };
};

export const createBlog = data => {
    return async dispatch => {
        const response = await blogService.create(data);
        dispatch({
            type: 'CREATE_BLOG',
            data: response
        });
        const response2 = await usersService.getAll();
        dispatch({
            type: 'USER_CREATED_BLOG',
            data: response2
        });
    };
};

export const likeBlog = data => {
    return async dispatch => {
        const response = await blogService.like(data);
        dispatch({
            type: 'LIKE_BLOG',
            data: response
        });
    };
};

export const removeBlog = data => {
    return async dispatch => {
        await blogService.remove(data.id);
        dispatch({
            type: 'REMOVE_BLOG',
            data: data
        });
    };
};

export const createComment = data => {
    return async dispatch => {
        const response = await blogService.update(data);
        dispatch({
            type: 'CREATE_COMMENT',
            data: response
        });
    };
};

export default blogReducer;