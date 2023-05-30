import {combineReducers} from 'redux';
import {
  productDetailsReducer,
  productReducer,
} from './reducers/productReducers';
import {cartReducer} from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
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
});

export default rootReducer;
