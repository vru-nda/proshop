import React from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';

import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
import OrderListScreen from './screens/OrderListScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/orders/:orderId' element={<OrderScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentMethodScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/products/:prodId' element={<ProductScreen />} />
            <Route path='/cart/:prodId' element={<CartScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/admin/users' element={<UserListScreen />} />
            <Route path='/admin/products' element={<ProductListScreen />} />
            <Route path='/admin/orders' element={<OrderListScreen />} />
            <Route
              path='/admin/products/:prodId/edit'
              element={<ProductEditScreen />}
            />
            <Route
              path='/admin/users/:userId/edit'
              element={<UserEditScreen />}
            />
            <Route
              path='/admin/orders/:orderId/edit'
              element={<UserEditScreen />}
            />
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
