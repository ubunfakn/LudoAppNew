import { ImageBackground, StyleSheet, Text, View,Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const Notification = () => {
  const [Notifications, seNotifications]= useState([
    {statusSeen:false, id:'1', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'2', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'3', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'4', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'5', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'6', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'7', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'8', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'9', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'10', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'11', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'12', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'13', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'14', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'15', noti:'0Rwi is inviting you in new contest click here to join contest'},
    {statusSeen:false, id:'16', noti:'0Rwi is inviting you in new contest click here to join contest'},

   
  ])
  return (
    <View>
       <ImageBackground style = {styles.backgroundImage} source={require('../assets/back.png')}/>
       
     <View style={styles.main}>
     <View style={styles.staticHeader}>
      <View style={styles.main2}>
        {/* <Image style={styles.ballImg} source={require('../assets/ball.png')}/> */}
         <Text style={styles.main2Text}>Notification</Text>
      </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.card}>
      {Notifications.map( Notifications => (
       <View key={Notifications.id} style={styles.notiMain}>
       <View style={styles.roundIcon}>
        <Icon style={styles.icon} name="user" size={30} color="#fff" />
      </View>
        <Text style={styles.cardText}>{Notifications.noti}</Text>
       </View>
       ))}
       
       
      </View>
      </ScrollView>
     </View>
    
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
    backgroundImage: {
        resizeMode:'cover',
        position:'absolute',
        width:"100%",
        height:840,
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
      },
      main:{
         alignItems:'center',

      },
      main2:{
        flexDirection:'row',
        top:10,
        
      },
      scrollViewContent: {
        marginTop: 10, // Set marginTop to the height of your static header
        alignItems: 'center',
      },
      staticHeader: {
        height: 65, 
        justifyContent: 'center',
        alignItems: 'center',
      },
      ballImg:{
         height:30,
         width:30,
      },
      main2Text:{
        color:'white',
        fontSize:20,
        fontWeight: 'bold',
        fontFamily: 'serif',
      },
      card:{
        gap:-15,
        top:-80,
        marginBottom:50
      },
      notiMain:{
        flexDirection:'row',
        backgroundColor:'red',
        backgroundColor: '#391C1C',
        borderWidth: 3,
        borderColor: '#8D8E4E',
        height: 70,
        width: 350,
        borderRadius: 34,
        alignItems:'center',
        marginBottom:50,
        
        
      
      },
      cardText:{
        color:'white',
        width:220,
        textAlign:'center',
        textAlign:'left',
        left:40,
        fontWeight: 'bold',
      },
      icon:{
        color:'#391C1C'
      },
      
      roundIcon: {
        width: 35,
        color:'red',
        height: 35,
        borderRadius: 30,
        backgroundColor: 'white', // You can set your desired background color
        justifyContent: 'center',
        alignItems: 'center',
        left:30,
        
      },
      

})