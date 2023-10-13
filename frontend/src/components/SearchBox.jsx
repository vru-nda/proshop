import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHanlder = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form
      className='d-flex my-4 my-lg-0 ms-lg-5'
      onSubmit={submitHanlder}
      inline='true'
    >
      <Form.Control
        type='text'
        name='q'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={(e) => setKeyword('')}
        placeholder='Search Products..'
        className='mr-sm-2 ml-sm-5'
      />
      <Button variant='outline-success' type='submit' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
