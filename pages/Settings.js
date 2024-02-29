import { View, Text, StyleSheet, ImageBackground, Switch,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
    const [isMusicEnabled, setMusicEnabled] = useState(false);
    const [isSoundEnabled, setSoundEnabled] = useState(false);
    const navigation = useNavigation();

    const toggleSwitchForMusic = () => {
        setMusicEnabled(previousState => !previousState);
    };
    const toggleSwitchForSound = () => {
        setSoundEnabled(previousState => !previousState);
    };
    return (
        // disabled={showAddMoney || showPaymentMethod ? true : false} onPress={() => navigation.navigate("playOnline")}
        <View>
            <ImageBackground style={styles.backgroundImage} source={require('../assets/back.png')} />
            <View style={{ width: 60, height: 40 }}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <LinearGradient
                        colors={['#EE2121', '#FF0000']}
                        start={[0, 0]}
                        end={[1, 0]}
                        locations={[0.3376, 0.9599]}
                        style={{ width: 30, height: 30, borderRadius: 60, alignItems: "center", left: 20, marginTop: 20 }}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, top: -4 }}>&lt;</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={{ top: 20, alignItems: 'center' }}>
                <Text style={[styles.text, { fontSize: 30 }]}>Settings</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: "column" }}>
                        <View style={styles.tabs}>
                            <Ionicons name='musical-note-outline' color={"white"} size={30} style={{ left: 20, top: 2 }} />
                            <Text style={[styles.text, { left: 40 }]}>Music</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isMusicEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchForMusic}
                                value={isMusicEnabled}
                                style={{ left: 130 }}
                            />
                        </View>
                        <View style={styles.tabs}>
                            <Ionicons name='volume-high-outline' color={"white"} size={30} style={{ left: 20, top: 2 }} />
                            <Text style={[styles.text, { left: 40 }]}>Sounds</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isSoundEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchForSound}
                                value={isSoundEnabled}
                                style={{ left: 112 }}
                            />
                        </View>
                        <TouchableOpacity style={styles.tabs}>
                            <Ionicons name='person' color={"white"} size={30} style={{ left: 20, top: 2 }} />
                            <Text style={[styles.text, { left: 40 }]}>My Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabs} onPress={()=>navigation.navigate("wallet")}>
                            <Ionicons name='wallet-outline' color={"white"} size={30} style={{ left: 20, top: 2 }} />
                            <Text style={[styles.text, { left: 40 }]}>My Wallet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabs}>
                            <Ionicons name='people' color={"white"} size={30} style={{ left: 20, top: 2 }} />
                            <Text style={[styles.text, { left: 40 }]}>Refer & Earn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabs} onPress={()=>navigation.navigate("rules")}>
                            <Ionicons name='cube' color={"white"} size={30} style={{ left: 20, top: 2 }} />
                            <Text style={[styles.text, { left: 40 }]}>How to Play</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabs}>
                            <Ionicons name='help-circle' color={"white"} size={30} style={{ left: 20, top: 2 }} />
                            <Text style={[styles.text, { left: 40 }]}>Help Desk</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoutButton}>
                        <TouchableOpacity >
                            <Text style={styles.text}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        resizeMode: 'cover',
        position: 'absolute',
        width: "100%",
        height: 840,
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
    },
    container: {
        height: 600,
        backgroundColor: "#391C1C",
        width: 330,
        // left:25,
        top: 50,
        borderWidth: 2,
        borderColor: "#8D8E4E",
        borderRadius: 30
    },
    tabs: {
        backgroundColor: "#720123",
        width: "95%",
        height: 45,
        borderColor: "#F5C601",
        borderWidth: 2,
        borderRadius: 10,
        left: 8,
        marginTop: 30,
        flexDirection: "row"
    },
    text: {
        fontWeight: "bold",
        color: "white",
        fontSize: 25
    },
    logoutButton: {
        width: 100,
        height: 50,
        backgroundColor: "#017C0E",
        top: 45,
        left: 115,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "white"
    }
})