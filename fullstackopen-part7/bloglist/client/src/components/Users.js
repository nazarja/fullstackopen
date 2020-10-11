import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Heading from './Heading';
import { Table } from 'react-bootstrap';

const Users = props => {

    const displayUsers = () => {
        if (!props.users.length) return null;
        else {
            return props.users.map(user =>
                <tr key={user.id}>
                    <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                    <td>{user.blogs.length}</td>
                </tr>
            );
        };
    };

    return (
        <>
            <Heading text="All Users" type="h2" />
            <Table striped bordered hover size="md">
                <thead>
                    <tr>
                        <td>Author</td>
                        <td>Blogs Created</td>
                    </tr>
                </thead>
                <tbody>
                    {displayUsers()}
                </tbody>
            </Table>
        </>
    );
};

const mapStateToProps = state => {
    return {
        users: state.users
    };
};

export default connect(mapStateToProps, null)(Users);