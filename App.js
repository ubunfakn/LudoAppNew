import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Sing from './pages/Sing';
import PhoneOtp from './pages/PhoneOtp';
import LoginWithPhone from './pages/LoginWithPhone';
import PlayLocal from './pages/PlayLocal';
import PlayWithFriends from './pages/PlayWithFriends';
import LandingPage from './pages/LandingPage1';
import Tournament from './pages/Tournament';
import OnlineOffline from './pages/OnlineOffline';
import UserDetailInput from './pages/UserDetailInput';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import MultiplayerLudo from './pages/MultiplayerLudo';
import Rules from './pages/Rules';
import Ludo1 from './pages/Ludo1';
import Notification from './pages/Notification';
import 'react-native-screens';
import 'react-native-safe-area-context';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar translucent={false} />
      <Stack.Navigator>
        <Stack.Screen name="Land" options={{ headerShown: false }} component={LandingPage} />
        <Stack.Screen name="board" options={{ headerShown: false }} component={Ludo1} />
        <Stack.Screen name="Sing" options={{ headerShown: false }} component={Sing} />
        <Stack.Screen name="phone" options={{ headerShown: false }} component={LoginWithPhone} />
        <Stack.Screen name="otp" options={{ headerShown: false }} component={PhoneOtp} />
        <Stack.Screen name="userdetails" options={{ headerShown: false }} component={UserDetailInput} />
        <Stack.Screen name='playOnline' options={{ headerShown: false }} component={Tournament} />
        <Stack.Screen name='menu' options={{ headerShown: false }} component={OnlineOffline} />
        <Stack.Screen name='playlocal' options={{ headerShown: false }} component={PlayLocal} />
        <Stack.Screen name='playwithfriends' options={{ headerShown: false }} component={PlayWithFriends} />
        <Stack.Screen name='wallet' options={{ headerShown: false }} component={Wallet} />
        <Stack.Screen name='settings' options={{ headerShown: false }} component={Settings} />
        <Stack.Screen name='rules' options={{ headerShown: false }} component={Rules} />
        <Stack.Screen name='notification' options={{headerShown:false}} component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
