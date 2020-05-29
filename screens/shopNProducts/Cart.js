import React, {useState, useCallback} from 'react'
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import * as cartActions from '../reduxStore/actions/cartActions'
import * as orderActions from '../reduxStore/actions/orderActions'
import colors from '../../constants/colors'
import CartItem from '../../components/productRelated/cartItem'
/**
* @author
* @function CartScreen
**/
const CartScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const totalPurchaseAmount = useSelector(state => state.cart.sum);

  const itemsInCart = useSelector(state=> {
    const inCartArray = [];
    for(let key in state.cart.inCart){
      inCartArray.push({
        productID: key,
        productTitle: state.cart.inCart[key].title,
        productPrice: state.cart.inCart[key].price,
        productQuantity: state.cart.inCart[key].quantity,
        totalPrice: state.cart.inCart[key].totalPrice
      })
    }
    return inCartArray;
  });
    
  const dispatch = useDispatch();


  const addOrderHandler = useCallback((item, amount)=> {
    setLoading(true);
    setIsError(null);
    try{
      dispatch(orderActions.addOrder(item, amount)).then(()=> setLoading(false));
    } catch(err){
      setIsError(true);
    }
   
  }, [dispatch]);
  
if(loading){
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="cyan"/>
    </View>
  )
}else if(isError){
  Alert.alert("Error placing an order", "Would you like to try again", [
    {
      text: "Okay",
      onPress: ()=> setIsError(null)
    }
  ])
}

 return(
  <View style={styles.container}>
    <FlatList
     data={itemsInCart}
     style={styles.fltLst}
      keyExtractor={item => item.productID}
       renderItem={data => {
        return <CartItem
                  title={data.item.productTitle}
                   price={data.item.productPrice}
                    quantity={data.item.productQuantity}
                     total={data.item.totalPrice}
                      onDelete={()=> {
                        dispatch(cartActions.removerFromCart(data.item.productID))
                      }}
              />}}
    />
    <View style={styles.sumRow}>
      <Text style={styles.total}>Total</Text>
      <Text style={styles.sum}>{totalPurchaseAmount.toFixed(2)} $CAD</Text> 
    </View>
    <Button
      title="Place Order"
      disabled={itemsInCart.length === 0}
      onPress={()=> addOrderHandler(itemsInCart, totalPurchaseAmount)}
     />
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'flex-start',
   alignItems: 'center',
  },
  sumRow:{
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: colors.textMain,
    borderTopWidth: 2,
    paddingVertical: 10,
    backgroundColor: 'whitesmoke'
  },
  fltLst:{
    maxHeight: 500
  },
  total:{
    fontSize: 24,
    color: colors.textMain,
    fontWeight: '700'
  }, 
  sum:{
    fontSize: 20,
    fontWeight: '700',
  }
})
export default CartScreen