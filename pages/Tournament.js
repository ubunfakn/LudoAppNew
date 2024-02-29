import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Background from '../components/Background'
import UserCard2 from '../components/UserCard2';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';


export default function Tournament() {

    const [isPressed, setIsPressed] = useState(false);
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const [selectedTournament, setSelectedTournament] = useState({});
    const screenHeight = Dimensions.get('window').height;
    const data = [
        { key: '1', text: 'Item 1' },
        { key: '2', text: 'Item 2' },
        { key: '3', text: 'Item 3' },
        { key: '4', text: 'Item 1' },
        { key: '5', text: 'Item 2' },
        { key: '6', text: 'Item 3' },
        // Add more items as needed
    ];

    const [gameData, setGameData] = useState([]);

    const renderItem = ({ item }) => (
        <View>
            <View style={styles.gameContainer}>
                <View style={styles.category}>
                    <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>1vs1 battle</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ color: "white", fontWeight: "bold", left: 15, fontSize: 18 }}>Price Pool</Text>
                        <View style={styles.pricepool}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>$15</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ color: "white", fontWeight: "bold", left: 95, fontSize: 18, left: 180 }}>Entry</Text>
                        <TouchableOpacity style={styles.entryPool} onPress={() => setIsPressed(true)}>
                            <Text style={{ color: "black", fontWeight: "bold", fontSize: 12 }}>Join</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.participants}>
                <Ionicons name='people' color={"white"} size={25} />
                <Text style={{ color: "white", left: 8, fontWeight: "bold" }}>4 joined</Text>
            </View>
        </View>
    );
    return (
        <View style={{ position: "relative",  }}>
            <Background></Background>
            <UserCard2></UserCard2>
            {/* <View style={{ flexDirection: "row", flexWrap: "wrap", position: 'relative', top: -230 }}>
                <TouchableOpacity style={styles.filters}>
                    <Text style={styles.buttonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filters}>
                    <Text style={styles.buttonText}>1vs1 battle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filters}>
                    <Text style={styles.buttonText}>2 winners</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filters}>
                    <Text style={styles.buttonText}>3 winners</Text>
                </TouchableOpacity>
            </View> */}
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                style={{top:60, marginBottom:220}}
            />
            {isPressed && (
                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
            )}
            {
                isPressed === true && isPaymentDone===false ? (
                    <View style={styles.paymentContainer}>
                        <TouchableOpacity onPress={() => setIsPressed(false)} style={styles.crossButton}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>X</Text>
                        </TouchableOpacity>
                        <View style={{ alignItems: "center", top: 10 }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>Confirm Payment</Text>
                        </View>
                        <View style={styles.entryFee}>
                            <Ionicons name='md-wallet' color={"white"} size={30} style={{ left: 12 }} />
                            <Text style={{ fontWeight: "bold", fontSize: 16, color: "white", left: 35 }}>Entry Fee</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 16, color: "white", alignItems: "flex-end", left:65 }}>$10</Text>
                        </View>
                        <TouchableOpacity style={styles.joinNowButton} onPress={()=>setIsPaymentDone(true)}>
                        <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>Join Now</Text>
                        </TouchableOpacity>
                    </View>
                ) : isPressed === true && isPaymentDone === true?(
                    <View style={styles.paymentContainer}>
                        <View style={{ alignItems: "center", top: 30 }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>Game Starting</Text>
                        </View>
                        <Image style={{width:55, height:55, top:40}} source={require('../assets/GameLoad-unscreen.gif')} />
                        <LinearGradient colors={['#C93E3E', '#4D0808']} style={styles.loadingText}>
                            <Text style={{fontWeight:"bold", color:"white", fontSize:18}}>The Game is about to start</Text>
                            <Text style={{fontWeight:"bold", color:"yellow", fontSize:16}}>Please Stay on this page</Text>
                        </LinearGradient>
                    </View>
                ):(
                    <View></View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12
    },
    filters: {
        width: "auto",
        marginLeft: 15,
        alignItems: 'center',
        backgroundColor: '#720123',
        borderWidth: 1,
        borderColor: '#F5C601',
        height: "auto",
        borderRadius: 10,
        textAlign: "center",
        justifyContent: "center",
        padding: 6,
        paddingLeft: 15,
        paddingRight: 15,
    },
    lotteryimage: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    gameContainer: {
        width: "90%",
        marginLeft: "5%",
        height: 110,
        backgroundColor: "#391C1C",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 2,
        borderColor: "#8D8E4E",
    },
    category: {
        top: 0,
        alignItems: "center",
        width: 100,
        height: 22,
        backgroundColor: "#720123",
        justifyContent: "center",
        textAlign: "center",
        left: 125,
        borderWidth: 1,
        borderColor: "#F5C601",
        top: -1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    pricepool: {
        width: 70,
        height: 25,
        backgroundColor: "#720123",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        left: 15,
        borderColor: "#F5C601",
        borderWidth: 1,
        borderRadius: 10,
        top: 4
    },
    entryPool: {
        left: 170,
        width: 60,
        height: 30,
        textAlign: "center",
        backgroundColor: "#07F728",
        alignItems: "center",
        justifyContent: "center",
        top: 5,
        borderRadius: 15,
        borderColor: "white",
        borderWidth: 1,
    },
    participants: {
        width: "90%",
        marginLeft: "5%",
        height: 30,
        top: -10,
        backgroundColor: "#720123",
        borderColor: "#F5C601",
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: "row",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
    },
    paymentContainer: {
        width: "100%",
        height: 250,
        backgroundColor: "#720123",
        bottom: 50,
        borderTopRightRadius: 45,
        borderTopLeftRadius: 45,
        borderColor: "#F5C601",
        borderWidth: 1,
        alignItems: 'center',
        top:-410
    },
    crossButton: {
        width: 35,
        height: 35,
        borderRadius: 17,
        backgroundColor: "darkblue",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        left: 160,
        top: 10
    },
    entryFee: {
        width: 235,
        height: 45,
        backgroundColor: "#391C1C",
        top: 40,
        borderRadius: 25,
        borderColor: "#8D8E4E",
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center"
    },
    joinNowButton:{
        width: 85,
        height:40,
        backgroundColor:"#07F728",
        borderRadius: 25,
        borderColor:"white",
        borderWidth:1,
        top:65,
        textAlign:"center",
        alignItems:"center",
        justifyContent:"center"
    },
    loadingText:{
        // backgroundColor:"#C93E3E",
        width:285,
        height:75,
        top:55,
        borderColor:"white",
        borderWidth:0.5,
        borderRadius:14,
        textAlign:"center",
        alignItems:"center",
        justifyContent:"center"
    }
})