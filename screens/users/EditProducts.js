import React, {useState, useEffect, useCallback} from 'react';
import { View, Text,TextInput, ScrollView, StyleSheet } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import HeaderBtn from '../../components/UI/HeaderBtn';
import colors from '../../constants/colors';
import * as productActions from '../reduxStore/actions/productActions';

const EditProduct = (props) => {
 
  const pID = props.navigation.getParam('productID') ? props.navigation.getParam('productID') : null;
  const productObject = useSelector(state => state.products.usersProducts.find(prod => prod.id === pID));
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState(pID ? productObject.title : "");
  const [image, setImage] = useState(pID ? productObject.imageURL : "");
  const [price, setPrice] = useState(pID ? productObject.price : "");
  const [desc, setDesc] = useState(pID ? productObject.description : "");
  
  const submitFormHandler = useCallback(() => {
    if(pID){
      dispatch(productActions.updateProduct(pID, title, image,desc));
    }else{
      dispatch(productActions.createProduct(title, image,price,desc));
    }
    props.navigation.goBack();
  }, [dispatch, title, image, price, desc]);

  useEffect(()=> {
    props.navigation.setParams({'submit': submitFormHandler});
  }, [submitFormHandler]);
 

 return(
  <ScrollView>
    <View style={styles.form}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={(val)=>setTitle(val)}/>
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Image</Text>
        <TextInput style={styles.input} value={image} onChangeText={(val)=>setImage(val)}/>
      </View>
      {pID ? null : <View style={styles.formControl}>
        <Text style={styles.label}>Price</Text>
        <TextInput style={styles.input} value={price} onChangeText={(val)=>setPrice(val)}/>
      </View>}
      <View style={styles.formControl}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} value={desc} onChangeText={(val)=>setDesc(val)}/>
      </View>
    </View>
  </ScrollView>

  )
}

EditProduct['navigationOptions'] = (paramData)=> {
  const infoSubmit = paramData.navigation.getParam('submit')
  return {
    title: paramData.navigation.getParam('productID') ? 'Edit Info' : 'Create New Product',
    headerRight: () => {
      return (<HeaderButtons HeaderButtonComponent={HeaderBtn}>
               <Item title="Save" iconName="ios-save"
                 onPress={infoSubmit}
               />
             </HeaderButtons>)
   },
  }
}
const styles = StyleSheet.create({
  form:{
    margin: 20
  },
  formControl:{
    width: '100%'
  },
  label:{
    marginVertical: 10,
    fontSize: 16,
    color: colors.accentOrange,
    fontWeight: '700'
  },
  input:{
    paddingHorizontal: 4,
    paddingVertical: 6,
    borderBottomColor: '#cdcdcd',
    borderBottomWidth: 2
  },

})
export default EditProduct