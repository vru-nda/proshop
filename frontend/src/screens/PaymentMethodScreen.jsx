import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {savePaymentMethod} from '../redux/actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentMethodScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {shippingAddress} = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  if (!shippingAddress) navigate('/shipping');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-5' controlId='paymentMethod'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal Or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value={'PayPal'}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value={'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMethodScreen;
