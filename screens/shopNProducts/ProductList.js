import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderBtn from '../../components/UI/HeaderBtn'
import ProductItem from '../../components/productRelated/ProductItem'
import * as cartActions from '../reduxStore/actions/cartActions'


const ProductList = (props) => {

    const productList = useSelector(state =>{
        return state.products.allProducts;
    });
    const dispatch = useDispatch();

    const renderProductListHandler = (itemData)=> {
        return(
          <ProductItem
          // *****not used in this screen *****
          onEdit={()=>{}}
          onDelete={()=> {}}
           // *****not used in this screen *****
                userScreen={false}
                image={itemData.item.imageURL}
                title={itemData.item.title}
                price={itemData.item.price}

                onAddToCart={()=> {
                  dispatch(cartActions.addToCart(itemData.item));
                }}
               onViewProduct={()=> {
                 props.navigation.navigate('ProductOverview', {
                   productID: itemData.item.id, 
                   productTitle: itemData.item.title
                 });
               }}
          />
            
        )
    }

 return(
 
    <FlatList data={productList} keyExtractor={item=> item.id} renderItem={renderProductListHandler}/>
 
  )
}
ProductList['navigationOptions'] = (paramData)=> {
  return {
      title: 'Search Products',
      headerRight: () => {
         return (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
                  <Item title="Shopping Cart" iconName="ios-cart"
                    onPress={()=> {
                      paramData.navigation.navigate('Cart')
                    }}
                  />
                </HeaderButtons>)
      },
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

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  }
})
export default ProductList