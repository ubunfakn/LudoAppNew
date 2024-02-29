import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
// import Background from './Background'
import Ionicons from '@expo/vector-icons/Ionicons';

const UserCard = () => {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const fetchUser = () => {
    const token = "";
    fetch('http://localhost:8000/api/user', {
      method: "GET",
      headers: {
        'Authorization': token
      }
    }).then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <View>
      <View style={styles.main}>
        <View style={styles.card}>
          <View style={styles.img}>
            <Image style={styles.card_img} source={require('../assets/card_img.jpeg')} />
            <View style={styles.user}>
              <Text style={styles.username}>{name}</Text>
              <Text style={styles.usernumber}>{phone}</Text>
            </View>
          </View>
          <View style={styles.card_last}>
            <TouchableOpacity>
              <View style={styles.setting}>
                <Ionicons style={styles.icon} name="settings" size={30} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.setting}><Ionicons style={styles.icon2} name="notifications" size={30} color="black" /></View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default UserCard

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
  },
  card: {
    width: 350,
    // marginTop: 30,
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    borderBottomColor: '#8D8E4E',
    borderBottomWidth: 3,
    width: '100%', // Adjust the width as needed
    marginVertical: 10, // Adjust the vertical margin as needed
    top:-280
  },
  img: {
    flexDirection: "row",
    marginTop: 10,
  },
  username: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
    marginTop: 10,
  },
  usernumber: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  card_last: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,

  },
  icon: {
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
  },
  setting: {
    width: 40,
    height: 40,
    backgroundColor: '#003090',
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#74CAFF',

  },
  icon2: {
    color: 'gold',
  }

})