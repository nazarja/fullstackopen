import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../reducers/blogReducer';
import Heading from './Heading';
import { Form, Button } from 'react-bootstrap';

const CommentForm = props => {

    const handleSubmit = event => {
        event.preventDefault();
        props.createComment({ ...props.blog, comments: [...props.blog.comments, event.target.comment.value] })
    };

    return (
        <div>
            <Heading type="h4" text="Leave a Comment" />
            <Form onSubmit={handleSubmit}>
                <Form.Control type="text" name="comment" />
                <Button type="submit" variant="success">Add Comment</Button>
            </Form>
        </div>
    )
};


const mapDispatchToProps = {
    createComment,
}

export default connect(null, mapDispatchToProps)(CommentForm);