import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {useSelector} from 'react-redux'

import ProductItem from '../../components/productRelated/ProductItem'


const ProductList = (props) => {

    const productList = useSelector(state =>{
        return state.products.allProducts
    })

    const renderProductListHandler = (itemData)=> {
        return(
          <ProductItem
           image={itemData.item.imageURL}
            title={itemData.item.title}
             price={itemData.item.price}
              onAddToCart={()=> {}}
               onViewProduct={()=> {
                 props.navigation.navigate('ProductOverview', {
                   productID: itemData.item.id, 
                   productTitle: itemData.item.title
                 })
               }}
          />
            
        )
    }

 return(
 
    <FlatList data={productList} keyExtractor={item=> item.id} renderItem={renderProductListHandler}/>
 
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  }
})
export default ProductList