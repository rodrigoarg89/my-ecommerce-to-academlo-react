import React, { useState } from 'react';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CartSidebar from './CartSidebar';

const MyNavbar = () => {

    const navigate = useNavigate();

    const logout = () => {
      localStorage.setItem('token', '');
      navigate('/login')
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submit = () => {
      if(localStorage.getItem('token')) {
        localStorage.setItem('token', '');
        navigate('/login')
      }
    }
    return (
      <>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand to="/" as={Link}>e-commerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto">
                <Nav.Link as={Link} to='/purchases'>Purchases</Nav.Link>
                <Nav.Link onClick={handleShow} >Cart</Nav.Link>
                {/* <Nav.Link onClick={logout}>Logout</Nav.Link> */}
                <Nav.Link as={Link} to="/login" onClick={submit} >{ localStorage.getItem('token') ? 'LOGOUT' : 'LOGIN'}</Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <CartSidebar show={show} handleClose={handleClose}/>

      </>
    );
};

export default MyNavbar;