import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Col, Image, ListGroup, Row} from 'react-bootstrap';
import {PayPalButton} from 'react-paypal-button-v2';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';
import {getOrderDetails, payOrderAction} from '../redux/actions/orderActions';
import {ORDER_PAY_RESET} from '../redux/constants/orderConsts';
import {addDecimals} from '../utils/utilities';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const {order, error, loading} = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {success: successPay, loading: loadingPay} = orderPay;

  if (!loading) {
    // calculate prices
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPaypalScript = async () => {
      const {data: clientId} = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    // show order details screen for both the cases
    if (!order || successPay || order?._id !== params.orderId) {
      dispatch({type: ORDER_PAY_RESET});
      dispatch(getOrderDetails(params.orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, params, successPay]);

  const successPaymentHandler = async (paymentResult) => {
    dispatch(payOrderAction(params.orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant={'error'} />
  ) : (
    <>
      <h1>{`Order #${order?._id}`}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order?.user?.name}{' '}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${order?.user?.email}`}>
                  {order?.user?.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress.address}, {order?.shippingAddress.city},{' '}
                {order?.shippingAddress.postalCode},{' '}
                {order?.shippingAddress.country}
              </p>
              {order?.isDelievered ? (
                <Message variant='success'>
                  Delievered on: {order?.delieveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delievered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant='success'> Paid on: {order?.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message>Order is empty.</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order?.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Order Summery</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order?.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order?.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order?.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order?.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
