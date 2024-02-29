import { View, Text, Image } from 'react-native'
import React from 'react'

export default function TopBackground() {
  return (
    <View>
      <Image style={{top:-140}} source={require('../assets/top_background.png')}/>
    </View>
  )
}