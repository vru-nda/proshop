import {combineReducers} from 'redux';
import {cartReducer} from './reducers/cartReducers';
import {
  myOrderListReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderReducer,
} from './reducers/orderReducers';
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import {
  userDetailsReducer,
  userEditReducer,
  userDeleteReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const rootReducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userEdit: userEditReducer,
  cart: cartReducer,
  orderCreate: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrdersList: myOrderListReducer
});

export default rootReducer;
