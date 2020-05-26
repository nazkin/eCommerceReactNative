import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'

import {useSelector, useDispatch} from 'react-redux'
import colors from '../../constants/colors'
import * as cartActions from '../reduxStore/actions/cartActions'
/**
* @author
* @function ProductDetail
**/
const ProductDetail = (props) => {
    const ID = props.navigation.getParam('productID');
    const productInfo = useSelector(state => state.products.allProducts.find(item => item.id === ID))
    const dispatch = useDispatch();
 return(
  <View style={styles.container}>
      <Image style={styles.image} source={{uri: productInfo.imageURL}}/> 
    
    <View style={styles.priceRow}>
        <Text style={styles.name}>{productInfo.title}</Text>
        <Text style={styles.cost}>CAD$ {productInfo.price}</Text>
    </View>
    <Text style={styles.desc}>{productInfo.description}</Text>
    <Button title="Add to Cart"
      onPress={()=> {
        return dispatch(cartActions.addToCart(productInfo))
      }}
    />
  </View>
  )
}
ProductDetail['navigationOptions'] = (paramData)=> {
    return {
        title: paramData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'flex-start',
   alignItems: 'center',
  }, 
  image: {
      width: '100%',
      height: 240
  },
  priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginVertical: 20
  },
  name:{
    fontSize: 24,
    fontWeight: '700',
    borderBottomColor: colors.accentOrange,
    borderBottomWidth: 4
  },
  cost:{
    fontSize: 20,
    padding: 5,
    backgroundColor: colors.primaryLight,
    borderTopColor: colors.accentOrange,
    borderTopWidth: 2
  },
  desc:{
      width: '70%',
      backgroundColor: '#cdcdcd',
      fontSize: 18,
      minHeight: 120,
      paddingBottom: 30,
      paddingHorizontal: 10,
      borderBottomWidth: 2,
      borderBottomColor: colors.textMain, 
      marginBottom: 60
  }
})
export default ProductDetail