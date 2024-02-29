import React from "react";
import { View, StyleSheet, ImageBackground,Dimensions } from "react-native";

const Background = () =>{
    return(
        <View>
            
            <ImageBackground style = {styles.backgroundImage} source={require('../assets/back.png')}/>
        </View>
    )   
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    backgroundImage: {
        resizeMode:'cover',
        position:'absolute',
        width:"100%",
        height:height,
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
      },
   
})

export default Background;


