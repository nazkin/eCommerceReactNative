import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import colors from '../../constants/colors'
const CartItem = (props) => {

const { container, summary, manager, sumOne, sumTwo, qty, name, calc, final } = styles;
 return(
  <View style={container}>
    <View  style={summary}>
        <View style={sumOne}>
            <Text style={qty}>{props.quantity}</Text>
            <Text style={name}>{props.title}</Text>
        </View>
        <View style={sumTwo}>
            <Text style={calc}>(${props.price} x {props.quantity})</Text>
            <Text style={final}>CAD$ {props.total}</Text>
        </View>
    </View>
    {/* <View style={manager}> */}
        <TouchableOpacity style={manager} onPress={props.onDelete}>
            <Ionicons name="ios-trash" size={25} color='red'/>
        </TouchableOpacity>
    {/* </View> */}

  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'space-around',
   alignItems: 'center',
   marginVertical: 10
  },
  summary:{
    width: '80%',
    height: 50, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  manager:{
    width: '20%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sumOne:{
      width: '50%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 10
  },
  sumTwo:{
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qty:{
      padding: 2,
      backgroundColor: colors.primaryLight,
      fontSize: 15,
      marginRight: 15
  },
  name:{
      fontSize: 18,
      fontWeight: '700',
      color: colors.textMain
  },
  calc:{
      fontSize: 12,
      marginHorizontal: 5
  },
  final:{
      fontSize: 16,
      padding: 5,
      borderWidth: 2,
      borderColor: colors.accentOrange,
      textAlign: 'center',
      textAlignVertical: 'center'
  }
})
export default CartItem