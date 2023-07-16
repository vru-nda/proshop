import {combineReducers} from 'redux';
import {cartReducer} from './reducers/cartReducers';
import {
  orderDetailsReducer,
  orderPayReducer,
  orderReducer,
} from './reducers/orderReducers';
import {
  productDetailsReducer,
  productReducer,
} from './reducers/productReducers';
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const rootReducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateReducer,
  cart: cartReducer,
  orderCreate: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
});

export default rootReducer;
