import React, {useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import ProductItem from '../components/ProductItem';

import {listProducts} from '../redux/actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {keyword, pageNum = 1} = useParams();

  const productList = useSelector((state) => state.productList);
  const {products, loading, error, pages, page} = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNum));
  }, [dispatch, keyword, pageNum]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductItem product={product} />
              </Col>
            ))}
          </Row>
          <Paginate keyword={keyword} pages={pages} page={page} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
