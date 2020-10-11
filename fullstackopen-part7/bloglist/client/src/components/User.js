import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Heading from './Heading';
import { ListGroup } from 'react-bootstrap';

const User = props => {
    const user = props.users.find(user => user.id === props.user);

    if (user === undefined) return null;

    return (
        <>
            <Heading text={` Added Blogs by: ${user.name}`} type="h2" />
            <ListGroup as="ul">
                {
                    user.blogs.map(blog => 
                        <Link to={`/blogs/${blog.id}`} key={blog.id}>
                            <ListGroup.Item as="li">{blog.title}</ListGroup.Item>
                        </Link>
                    )
                }
            </ListGroup>
        </>
    );
};

const mapStateToProps = state => {
    return {
        users: state.users
    }
};

export default connect(mapStateToProps, null)(User);