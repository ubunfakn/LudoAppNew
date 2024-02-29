import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function UserCard2() {
    const navigation = useNavigation();
    const handlenavigation = ()=>{
        navigation.navigate('wallet')
    }
    return (
        <View>
            <View style={{backgroundColor:"#BDBF52", width:"100%", height:6, top:40}}>

            </View>
            <LinearGradient
                colors={['#D61093', '#94C0E4']}
                start={[0, 0]}
                end={[1, 0]}
                locations={[0.3376, 0.9599]}
                style={styles.background}
            >
                <View style={styles.img}>
                    <Image style={styles.card_img} source={require('../assets/card_img.jpeg')} />
                    <View style={styles.user}>
                        <Text style={styles.username}>Ankit Kumar Nashine</Text>
                        <Text style={styles.usernumber}>8602185525</Text>
                    </View>
                </View>
                <View style={styles.card_last}>
                    <TouchableOpacity onPress={()=>navigation.navigate("settings")}>
                        <View style={styles.setting}>
                            <Ionicons style={styles.icon} name="settings" size={20} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("notification")}>
                        <View style={styles.setting}><Ionicons style={styles.icon2} name="notifications" size={20} color="black" /></View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.wallet}>
                        <Ionicons name='md-wallet' style={styles.icon23} size={25} />
                        <Text style={styles.walletText}>$200</Text>
                    </View>
                    <TouchableOpacity onPress={handlenavigation} style={styles.add}>
                        <Ionicons name='add' style={styles.icon1} size={30} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        width: "90%",
        marginLeft: "5%",
        height: 108,
        top: 15
    },
    img: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 20,
    },
    card_img: {
        width: 60,
        height: 80
    },
    username: {
        color: 'white',
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: 3,
        fontSize: 12
    },
    usernumber: {
        color: 'white',
        marginLeft: 10,
        fontWeight: 'bold',
        top: 5,
        fontSize: 12
    },
    card_last: {
        marginTop: 20,
        flexDirection: 'row',
        gap: 7,
        left: 265,
        top: -100
    },
    icon: {
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        top:1
    },
    setting: {
        width: 30,
        height: 30,
        backgroundColor: '#003090',
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#74CAFF',

    },
    icon2: {
        color: 'gold',
        left: 2
    },
    wallet: {
        width: 110,
        height: 35,
        backgroundColor: "#720123",
        top: -80,
        left: 150,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop:5
    },
    walletText: {
        fontSize: 15,
        color: 'white',
        fontWeight: "bold",
        left:-12
    },
    add: {
        width: 30,
        height: 30,
        backgroundColor: "green",
        left: 135,
        borderRadius: 15,
        top:-78
    },
    icon1: {
        textAlign: "center",
        alignItems: "center",
        color: "white",
        paddingLeft: 2,
        fontWeight: "bold",
    },
    icon23: {
        // right: 5,
        color: "yellow",
        left:-15,
    }
})