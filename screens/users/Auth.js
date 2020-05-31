import React, {useState} from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, Button, Alert } from 'react-native'
import { useDispatch } from 'react-redux';
import colors from '../../constants/colors'
import urls from '../../constants/httpRequests'
import * as authActions from '../reduxStore/actions/authActions'
/**
* @author
* @function Auth
**/


const Auth = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const authHandler = async (email, passwd)=>{
    //signing up
    if(!hasAccount){
      try{
        await dispatch(authActions.signUp(email, passwd));
      }catch(err){
        Alert.alert("Error", `ERROR: ${err}`, [{title: 'Okay'}]);
        return;
      }
    //log in
    }else {
      try{
        await dispatch(authActions.login(email, passwd));
      }catch(err){
        Alert.alert("Error", `ERROR: ${err}`, [{title: 'Okay'}]);
        return;
      }
    }
    //navigating to a new screen if the errors were not thrown
    props.navigation.navigate('Shop');
  }

 return(
  <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.form}>
          <ScrollView style={{width: '100%'}}>
          <View style={styles.inputsContainer}>
                <Text style={styles.lable}>Username</Text>
                <TextInput
                 style={styles.inputs}
                 autoCapitalize="none"
                 autoFocus={true}
                 value={username}
                 onChangeText={(val)=>{setUsername(val)}}
                />
                <Text style={styles.lable}>Password</Text>
                <TextInput
                 style={styles.inputs}
                 secureTextEntry={true}
                 value={password}
                 onChangeText={(val)=>{setPassword(val)}}
                />
            </View>
            <View style={styles.buttons}>
                <Button
                color={hasAccount ? 'cornflowerblue' : colors.accentOrange}
                 title={hasAccount ? "Login": "Sign Up"}
                 onPress={()=> authHandler(username, password)}
                 />
                <Text>{hasAccount ? 'Do not have an account with us yet?': "Already have an account with us?"}</Text>
                <Button
                 color={hasAccount ? colors.accentOrange : 'cornflowerblue'}
                 title={hasAccount? "Sign-up Here" : "Login here"}
                 onPress={()=> setHasAccount(!hasAccount)}
                 />
            </View>
          </ScrollView>
        </View>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'flex-start',
   alignItems: 'center',
   padding: 20,
   backgroundColor: colors.primaryDark
  },
  form: {
      width: '100%',
      height: 300,
      alignItems: 'center',
      justifyContent:'space-between',
      backgroundColor:'ivory',
      elevation:8,
      borderRadius: 10
     
  },
  inputsContainer:{
    height: 180,
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
   
  },
  inputs: {  
    width: '95%', 
    borderBottomColor: colors.textMain,
    borderBottomWidth: 2,
    backgroundColor: colors.primaryLight
  },
  buttons: {
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 120
  },
  lable:{
    width: '60%',
    fontSize: 18,
    borderLeftColor: colors.accentOrange,
    borderLeftWidth: 6,
    borderBottomColor: colors.accentOrange,
    borderBottomWidth: 6,
    paddingHorizontal: 20,
    fontWeight: '700',
    color: colors.textMain,
    alignSelf: 'flex-start',
    marginLeft: 5
  }
})
export default Auth