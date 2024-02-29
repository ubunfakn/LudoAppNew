import { ImageBackground, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import UserCard2 from '../components/UserCard2'
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const OnlineOffline = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ImageBackground style={styles.background} resizeMode='cover' source={require('../assets/landingbackground.jpg')} />
      <UserCard2 />
      <View style={styles.btnes}>
        <View style={styles.playboxContainer}>
          <TouchableOpacity style={styles.playbox} onPress={()=>navigation.navigate("playOnline")}>
            <View style={{ flexDirection: "row", left: -25 }}>
              <View style={styles.insideBox}>
                <Ionicons name='ios-phone-portrait-outline' color={"#F5C601"} size={50} style={{ top: 5, left: -2 }} />
              </View>
              <Text style={{top:50, left:91, fontSize:23, position:"absolute", color:"#ffff", fontWeight:"bold"}}>V/S</Text>
              <View style={styles.insideBox}>
                <Ionicons name='ios-phone-portrait-outline' color={"#F5C601"} size={50} style={{ top: 5, left: -2 }} />
              </View>
            </View>
            <View style={styles.textbox}>
              <Text style={{ fontWeight: "bold", fontSize: 18, color: "#ffff", fontFamily: 'serif' }}>PLAY ONLINE</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.playbox} onPress={()=>navigation.navigate("playwithfriends")}>
            <View style={{ flexDirection: "row", left: -25 }}>
              <View style={styles.insideBox}>
                <Ionicons name='person' color={"#F5C601"} size={50} style={{ top: 5, left: -2 }} />
              </View>
              <Text style={{ top: 50, left: 91, fontSize: 23, position: "absolute", color: "#ffff", fontWeight: "bold" }}>V/S</Text>
              <View style={styles.insideBox}>
                <Ionicons name='people' color={"#F5C601"} size={50} style={{ top: 5, left: -2 }} />
              </View>
            </View>
            <View style={styles.textbox}>
              <Text style={{ fontWeight: "bold", fontSize: 18, color: "#ffff", fontFamily: 'serif', textAlign: "center" }}>PLAY WITH FRIENDS</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.playboxContainer}>
          <TouchableOpacity style={styles.playbox}>
            <View style={{ flexDirection: "row", left: -25 }}>
              <View style={styles.insideBox}>
                <Ionicons name='desktop' color={"#F5C601"} size={45} style={{ top: 9, left: 1 }} />
              </View>
              <Text style={{ top: 50, left: 91, fontSize: 23, position: "absolute", color: "#ffff", fontWeight: "bold" }}>V/S</Text>
              <View style={styles.insideBox}>
                <Ionicons name='person' color={"#F5C601"} size={50} style={{ top: 5, left: -2 }} />
              </View>
            </View>
            <View style={styles.textbox}>
              <Text style={{ fontWeight: "bold", fontSize: 18, color: "#ffff", fontFamily: 'serif' }}>COMPUTER</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.playbox} onPress={()=>navigation.navigate("playlocal")}>
            <View style={{ flexDirection: "row", left: -25 }}>
              <View style={styles.insideBox}>
                <Ionicons name='person-outline' color={"#F5C601"} size={50} style={{ top: 5, left: -2 }} />
              </View>
              <Text style={{ top: 50, left: 91, fontSize: 23, position: "absolute", color: "#ffff", fontWeight: "bold" }}>V/S</Text>
              <View style={styles.insideBox}>
                <Ionicons name='person-outline' color={"#F5C601"} size={50} style={{ top: 5, left: -2 }} />
              </View>
            </View>
            <View style={styles.textbox}>
              <Text style={{ fontWeight: "bold", fontSize: 18, color: "#ffff", fontFamily: 'serif' }}>PASS N PASS</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default OnlineOffline

const styles = StyleSheet.create({
  background: {
    // flex:1,
    // justifyContent:'center',
    // alignItems:'center',
    width: '100%',
    height: 840,
    position: "absolute",
    resizeMode: "cover"

  },
  playboxContainer: {
    flexDirection: "row",
    left: 5,
    marginTop: 80
  },
  playbox: {
    width: 180,
    height: 180,
    backgroundColor: "#720123",
    marginRight: 20,
    borderWidth: 2,
    borderColor: "#F5C601",
    borderRadius: 25,
    shadowColor: "#F5C601",
    shadowOffset: 55,
    shadowOpacity: 0.9,
    elevation: 20,
  },
  btnes: {
    flexDirection: "column",
    top: 20
  },
  insideBox: {
    width: 50,
    height: 70,
    borderColor: "#F5C601",
    borderWidth: 2,
    marginLeft: 40,
    top: 30,
    borderRadius: 15,
    shadowColor: "#F5C601",
  },
  textbox: {
    width: "102%",
    left: -1.5,
    backgroundColor: "#E0A607",
    marginBottom: 0,
    bottom: 0,
    top: 57,
    height: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: "#F5C601",
    borderWidth: 3,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },

  play_onlinebtn: {
    backgroundColor: '#CD8F0A',
    width: 330,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  btnText: {
    color: 'white',
    fontSize: 35,
  },
  play_img1: {
    backgroundColor: '#F19F03',
    alignItems: 'center',
    width: 100,
    height: 40,
    marginLeft: 110,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,

  },
  img: {
    marginTop: 7,
  },
})