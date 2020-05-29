import React, {useState, useEffect} from 'react'
import { FlatList, Text, ActivityIndicator, StyleSheet, View } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderBtn from '../../components/UI/HeaderBtn';
import OrderItem from '../../components/userRelated/orderItem';
import * as orderActions from '../reduxStore/actions/orderActions';

const OrdersScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(()=> {
    setLoading(true);
    dispatch(orderActions.fetchOrders()).then(()=> {
      setLoading(false);
    });
  }, [dispatch]);

  if(loading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="cyan"/>
      </View>
    )
  }else{
    return <FlatList
              data={orders}
              keyExtractor={item => item.id}
              renderItem={itemData => {
                return <OrderItem date={itemData.item.date.toString()} amount={itemData.item.totalCost} items={itemData.item.items}/>

              }}
            />
  }


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