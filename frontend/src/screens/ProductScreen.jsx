import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Image, ListGroup, Row} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';

import {
  listProductDetails,
  createProductReview,
} from '../redux/actions/productActions';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import {PRODUCT_CREATE_REVIEW_RESET} from '../redux/constants/productConsts';
import Meta from '../components/Meta';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const {product, loading, error} = productDetails;

  const {userInfo} = useSelector((state) => state.userLogin);

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    success: successReview,
    loading: loadingReview,
    error: errorReview,
  } = productCreateReview;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
    }
    dispatch(listProductDetails(params.prodId));
  }, [dispatch, params, successReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.prodId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.prodId, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product?.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} className='w-100' alt={product.name} />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.avgRating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>Price: ${product.price}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Description: {product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        {product.countInStock <= 0
                          ? 'Out of stock'
                          : 'In stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty.</Col>
                        <Col>
                          <Form.Select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row className='mx-auto'>
                      <Button
                        onClick={addToCartHandler}
                        type='button'
                        className='btn-dark btn-block'
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2 className='mt-4'>Reviews</h2>
              {product.reviews?.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {loadingReview && <Loader />}
                  {errorReview && (
                    <Message variant={'danger'}>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='mb-5' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as={'select'}
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value={''}>Select ...</option>
                          <option value={'1'}> 1 - Poor</option>
                          <option value={'2'}> 2 - Fair</option>
                          <option value={'3'}> 3 - Good</option>
                          <option value={'4'}> 4 - Very Good</option>
                          <option value={'5'}> 5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='mb-5' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as={'textarea'}
                          row={5}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to={'/login'}>Sign in</Link> to write a
                      review.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
