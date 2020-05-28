import React from 'react';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import ProductNavigator from './navigation/productNavigator';

import productReducer from './screens/reduxStore/reducers/productReducers';
import cartReducer from './screens/reduxStore/reducers/cartReducers';
import orderReducer from './screens/reduxStore/reducers/orderReducers';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <ProductNavigator />
    </Provider>

  );
}

