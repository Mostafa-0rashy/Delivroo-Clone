import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const UnderDevelopment = () => {
  return (
    <View style={{flex:2}}>
        <LottieView style={{flex:1}}source={require('@/assets/Under Development.json')} autoPlay loop/>
        <View style={{flex:0.5}}>
        <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>Under Development!</Text>
        </View>
    </View>
  )
}

export default UnderDevelopment