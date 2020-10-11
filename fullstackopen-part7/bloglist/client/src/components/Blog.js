import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import Heading from './Heading';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { Button } from 'react-bootstrap';

let Blog = props => {
    const blog = props.blogs.find(blog => blog.id === props.blog);

    const handleClick = (type, blog) => () => {
        if (type === 'like') props.likeBlog(blog);
        else {
            props.removeBlog(blog);
            props.history.push('/');
        };
    };

    return (
        <>
            {
                blog
                    ? (
                        <div>
                            <Heading text={`Blog Title: ${blog.title}`} type="h3" />
                            <p>
                                Likes: {blog.likes}<br />
                                Added by: {blog.user.name}<br />
                                More Info: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
                            </p>
                            <div>
                                <Button variant="primary" onClick={handleClick('like', blog)}>Like</Button>
                                {
                                    blog.user.username === props.user.username
                                        ? <Button variant="danger" onClick={handleClick('delete', blog)}>Delete</Button>
                                        : null
                                }
                            </div>
                            <hr />
                            <CommentForm blog={blog}/>
                            <hr />
                            <Comments blog={blog} />
                        </div>
                    )
                    : null
            }
        </>
    );
};

const mapStateToProps = state => {
    return {
        blogs: state.blogs,
        user: state.user,
    };
};

const mapDispatchToProps = {
    likeBlog,
    removeBlog
};

Blog = withRouter(Blog);
export default connect(mapStateToProps, mapDispatchToProps)(Blog);