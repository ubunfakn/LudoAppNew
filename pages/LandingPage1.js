import React, { useEffect } from "react";
import { View,ImageBackground } from "react-native";
import Loading from "../components/Loading";
import Background from "../components/Background";
import TopBackground from "../components/TopBackground";
import {useNavigation} from '@react-navigation/native';

const LandingPage = () =>{
    const navigation = useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate("phone")
        },800)
    },)
    return(
        <View>
            <Background></Background>
            <ImageBackground style={{top:0, width:"100%", height:300, backgroundColor: 'rgba(0, 0, 0, 0.1)'}} source={require('../assets/coins.png')} />   
            <TopBackground></TopBackground>
            <Loading></Loading>
        </View>
    )   
}

export default LandingPage;


