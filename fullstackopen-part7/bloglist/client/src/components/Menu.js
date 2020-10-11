import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../reducers/loginReducer';
import { Nav, Navbar, Button, Form } from 'react-bootstrap';

const Menu = props => {

    const handleLogout = () => {
        window.localStorage.clear();
        props.logoutUser();
    }

    return (

        <Navbar id="menu" bg="primary" variant="dark">
            <Nav>
                <Link className="link" to="/">Blogs</Link>
                <Link className="link" to="/users">Users</Link>
                {
                    props.user
                        ? (
                            <Form inline className="logout">
                                <Nav.Link>
                                    <Nav.Item>{ props.user.username }</Nav.Item>
                                </Nav.Link>
                                <Button variant="danger" onClick={handleLogout}>Logout</Button>
                            </Form>
                        )
                        : null
                }
            </Nav>
        </Navbar>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = {
    logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);