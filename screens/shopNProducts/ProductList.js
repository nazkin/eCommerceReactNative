import React, {useEffect, useState, useCallback} from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderBtn from '../../components/UI/HeaderBtn'
import ProductItem from '../../components/productRelated/ProductItem'
import * as cartActions from '../reduxStore/actions/cartActions'
import * as productActions from '../reduxStore/actions/productActions'


const ProductList = (props) => {
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null)
    const productList = useSelector(state =>{
        return state.products.allProducts;
    });
    const dispatch = useDispatch();

    const loadData = useCallback(async ()=> {
      setFetchError(null);
      setLoading(true);
      await dispatch(productActions.fetchProducts());
      setLoading(false);
    }, [dispatch, setLoading, setFetchError])

    useEffect(()=> {
      try{
        loadData();
      } catch(err){
        setFetchError(err.message);
      }  
    }, [dispatch, loadData]);

    useEffect(()=> {
      const willFocusCall = props.navigation.addListener('willFocus', loadData);

      return ()=> willFocusCall.remove();
    }, [loadData]);

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
    if(fetchError){
      return (
      <View style={styles.container}>
        <Text>There was an error when fetching the product</Text>
        <Text>{fetchError}</Text>
        <Button title="Try Again" onPress={loadData} />
      </View>
      )
    }
    if(loading){
      return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="cyan"/>
          </View>
      )
    } else if(!loading && productList.length === 0){
      return (
          <View style={styles.container}>
            <Text>No users or products are found. Welcom ;)</Text>
          </View>
      ) 

    } else{
        return <FlatList data={productList} keyExtractor={item=> item.id} renderItem={renderProductListHandler}/>
    }

      
 
  
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