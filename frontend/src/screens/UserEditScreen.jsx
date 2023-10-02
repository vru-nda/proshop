import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { getUserDetails, updateUser } from '../redux/actions/userActions';
import { USER_UPDATE_RESET } from '../redux/constants/userConsts';

const UserEditScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userId} = useParams();

  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState('');

  const userDetails = useSelector((state) => state.userDetails);
  const {loading, error, user} = userDetails;

  const userEdit = useSelector((state) => state.userEdit);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: sucessUpdate,
  } = userEdit;

  useEffect(() => {
    if (sucessUpdate) {
      dispatch({type: USER_UPDATE_RESET});
      navigate('/admin/users');
    } else {
      if (!user?.name || user?._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user?.name);
        setEmail(user?.email);
        setIsAdmin(user?.isAdmin);
      }
    }
  }, [dispatch, user, userId, sucessUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id: userId, name, email, isAdmin}));
  };

  return (
    <>
      <Link to={'/admin/users'} className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant={'danger'}>{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant={'danger'}>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-5' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-5' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-5' controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                checked={isAdmin}
                label='Is Admin'
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
