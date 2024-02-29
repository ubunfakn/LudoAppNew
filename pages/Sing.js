import { StyleSheet, Text, TouchableOpacity, View, Image,ImageBackground } from 'react-native';
import Background from '../components/Background'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import TopBackground from '../components/TopBackground';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

WebBrowser.maybeCompleteAuthSession();

const Sing = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState();


  useEffect(()=>{
    handleSignInWithGoogle();
  },[response])
  // const redirectUri = AuthSession.makeRedirectUri({useProxy:true});

  //  console.log(redirectUri);

  //  const [request, response, promptAsync] = AuthSession.useAuthRequest(
  //   {
  //     clientId: '286276780601-rk8ges91kmdesgi9g01b4prkfj74usr9.apps.googleusercontent.com',
  //     scopes: ['openid', 'profile', 'email'],
  //     redirectUri,
  //   },
  //   {
  //     authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  //     tokenEndpoint: 'https://oauth2.googleapis.com/token',
  //     revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  //   }
  //  );

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:"286276780601-rk8ges91kmdesgi9g01b4prkfj74usr9.apps.googleusercontent.com",
    webClientId:"286276780601-8hc9jad4je6tbjprmbc4udo2ac1aj3n8.apps.googleusercontent.com"
  })

  const handleSignInWithGoogle = async () => {

    const user = AsyncStorage.getItem("@user")
    if(!user){
      if(response.type === "success")
      await getUserDetails(response.authentication.accessToken)
    }else{
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserDetails = async (token)=>{
    if(!token)return;
    fetch("https://www.googleapis.com/userinfo/v2/me'",{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    }).then((result)=>{
      console.log(result);
      result.json().then(async (response)=>{
        console.log(response);
        await AsyncStorage.setItem("@user", JSON.stringify(response));
        setUserInfo(response);
      }).catch((error)=>{
        console.log(error);
      })
    }).catch((error)=>{
      console.log(error);
    })
  }

  
  return (
    <View>
      <Background></Background>
      <ImageBackground style={{top:0, width:"100%", height:300, backgroundColor: 'rgba(0, 0, 0, 0.1)'}} source={require('../assets/coins.png')} />   
      <TopBackground></TopBackground>
      <View style={{alignItems:"center"}}>
      <Text style={styles.signUpText}>Signup to get $10 Free</Text>
      </View>
      <View style={styles.login}>
        <TouchableOpacity onPress={()=>navigation.navigate("phone")} style={styles.google}>
          <Image style={styles.googleimg1} source={require('../assets/mobile.png')} />
          <Text style={styles.googleText}>Sign up with Mobile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>promptAsync()} style={styles.google}>
          <Image style={styles.googleimg} source={require('../assets/google.png')} />
          <Text style={styles.googleText}>Sign up with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Sing

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  Button: {
    color: 'red',
  },
  login: {
    alignItems: 'center',
    gap: 20,
    top:-160
  },
  sing: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 800
  },
  google: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#391C1C',
    borderWidth: 3,
    borderColor: '#8D8E4E',
    height: 55,
    width: 310,
    borderRadius: 25,
    shadowColor: "#8D8E4E",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation:8
  },
  googleText: {
    color: '#AAA8A8',
    marginLeft: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  googleimg: {
    marginLeft: 20,
  },
  googleimg1: {
    marginLeft: 5,
    width: 50,
    height: 50,
  },
  signUpText: {
    color: "white",
    fontSize: 30,
    top:-190,
    fontWeight:"bold",
    letterSpacing:0.01,
  }

})