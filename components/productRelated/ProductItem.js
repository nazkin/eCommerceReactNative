import React from 'react'
import { View, Text,ImageBackground, StyleSheet, Button, TouchableOpacity } from 'react-native'
import colors from '../../constants/colors';

const ProductItem = (props) => {

  let buttons;
  if(props.userScreen){
    buttons = <View style={styles.btnRow}>
                <Button  title="Edit" onPress={props.onEdit}/>
                <Button  color={colors.accentOrange} title="Delete" onPress={props.onDelete}/>
              </View>
  }else{
    buttons = <View style={styles.btnRow}>
                <Button  title="Add to Cart" onPress={props.onAddToCart}/>
                <Button  color={colors.accentOrange}title="View Details" onPress={props.onViewProduct}/>
              </View>
  }

 return(
  <View style={styles.container}>
    <View style={styles.titleRow}>
        <Text style={styles.pTitle}>{props.title}</Text>
        <Text style={styles.pPrice}>${props.price.toFixed(2)}</Text>
    </View>
    <TouchableOpacity style={styles.img} onPress={props.userScreen ? props.onEdit:props.onViewProduct}>
        <ImageBackground style={{width: '100%', height: '100%'}} source={{uri: props.image }}/>    
    </TouchableOpacity>
    {/* <View style={styles.btnRow}>
        <Button  title="Add to Cart" onPress={props.onAddToCart}/>
        <Button  color={colors.accentOrange}title="View Details" onPress={props.onViewProduct}/>
    </View> */}
    {buttons}
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   height: 240,
   marginVertical: 10,
   padding: 20,
   elevation: 10,
   borderRightColor:'#bdbdbd',
   borderRightWidth: 3
  },
  titleRow:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      width: '100%',
  }, 
  btnRow:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    padding: 3,
    width: '100%',
    backgroundColor: colors.textMain
}, 
  img: {
      width: '100%',
      height: '60%'
  },
  pTitle:{
      fontSize: 22,
      color: colors.textMain,
      borderLeftColor: colors.accentOrange,
      borderLeftWidth: 10,
      padding: 5,
      fontWeight: '700', 
  },
  pPrice:{
    fontSize: 22,
    color: colors.textMain,
    padding: 5, 
    borderColor: colors.primaryDark,
    borderWidth: 3,
    borderRadius: 20,
    textAlign: 'center'
}
})
export default ProductItem