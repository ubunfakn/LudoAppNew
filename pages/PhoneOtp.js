import { StyleSheet, Text, TextInput, View,TouchableOpacity, Alert, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Background from '../components/Background'
import TopBackground from '../components/TopBackground';
import {useNavigation, useRoute} from '@react-navigation/native';

const PhoneOtp = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState();
  const [phoneNumber, setPhoneNumber] = useState(route.params)

  const changeOtp = (text)=>{
    setOtp(text);
  }

const sendOtpToBackend = () => {
  // Validate if OTP is not empty
  if (!otp) {
    Alert.alert('Error', 'Please enter OTP.');
    return;
  }else if (!/^[0-9]+$/.test(otp)) {
    Alert.alert('Error', 'Please enter correct OTP.');
    return;
  }

  // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual endpoint to send OTP to the backend
  const backendApiEndpoint = 'http://192.168.212.242:5/verify_otp';
  

  // Make a POST request to send OTP to the backend
  fetch(backendApiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers if needed
    },
    body: JSON.stringify({mobile_number:phoneNumber, otp:otp})
  })
    .then((response) => {
      console.log(response)
      response.json().then((result)=>{
        console.log(result);
        // navigation.navigate("userdetails");
      }).catch((error)=>{
        Alert.alert(error);
      })
    })
    .catch((error) => {
      // Handle errors
      console.error('Error sending OTP:', error.message);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    });

    // navigation.navigate("tournament");

    navigation.navigate("userdetails", {phoneNumber});
};

const resendOtp = () => {
  fetch('http://192.168.1.19:5100/generate_otp',{
    headers:{
      'Content-Type': 'application/json',
      'Accept':'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ mobile_number:phone })
  }).then((response)=>{
    if(response.status === 200){
    response.json((result)=>{
      console.log(result)
    }).catch((error)=>{
      console.log(error)
    })
  }else{
    console.log("Something went wrong")
  }
  }).catch((error)=>{
    Alert.alert(error.message);
  })
};

  return (
    <View>
      <Background/>
      <ImageBackground style={{top:0, width:"100%", height:300, backgroundColor: 'rgba(0, 0, 0, 0.1)'}} source={require('../assets/coins.png')} />   
      <TopBackground />
     <View style={styles.main}>
        <Text style={styles.sing}>Signup to get $10 Free</Text>
        <TextInput placeholder='Please enter otp' onChangeText={changeOtp} placeholderTextColor="white" style={styles.input}></TextInput>
        <TouchableOpacity style={styles.google} onPress={sendOtpToBackend}>
          <Text style={styles.googleText}>verify</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resend} onPress={resendOtp}>
          <Text style={styles.resendText}>Resend Otp</Text>
        </TouchableOpacity>
        </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
  main:{
   textAlign:'center',
   alignItems:'center',
   top:20
  },
    sing: {
        // marginTop: 260,
        color: 'white',
        fontWeight: '900',
        fontSize: 24,
        paddingLeft: 15,
        paddingRight: 15,
        textAlign: 'center',
        top:-230
      },
      input: {
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#391C1C',
        height: 55,
        width: 250,
        borderColor: '#8D8E4E',
        borderWidth: 3,
        borderRadius: 25,
        // marginTop: 10,
        top:-210,
        color:'white',
      
      },
      google: {
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#017C0E',
        height: 55,
        width: 130,
        borderRadius: 12,
        top:-200
      },
      googleText: {
        marginTop: 10,
        color: 'white',
        fontSize: 25,
        fontWeight: '900'
      },
      resend:{
        //  marginTop:10,
        fontSize: 20,
        backgroundColor: '#391C1C',
        height: 55,
        width: 250,
        borderColor: '#8D8E4E',
        borderWidth: 3,
        borderRadius:25,
        color:'white',
        top:-190
      },
      resendText:{
       color:'white',
       fontSize:20,
       textAlign:'center',
       alignItems:'center',
       marginTop:10,
      },
      document: {
        color: 'white',
        textAlign: 'center',
        paddingLeft: 40,
        paddingRight: 15,
        fontWeight:'900',
        textAlign:'justify',
        // marginTop:15
        top:-170
      },
      icon:{
        position:'absolute',
        marginLeft:12,
        top:685
      },
})

export default PhoneOtp;