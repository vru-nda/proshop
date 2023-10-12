import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

import {
  listProductDetails,
  updateProduct,
} from '../redux/actions/productActions';
import {PRODUCT_UPDATE_RESET} from '../redux/constants/productConsts';

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {prodId} = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const {loading, error, product} = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET});
      navigate(`/admin/products`);
    } else {
      if (!product?.name || product?._id !== prodId) {
        dispatch(listProductDetails(prodId));
      } else {
        setName(product?.name);
        setBrand(product?.brand);
        setDescription(product?.description);
        setCategory(product?.category);
        setPrice(product?.price);
        setImage(product?.image);
        setCountInStock(product?.countInStock);
      }
    }
  }, [dispatch, navigate, prodId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        'Content-Type': 'multipart/form-data',
      };

      const {data} = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: prodId,
        name,
        description,
        brand,
        category,
        price,
        image,
        countInStock,
      })
    );
  };

  return (
    <>
      <Meta title={'Edit Product | Admin'} />
      <Link to={'/admin/products'} className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message>}
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
            <Form.Group className='mb-5' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-5' controlId='image'>
              {/* <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control> */}
              <Form.Control
                type='file'
                controlid='image-file'
                label='Choose file'
                custom='true'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group className='mb-5' controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-5' controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-5' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-5' controlId='countInStock'>
              <Form.Label>CountInStock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter CountInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
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

export default ProductEditScreen;
