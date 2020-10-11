import React from 'react';
import Heading from './Heading';
import { ListGroup } from 'react-bootstrap'

const Comments = props => {
    return (
        <div>
            <Heading type="h3" text="Comments" />
            <ListGroup as="ul">
            {
                props.blog.comments.length
                    ? props.blog.comments.map((comment, i) => <ListGroup.Item as="li" key={`${i}-comment`}>{comment}</ListGroup.Item>)
                    : <ListGroup.Item as="li">No Comments Yet, Leave One!</ListGroup.Item>
            }
            </ListGroup>
        </div>
    );
};

export default Comments;