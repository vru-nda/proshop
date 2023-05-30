import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {listProductDetils} from '../redux/actions/productActions';

import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';

import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const {product, loading, error} = productDetails;
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(listProductDetils(params.prodId));
  }, [dispatch, params]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.prodId}?qty=${qty}`);
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
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <Image src={product.image} className='w-100' alt={product.name} />
            </div>
            <div className='col-3'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
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
            </div>
            <div className='col-3'>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
