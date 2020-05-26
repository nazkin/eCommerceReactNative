import React from 'react'
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {Ionicons} from '@expo/vector-icons';

import colors from '../constants/colors'
import ProductListScreen from '../screens/shopNProducts/ProductList';
import ProductDetails from '../screens/shopNProducts/ProductDetail';
import CartScreen from '../screens/shopNProducts/Cart';
import OrderScreen from '../screens/shopNProducts/OrderScreen';

const defaultNavStyles = {
        headerStyle:{
            backgroundColor: colors.primaryLight
        },
        headerTintColor: colors.textMain
}

const ProductStackNav = createStackNavigator({
    Products: ProductListScreen,
    ProductOverview: ProductDetails,
    Cart: CartScreen
}, {
    navigationOptions:{
        drawerIcon: config => {
            return <Ionicons name="ios-home" size={25} color={config.tintColor}/>
        }
    },
    defaultNavigationOptions: defaultNavStyles
});

const OrderStackNav = createStackNavigator({
    Orders: OrderScreen
},{
    navigationOptions:{
        drawerIcon: config => {
            return <Ionicons name="ios-list" size={25} color={config.tintColor}/>
        }
    },
    defaultNavigationOptions: defaultNavStyles
});

const ShopDrawerNav = createDrawerNavigator({
    Shop: ProductStackNav,
    Orders: OrderStackNav
},{
    contentOptions: {
        activeTintColor: colors.accentOrange
    }
})

export default createAppContainer(ShopDrawerNav);