import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {useParams} from 'react-router-dom';

import ProductItem from '../components/ProductItem';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

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
