import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {Ionicons} from "@expo/vector-icons"
import colors from '../../constants/colors'

const OrderItem = (props) => {
    const [showingDetails, setShowingDetails] = useState(false);
    const dateArr = props.date.split(" ");
    const orderDate = dateArr[1].concat(" ").concat(dateArr[2]).concat(", ").concat(dateArr[3]);

    const toggleDetailsHandler = ()=>{
        setShowingDetails(prevState => !prevState);
      }
    let details = null;
    if(showingDetails){
        details = props.items.map((item, i)=> {
            return(
                <View key={item.productID} style={styles.details}>
                    <Text style={styles.detSum}>$ {item.totalPrice}</Text> 
                    <Text style={styles.detCalc}>({item.productQuantity} - {item.productTitle}   x  ${item.productPrice})</Text>    
                </View>
            )
        })
    }else {
        details = null;
    }
 return(
     <View style={styles.container}>
        <TouchableOpacity onPress={toggleDetailsHandler} style={styles.basics}>
            <Text style={styles.date}>{orderDate}</Text>
            <Text style={styles.amt}>$ {props.amount}</Text>
            <View style={styles.detSelect}>
                <Text style={styles.detText}>Details</Text>
                <Ionicons name={showingDetails ? 'ios-arrow-up' : 'ios-arrow-down'} size={35} color={colors.accentOrange}/>
            </View>
        </TouchableOpacity>
        {details}
     </View>

  )
}


const styles = StyleSheet.create({
container:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
},
    detSelect:{
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
    width: '20%',
    },
    detText:{
        marginLeft: 5,
        color: colors.accentOrange
    },
  basics:{
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      borderTopWidth: 4,
      borderTopColor: colors.accentOrange,
      backgroundColor: colors.primaryLight,
  },
  date:{
      fontSize: 16,
      fontStyle: 'italic',
      alignSelf: 'flex-start',
      color:colors.textMain
      
  },
  amt:{
      fontSize: 18,
      fontWeight: '700',
      alignSelf: 'flex-start',
      backgroundColor: colors.primaryLight,
      
  },
  details:{
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#aeaeae',
      padding: 5


  },
  detCalc:{
    fontSize: 16,
    fontStyle: 'italic',
    marginRight: 10,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 3
  

  },
  detSum:{
    fontSize: 17,
    fontWeight: '700',
    color: colors.textMain,
    backgroundColor: '#f4f4f4',
    marginLeft: 10,
    paddingHorizontal: 3


  }
})
export default OrderItem