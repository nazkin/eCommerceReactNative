import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

import colors from '../constants/colors'
import ProductListScreen from '../screens/shopNProducts/ProductList';
import ProductDetails from '../screens/shopNProducts/ProductDetail';

const ProductStackNav = createStackNavigator({
    Products: ProductListScreen,
    ProductOverview: ProductDetails
}, {
    defaultNavigationOptions: {
        headerStyle:{
            backgroundColor: colors.primaryLight
        },
        headerTintColor: colors.textMain
    }
});

export default createAppContainer(ProductStackNav);