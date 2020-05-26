import React, {useState} from 'react'
import { FlatList, Text } from 'react-native'
import {useSelector} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import OrderItem from '../../components/userRelated/orderItem';

const OrdersScreen = (props) => {
 
  const orders = useSelector(state => state.orders.orders);

 

return <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => {
              return <OrderItem date={itemData.item.date.toString()} amount={itemData.item.totalCost} items={itemData.item.items}/>
              
            }}
        />
}

OrdersScreen['navigationOptions'] = (paramData)=>{
    return {
        title: "Your Orders",
        headerLeft: () => {
            return (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
                     <Item title="Menu" iconName="ios-menu"
                       onPress={()=> {
                         paramData.navigation.toggleDrawer()
                       }}
                     />
                   </HeaderButtons>)
         },
    }
}


export default OrdersScreen