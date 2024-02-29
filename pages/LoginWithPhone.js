import React, { useEffect, useState } from 'react';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import PhoneNumberInput from 'react-native-phone-number-input';
import Background from '../components/Background';
import TopBackground from '../components/TopBackground';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginWithPhone = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('91');
  const [isChecked, setIsChecked] = useState(true);

  const changeCountry = (country) => {
    setCountryCode(country.callingCode[0]);
    // setCountryCode(code);
  }
  const validatePhoneNumber = () => {
    // Regular expression to validate a phone number with or without a country code
    // Example formats: +1234567890, 1234567890
    const phoneRegex = /^\+?[0-9]{10,}$/;

    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
      return false;
    }

    return true;
  };


  const onSubmit = () => {
    if (!validatePhoneNumber()) {
      return;
    }

    // const phone = "+" + countryCode + phoneNumber;
    const phone = phoneNumber
    navigation.navigate("menu", { phone });
    // const data = {
    //   mobile_number:phone,
    // }
    // console.log("data" , data);
  //   fetch('http://192.168.212.242:5000/generate_otp', {
  //     method:"POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({ mobile_number:phone })
  //   }).then((response) => {
  //     console.log(response,"*************")
  //     if (response.status === 200) {
  //       response.json((result) => {
  //         console.log(result)
  //         // navigation.navigate("otp", { phone });
  //       }).catch((error) => {
  //         console.log(error)
  //       })
  //     } else {
  //       console.log("Something went wrong")
  //     }
  //   }).catch((error) => {
  //     // Alert.alert('Error', error.message || 'Something went wrong');
  //     console.log(error)
  //   })
  //   // navigation.navigate("otp", { phoneNumber });

  fetch('http://192.168.1.19:5100/generate_otp', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({ mobile_number: phone })
})
  .then((response) => {
    console.log(response, "*************");

    if (response.ok) {
      // Check if the response status is okay (200-299)
      return response.json().then(async(result) => {
        console.log(result.Data);
        const data  = result.Data[0][0];
        await AsyncStorage.setItem("userId",data.toString());
        navigation.navigate("otp", { phone });
        // Handle the result, navigate, etc.
      })
      .catch((error) => {
        console.log(error);
        // Handle errors, show alerts, etc.
      });
    } else {
      // Handle non-successful response status
      throw new Error('Something went wrong');
    }
  })

  // navigation.navigate("otp", { phone });

  };

  // useEffect(()=>{
    
  // },[]);



  return (
    <View>
      <Background></Background>
      <ImageBackground style={{ top: 0, width: "100%", height: 300, backgroundColor: 'rgba(0, 0, 0, 0.1)' }} source={require('../assets/coins.png')} />
      <TopBackground></TopBackground>
      <View style={styles.container}>
        <PhoneNumberInput
          defaultCountry="US"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          onChangeCountry={changeCountry}
        />
        <TouchableOpacity onPress={() => onSubmit()} style={styles.google}>
          <Text style={styles.googleText}>Get Otp</Text>
        </TouchableOpacity>
        <View style={{flexDirection:"row"}}>
        <Checkbox
            style={{marginTop:70, marginLeft:30}}
            color={isChecked ? '#A8A8A8' : "white"}
            value={isChecked}
            onValueChange={()=>setIsChecked(!isChecked)}

             />
        <Text style={styles.document}>To fully utilize the features of the Game, users may be required to create an account. Users are responsible for maintaining the confidentiality of their account information.</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    top: -190
  },
  google: {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#017C0E',
    height: 55,
    width: 130,
    borderRadius: 12,
    top: 40,
  },
  googleText: {
    marginTop: 10,
    color: 'white',
    fontSize: 25,
    fontWeight: '900'
  },
  document: {
    color: 'white',
    textAlign: 'center',
    paddingLeft: 40,
    paddingRight: 15,
    fontWeight: '900',
    textAlign: 'justify',
    top: 65,
    left:-10
  },
  icon: {
    position: 'absolute',
    top: 200,
    left: 12
  },
})

export default LoginWithPhone;