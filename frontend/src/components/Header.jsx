import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {logout} from '../redux/actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {userInfo} = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar bg='dark' expand='lg' variant='dark' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Proshop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <SearchBox />
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
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fa-solid fa-user'></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/users'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/products'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orders'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
