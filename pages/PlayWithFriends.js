import { View, Text, StyleSheet, TouchableOpacity, TextInput, Share, Alert } from 'react-native'
import React, { useState } from 'react'
import Background from '../components/Background';
import * as Sharing from 'expo-sharing';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserCard2 from '../components/UserCard2';
import {useNavigation} from '@react-navigation/native';

export default function PlayWithFriends() {
    const [showCreateRoom, setCreateShowRoom] = useState(true);
    const [players, setPlayers] = useState();
    const [roomId, setRoomId] = useState();
    const navigation = useNavigation();
    const generateRoomId = () => {
        console.log(players);
        if (players === undefined) {
            console.log("select players")
            Alert.alert("Please select number of players")
        } else {
            const randomNumber = Math.floor(100000 + Math.random() * 900000);
            setRoomId(randomNumber);
        }
    }
    const shareRoomId = async () => {
        try {
            const result = await Share.share({
                message: `Join my room with ID: ${roomId}`,
            });

            if (result.action === Share.sharedAction) {
                console.log('Shared successfully');
            } else if (result.action === Share.dismissedAction) {
                console.log('Share cancelled');
            }
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };
    return (
        <View>
            <Background></Background>
            <UserCard2></UserCard2>
            <View >
                <Text style={styles.text}>Play with friends</Text>
            </View>


            {
                showCreateRoom === true ? (
                    <View>
                        <View style={styles.container}>
                            <View style={{ flexDirection: "row", flexWrap: "wrap", left: -20 }}>
                                <TouchableOpacity style={styles.joinRoom} onPress={()=>setCreateShowRoom(false)}>
                                    <Text style={styles.buttonText}>Join Room</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.createRoom}>
                                    <Text style={styles.buttonText}>Create Room</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, top: 20 }}>Select No. of Players</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}>
                                <TouchableOpacity style={players===3?styles.playerButtons1:styles.playerButtons} onPress={() => setPlayers(2)}>
                                    <Text style={styles.buttonText}>2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={players===4?styles.playerButtons1:styles.playerButtons} onPress={() => setPlayers(3)}>
                                    <Text style={styles.buttonText}>3</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={players===5?styles.playerButtons1:styles.playerButtons} onPress={() => setPlayers(4)}>
                                    <Text style={styles.buttonText}>4</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={players===6?styles.playerButtons1:styles.playerButtons} onPress={() => setPlayers(6)}>
                                    <Text style={styles.buttonText}>6</Text>
                                </TouchableOpacity> */}
                            </View>
                            <TouchableOpacity style={styles.createButton} onPress={generateRoomId}>
                                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Generate Room Id</Text>
                            </TouchableOpacity>
                            <Text style={{ color: "white", fontSize: 35, fontWeight: "bold", top: 47 }}>{roomId}</Text>
                            <View style={{ flexDirection: "row", top: 70 }}>
                                <TouchableOpacity onPress={shareRoomId}>
                                    <Ionicons color={"white"} name='md-share-outline' size={35}></Ionicons>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 40 }}>
                                    <Ionicons color={"white"} size={35} name="md-person-add"></Ionicons>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View>
                        <View style={styles.container}>
                            <View style={{ flexDirection: "row", flexWrap: "wrap", left: -20 }}>
                                <TouchableOpacity style={styles.joinRoom}>
                                    <Text style={styles.buttonText}>Join Room</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.createRoom} onPress={()=>setCreateShowRoom(true)}>
                                    <Text style={styles.buttonText}>Create Room</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: "white", fontSize: 28, fontWeight: 'bold', fontStyle: "italic", top: -5 }}>Enter Code</Text>
                            <Text style={{ color: "white", fontSize: 15, top: 30 }}>Join a friend's Room</Text>
                            <TextInput style={styles.inputCode} placeholder='Enter Code' placeholderTextColor={"white"}></TextInput>
                            <TouchableOpacity style={styles.joinButton}>
                                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Join Room</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
            <TouchableOpacity style={styles.homeButton} onPress={()=>navigation.navigate("menu")}>
                <Ionicons style={{ color: "white", fontSize: 25 }} name='home'></Ionicons>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 400,
        backgroundColor: "#391C1C",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#8D8E4E",
        // justifyContent:"center",
        alignItems: "center",
        top: 100,
        left: 45,
        paddingTop: 40
    },
    text: {
        color: "white",
        fontSize: 30,
        top: 60,
        textAlign: "center",
        fontWeight: "bold",
        fontStyle: "italic"
    },
    homeButton: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 700,
        left: 175,
        backgroundColor: "#E23F84",
        borderRadius: 25,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    playerButtons: {
        alignItems: 'center',
        backgroundColor: '#720123',
        borderWidth: 1,
        borderColor: '#F5C601',
        height: 45,
        width: 50,
        borderRadius: 10,
        textAlign: "center",
        justifyContent: "center",
        margin: 10,
        marginTop: 35
    },
    playerButtons1: {
        alignItems: 'center',
        backgroundColor: '#E889A6',
        borderWidth: 1,
        borderColor: '#F5C601',
        height: 45,
        width: 50,
        borderRadius: 10,
        textAlign: "center",
        justifyContent: "center",
        margin: 10,
        marginTop: 35
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    createRoom: {
        width: 100,
        marginLeft: 35,
        alignItems: 'center',
        backgroundColor: '#A8A8A8',
        borderWidth: 1,
        borderColor: '#F5C601',
        height: 45,
        borderRadius: 10,
        textAlign: "center",
        justifyContent: "center",
        marginTop: -60
    },
    joinRoom: {
        width: 100,
        marginLeft: 35,
        alignItems: 'center',
        backgroundColor: '#720123',
        borderWidth: 1,
        borderColor: '#F5C601',
        height: 45,
        borderRadius: 10,
        textAlign: "center",
        justifyContent: "center",
        marginTop: -60
    },
    createButton: {
        backgroundColor: "#017C0E",
        width: "auto",
        padding: 10,
        height: "auto",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        top: 30,
        borderRadius: 12,
        borderColor: "white",
        borderWidth: 1.1
    },
    inputCode: {
        backgroundColor: "#720123",
        width: 170,
        top: 75,
        height: 45,
        borderColor: "#F5C601",
        borderWidth: 1.1,
        borderRadius: 8,
        textAlign: "center"
    },
    joinButton: {
        backgroundColor: "#017C0E",
        width: 118,
        height: 46,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        top: 130,
        borderRadius: 12,
        borderColor: "white",
        borderWidth: 1.1
    },
})