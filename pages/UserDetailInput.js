import { View, Text, StyleSheet, TextInput,TouchableOpacity, Alert,ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Background from '../components/Background'
import TopBackground from '../components/TopBackground';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserDetailInput() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [referallCode, setReferallCode] = useState("");
    const route = useRoute();
    const [phoneNumber, setPhoneNumber] = useState(route.params);
    const navigation = useNavigation();
    const changeEmail = (text)=>{
        setEmail(text);
    }
    const changeName = (text)=>{
        setName(text);
    }
    const changeReferallCode = (text)=>{
        setReferallCode(text);
    }
    const validation = ()=>{
        console.log(email)
        if(name === "" || email === ""){
            // Alert.alert("Please enter name");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        console.log(isValidEmail)
        if(isValidEmail){
            if(name.length < 5)
            {
                // Alert.alert("Please enter more than 5 characters in name")
                return false;
            }else return true;
        }else{
            // Alert.alert("Please enter valid email");
            return false;
        }
    }
    const submitData = ()=>{
        console.log(phoneNumber.phoneNumber.phone," phone number in userdetails ********************");
        if(validation()){
            console.log("fetch is running")
            fetch('http://192.168.1.19:5100/register',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name,email,mobile_number:phoneNumber.phoneNumber.phone,referallCode})
            }).then((result)=>{
                console.log(result.status)
                if(result.status === 201){
                    result.json().then( async(response)=>{
                        console.log(response);
                        await AsyncStorage.setItem('userId', response.userId.toString());
                        const userId = await AsyncStorage.getItem('userId');
                        console.log(userId);
                        navigation.navigate("menu");
                    })
                    // navigation.navigate("menu");
                }
            }).catch((error)=>{
                console.log(error)
            })
        }
        // navigation.navigate("menu");
    }
    return (
        <View>
            <Background></Background>
            <ImageBackground style={{top:0, width:"100%", height:300, backgroundColor: 'rgba(0, 0, 0, 0.1)'}} source={require('../assets/coins.png')} />   
            <TopBackground />
            <View style={styles.container}>
                <Text style={{ fontWeight: "bold", fontSize: 27, color: "white", top:-10 }}>User Details</Text>
                <TextInput value={name} onChangeText={changeName} style={styles.input} placeholder='please enter name' placeholderTextColor={"#A8A8A8"}></TextInput>
                <TextInput value={email} onChangeText={changeEmail} style={styles.input} placeholder='please enter email' placeholderTextColor={"#A8A8A8"}></TextInput>
                <TextInput value={referallCode} onChangeText={changeReferallCode} style={styles.input} placeholder='Referall Code(Optional)' placeholderTextColor={"#A8A8A8"}></TextInput>
                <TouchableOpacity style={styles.proceedButton} onPress={() => submitData()}>
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>Proceed</Text>
                </TouchableOpacity>
            </View>
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
        top: -460,
        left: 45,
        paddingTop: 60
    },
    input: {
        width: 255,
        height: 45,
        backgroundColor: "#720123",
        textAlign: "center",
        top: 15,
        marginBottom: 35,
        borderWidth: 1,
        borderColor: "#F5C601",
        borderRadius: 10,
        color:"white",
        fontSize:18,
        alignItems:"center",
        justifyContent:"center"
    },
    proceedButton: {
        width: 85,
        height: 40,
        backgroundColor: "#07F728",
        borderRadius: 25,
        borderColor: "white",
        borderWidth: 1,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    },
})