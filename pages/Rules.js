import { View, Text, StyleSheet, TouchableOpacity,ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Rules() {
    const navigation = useNavigation();
    return (
        <View>
            <ImageBackground style={styles.backgroundImage} source={require('../assets/back.png')} />
            <View style={{ width: 60, height: 40 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
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
                <Text style={[styles.text, { fontSize: 30 }]}>How to Play??</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "white", textAlign:"justify" }}>
                        The ludo rules mainly include rolling the dice and moving
                        all the 4 pawns across the board to reach home. In this journey,
                        a pawn must kill the opponent’s pawns, absorb their points, earn
                        extra turns and even save their own selves to reach home.
                        Once all the 4 pawns of a player reach home, the player wins.
                        Online ludo, the ludo board game rules may change a little.
                        This is because ludo online is a limited time period game.
                        Each player gets a specific number of turns and a limited
                        time to play their turns. If they cannot play their turns
                        or miss their turns, they may end up losing the game and
                        even the cash prize. In addition, rules to play ludo are
                        also different online because each player gets a share of
                        the pot money based on their ranks to reach home.While
                        knowing the ludo game rules, it is important to know these
                        terms too, which are:
                    </Text>
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.itemText}>The coloured puck or piece that you
                            move across the board is called a “pawn”.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.itemText}>A device that rolls and shows
                            how many moves you will take is called the “dice”.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.itemText}>All four of your pawns must arrive
                            in the coloured "house" on the board before the game is over.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.itemText}>All pawns are protected in the “safe areas”
                            marked by the arrows on the tiles of the four house
                            colors—Red, Blue, Green, and Yellow.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.itemText}>All pawns are “safe zones” or “star tiles”
                            on tiles marked with stars. The board has 8 star tiles.</Text>
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "white", textAlign:'justify' }}>
                        Now, read the ludo rules you are here for in detail. 
                        Also download this ludo rules pdf to easily access it 
                        and to share with friends & family
                    </Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent:"center"
    },
    container: {
        height: 610,
        backgroundColor: "#391C1C",
        width: 330,
        // left:25,
        top: 50,
        borderWidth: 2,
        borderColor: "#8D8E4E",
        borderRadius: 30,
        padding:10
    },
    text: {
        fontWeight: "bold",
        color: "white",
        fontSize: 25
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    bullet: {
        marginRight: 5,
        fontSize: 15,
        color: 'white', // Adjust the color as needed
    },
    itemText: {
        fontSize: 13,
        color: 'white',
        textAlign:"justify",
        fontWeight:"bold" // Adjust the color as needed
    },
})