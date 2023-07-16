import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/order/:orderId' element={<OrderScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentMethodScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/products/:prodId' element={<ProductScreen />} />
            <Route path='/cart/:prodId' element={<CartScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
