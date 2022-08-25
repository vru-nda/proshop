import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {listProductDetils} from '../redux/actions/productActions';

import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';

import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const {product, loading, error} = productDetails;

  const params = useParams();

  useEffect(() => {
    dispatch(listProductDetils(params.prodId));
  }, [dispatch, params]);

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
                  <ListGroup.Item>
                    <Row className='mx-auto'>
                      <Button
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
