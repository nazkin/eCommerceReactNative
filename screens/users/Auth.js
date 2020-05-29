import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, Button } from 'react-native'
import colors from '../../constants/colors'

/**
* @author
* @function Auth
**/
const Auth = (props) => {


 return(
  <KeyboardAvoidingView behavior="padding" style={styles.container}>
   
        <View style={styles.form}>
            <View style={styles.inputsContainer}>
                <TextInput style={styles.inputs} />
                <TextInput style={styles.inputs} />
            </View>
            <View style={styles.buttons}>
                <Button title="Login" />
                <Text>Do not have an account with us?</Text>
                <Button title="Create an account here" />
            </View>
        </View>
    
  </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  },
  form: {
      width: '90%',
      minHeight: 250,
      padding: 15,
      alignItems: 'center',
      justifyContent:'space-between',
      backgroundColor: colors.primaryLight
  },
  inputsContainer:{
    height: 100,
    width: '90%',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  inputs: {  
    width: '100%', 
    height: 40,
    borderBottomColor: colors.textMain,
    borderBottomWidth: 2
  },
  buttons: {
      justifyContent: 'center',
      alignItems: 'center'
  }
})
export default Auth