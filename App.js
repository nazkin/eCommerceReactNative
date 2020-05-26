import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers } from 'redux';
import {Provider} from 'react-redux';

import ProductNavigator from './navigation/productNavigator';

import productReducer from './screens/reduxStore/reducers/productReducers';
import cartReducer from './screens/reduxStore/reducers/cartReducers';
import orderReducer from './screens/reduxStore/reducers/orderReducers';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ProductNavigator />
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
