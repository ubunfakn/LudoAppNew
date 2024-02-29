import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const Loading = () => {

  const [showLoading, setShowLoading] = useState(false);
  const navigation = useNavigation();

  //   const storeData = async ()=>{
  //     try {
  //         await AsyncStorage.setItem('userId', '1');
  //       } catch (error) {
  //         console.error('Error saving user ID:', error);
  //       }
  // }

  const asyncFunction = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      return id;  // Returning the id for further use
    } catch (error) {
      console.error('Error retrieving userId from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = await asyncFunction();

      if (id !== null) {
        navigation.navigate("sing");  // Use 'navigate' instead of 'navigation'
      } else {
        navigation.navigate("Sing");  // Use 'navigate' instead of 'navigation'
      }

      // Rest of your useEffect code
      const timer = setTimeout(() => {
        setShowLoading(true);
      }, 100);

      // storeData();
    };

    fetchData();
  }, [navigation]);
  return (
    <View>
      {
        showLoading === true ? (<View style={styles.LoadingContent}>
          <Text style={styles.LoadingText} >Loading...</Text>
          <Image style={styles.LoadingImage} source={require('../assets/loading1.png')} />
          <Image style={styles.LoadingGif} source={require('../assets/loading.gif')} />
        </View>) :
          <View>
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  LoadingContent: {
    position: 'absolute',
    top: -90,
    left: 140,
  },

  LoadingText: {
    fontSize: 25,
    fontWeight: '900',
    color: 'white'

  },
  LoadingImage: {
    left: 17,
    margin: 11,
    width: 50,
    overflow: "visible"
  },
  LoadingGif: {
    top: -100,
    width: 100,
    height: 80,
    left: 5
  }
})
export default Loading;