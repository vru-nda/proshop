import React, {useEffect} from 'react';
import {Button, Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {useNavigate} from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';
import {deleteUser, getUserList} from '../redux/actions/userActions';
import Meta from '../components/Meta';

const UserListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const {userInfo} = useSelector((state) => state.userLogin);
  const {success: successDelete} = useSelector((state) => state.userDelete);
  const {loading, error, users} = userList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      {successDelete && <Message variant={'danger'}>User Deleted!</Message>}
      {error && <Message variant={'danger'}>{error}</Message>}
      {loading ? (
        <Loader />
      ) : users?.length > 0 ? (
        <>
          <Meta title={'Users | Admin'} />
          <h1>Users</h1>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{color: 'green'}}></i>
                    ) : (
                      <i className='fas fa-times' style={{color: 'red'}}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <h2>No User to show</h2>
      )}
    </>
  );
};

export default UserListScreen;
