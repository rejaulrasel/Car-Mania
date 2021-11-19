import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
// import logo from '../../images/logo.png'


const Header = () => {
    const { user, logout } = useAuth();
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="/home"><h3>CAR-Mania</h3></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/services">Shop</Nav.Link>
                        {user?.email ?
                            <div className="d-flex flex-row me-3">
                                <Nav.Link as={Link} to="/dashboard">
                                    Dashboard
                                </Nav.Link>
                                <button className="btn btn-primary" onClick={logout}>Logout</button>
                            </div>
                            :
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        }

                        <Navbar.Text>
                            Signed in as: <img src={user?.photoURL} width="50px" className="img-fluid" style={{ borderRadius: "50%" }} alt="" /> {user?.displayName}
                        </Navbar.Text>

                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>
    );
};

export default Header;
