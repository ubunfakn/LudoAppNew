import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Background from '../components/Background'
import Ionicons from '@expo/vector-icons/Ionicons';
import UserCard2 from '../components/UserCard2';
import {useNavigation} from '@react-navigation/native';

export default function PlayLocal() {
    const navigation = useNavigation();
    const [noOfPlayer, setNoOfPlayer] = useState(undefined);

    const navigateToGamePage = ()=>{
        if(noOfPlayer === undefined){
            Alert.alert("Please select no. of players");
        }else
        navigation.navigate("board", {noOfPlayer})
    }
    
    return (
        <View>
            <Background></Background>
            <UserCard2></UserCard2>
            <View >
                <Text style={styles.text}>Local</Text>
            </View>
            <View style={styles.container}>
                <Text style={{ color: "white", fontSize: 28, fontWeight: 'bold', fontStyle: "italic" }}>No of Players</Text>
                <View style={{flexDirection:"row",justifyContent:"space-around",flexWrap:"wrap"}}>
                    <TouchableOpacity style={noOfPlayer===2?styles.playerButtons1:styles.playerButtons} onPress={()=>setNoOfPlayer(2)}>
                        <Text style={styles.buttonText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={noOfPlayer===3?styles.playerButtons1:styles.playerButtons} onPress={()=>setNoOfPlayer(3)}>
                        <Text style={styles.buttonText}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={noOfPlayer===4?styles.playerButtons1:styles.playerButtons} onPress={()=>setNoOfPlayer(4)}>
                        <Text style={styles.buttonText}>4</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={noOfPlayer===5?styles.playerButtons1:styles.playerButtons} onPress={()=>setNoOfPlayer(5)}>
                        <Text style={styles.buttonText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={noOfPlayer===6?styles.playerButtons1:styles.playerButtons} onPress={()=>setNoOfPlayer(6)}>
                        <Text style={styles.buttonText}>6</Text>
                    </TouchableOpacity> */}
                </View>
                <TouchableOpacity style={styles.startButton} onPress={navigateToGamePage}>
                    <Text style={{color:"white", fontSize:20,fontWeight:"bold"}}>Start</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.homeButton} onPress={()=>navigation.navigate("menu")}>
                <Ionicons style={{color:"white",fontSize:25}} name='home'></Ionicons>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 30,
        top: 60,
        textAlign: "center",
        fontWeight: "bold",
        fontStyle: "italic"
    },
    container: {
        width: 300,
        height: 350,
        backgroundColor: "#391C1C",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#8D8E4E",
        // justifyContent:"center",
        alignItems: "center",
        top: 90,
        left: 45,
        paddingTop: 60
    },
    playerButtons: {
        alignItems: 'center',
        backgroundColor: '#720123',
        borderWidth: 1,
        borderColor: '#F5C601',
        height: 50,
        width: 58,
        borderRadius: 10,
        textAlign: "center",
        justifyContent: "center",
        margin: 10,
        marginTop:30
    },
    playerButtons1:{
        alignItems: 'center',
        backgroundColor: '#E889A6',
        borderWidth: 1,
        borderColor: '#F5C601',
        height: 50,
        width: 58,
        borderRadius: 10,
        textAlign: "center",
        justifyContent: "center",
        margin: 10,
        marginTop:30
    },
    buttonText:{
        color:"white",
        fontWeight:"bold",
        fontSize:20
    },
    startButton: {
        width: 100,
        marginLeft: 35,
        alignItems: 'center',
        backgroundColor: '#017C0E',
        borderWidth: 1,
        borderColor: '#F5C601',
        height: 45,
        borderRadius: 10,
        textAlign: "center",
        justifyContent: "center",
        marginTop: -80,
        top:120,
        left:-20
    },
    homeButton: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 650,
        left: 175,
        backgroundColor: "#E23F84",
        borderRadius: 25,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    },
})