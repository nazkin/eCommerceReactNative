import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderBtn from '../../components/UI/HeaderBtn'
import ProductItem from '../../components/productRelated/ProductItem'
import * as productActions from '../reduxStore/actions/productActions'


const UserProducts = (props) => {
    const uProducts = useSelector(state => state.products.usersProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id)=> {
        props.navigation.navigate('Edit', {productID: id})
    }

 return <FlatList
            data={uProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
             // *****not used in this screen *****
                                        onViewProduct={()=>{}}
                                        onAddToCart={()=>{}}
             // *****not used in this screen *****
                                        title={itemData.item.title}
                                        price={itemData.item.price}
                                        image={itemData.item.imageURL}
                                        userScreen={true}
                                        onEdit={()=>{editProductHandler(itemData.item.id)}}
                                        onDelete={()=> dispatch(productActions.deleteProduct(itemData.item.id))}

                                    />} 
        />

  
}
UserProducts['navigationOptions'] = (paramData)=> {
    return {
        title: 'Your Products',
        headerLeft: () => {
            return (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
                     <Item title="Menu" iconName="ios-menu"
                       onPress={()=> {
                         paramData.navigation.toggleDrawer()
                       }}
                     />
                   </HeaderButtons>)
         },
         headerRight: () => {
            return (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
                     <Item title="Add Product" iconName="ios-add"
                       onPress={()=> {
                         paramData.navigation.navigate('Edit');
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
export default UserProducts