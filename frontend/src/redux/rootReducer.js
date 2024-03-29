import {combineReducers} from 'redux';
import {cartReducer} from './reducers/cartReducers';
import {
  myOrderListReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  orderReducer,
} from './reducers/orderReducers';
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productDetailsReducer,
  productReducer,
  productTopRatedReducer,
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
  productCreateReview: productCreateReviewReducer,
  productTopRated: productTopRatedReducer,
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
  orderDeliver: orderDeliverReducer,
  myOrdersList: myOrderListReducer,
  orderList: orderListReducer,
});

export default rootReducer;
