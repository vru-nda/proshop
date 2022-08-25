import {combineReducers} from 'redux';
import {
  productDetailsReducer,
  productReducer,
} from './reducers/productReducers';

const rootReducer = combineReducers({
  productList: productReducer,
  productDetails: productDetailsReducer,
});

export default rootReducer;
