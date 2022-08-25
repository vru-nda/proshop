import React from 'react';
import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {
  return (
    <Navbar bg='dark' expand='lg' variant='dark' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Proshop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Form className='d-flex ms-5'>
            <Form.Control
              type='search'
              placeholder='Search Products..'
              className='me-2'
              aria-label='Search'
            />
            <Button variant='outline-success'>Search</Button>
          </Form>
          <Nav
            className='ms-auto me-3 my-2 my-lg-0'
            style={{maxHeight: '100px'}}
            navbarScroll
          >
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fa-solid fa-cart-shopping'></i> Cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/signin'>
              <Nav.Link>
                <i className='fa-solid fa-user'></i> Sign In
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
