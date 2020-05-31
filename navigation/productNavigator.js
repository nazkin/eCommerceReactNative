import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import {Ionicons} from '@expo/vector-icons';
import {View, Text, SafeAreaView, Button} from 'react-native'
import colors from '../constants/colors'
import ProductListScreen from '../screens/shopNProducts/ProductList';
import ProductDetails from '../screens/shopNProducts/ProductDetail';
import CartScreen from '../screens/shopNProducts/Cart';
import OrderScreen from '../screens/shopNProducts/OrderScreen';
import UserProducts from '../screens/users/UsersProducts';
import EditProducts from '../screens/users/EditProducts';
import AuthenticationScreen from '../screens/users/Auth';

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

const UserStackNav = createStackNavigator({
    User: UserProducts,
    Edit: EditProducts
},{
    navigationOptions:{
        drawerIcon: config => {
            return <Ionicons name="ios-contact" size={25} color={config.tintColor}/>
        }
    },
    defaultNavigationOptions: defaultNavStyles
});

const ShopDrawerNav = createDrawerNavigator({
    Shop: ProductStackNav,
    Orders: OrderStackNav,
    User: UserStackNav
},{
    contentOptions: {
        activeTintColor: colors.accentOrange
    },
    contentComponent: (props)=> {

        return(
            <View style={{flex:1, paddingTop: 40}}>
                <SafeAreaView forceInset={{top: 'always',horizontal: 'never'}}>
                    <DrawerNavigatorItems {...props}/>
                    <Button title="Logout" color = {colors.accentOrange} onPress={()=> {
                        props.navigation.navigate('Auth');
                    }}/>
                </SafeAreaView>
            </View>
        ) 
    }
});

const AuthStackNav = createStackNavigator({
    Authentication: AuthenticationScreen, 
});

const MainNavigator = createSwitchNavigator({
    Auth: AuthStackNav,
    Shop: ShopDrawerNav
});

export default createAppContainer(MainNavigator);