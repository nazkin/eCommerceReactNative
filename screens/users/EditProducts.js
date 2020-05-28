import React, {useState, useEffect, useCallback} from 'react';
import { View, Text,TextInput, ScrollView, StyleSheet, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Alert} from 'react-native';
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
    if(title === "" || image === ""|| desc === ""|| price === ""){
      Alert.alert(
        "Incorrectly entered information",
        "A mandary field was left empty",
        [
          {
            text: "Okay",
            
          }
        ]
      )
      return;
    }else if(price < 0.01){
      Alert.alert(
        "Incorrectly entered information",
        "Products price has not been entered correctly",
        [
          {
            text: "Okay",
            
          }
        ]
      )
      return;
    }

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
   <KeyboardAvoidingView
      behavior="height"
      style={styles.kav}
   >
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(val)=>setTitle(val)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Image</Text>
            <TextInput
              style={styles.input}
              value={image}
              onChangeText={(val)=>setImage(val)}
            />
          </View>
          {pID ? null : <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(val)=>setPrice(val)}
              keyboardType="decimal-pad"
            />
          </View>}
          <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={desc}
              onChangeText={(val)=>setDesc(val)}
              autoCapitalize="sentences"
              multiline={true}
              numberOfLines={3}
            />
          </View>
        </View>
      </ScrollView>
     </TouchableWithoutFeedback>
   </KeyboardAvoidingView>


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
  kav:{
    flex: 1
  },
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