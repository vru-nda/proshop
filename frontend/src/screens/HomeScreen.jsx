import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import ProductItem from '../components/ProductItem';
import Message from '../components/Message';
import Loader from '../components/Loader';

import {listProducts} from '../redux/actions/productActions';
import {useParams} from 'react-router-dom';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {keyword} = useParams();

  const productList = useSelector((state) => state.productList);
  const {products, loading, error} = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductItem product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
