import {  Stack, useNavigation } from 'expo-router';
import CustomHeader from '@/components/Custom Header';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import React from 'react'
export default function RootLayoutNav() {
 const navigation= useNavigation();
 const [isModalvisvble,setIsmodalVisble]=useState(false);
 

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen name="index" 
          options={{ 
          header:()=><CustomHeader/>
         }} />
         <Stack.Screen name="(modal)/filter" 
         options={{
          headerTitle:'Filter' ,
          headerTitleAlign:'center',
          presentation:'modal',
          headerShadowVisible:false,
          headerStyle:{
            backgroundColor:Colors.lightGrey,
          },
          headerLeft:()=>(
            <TouchableOpacity  onPress={()=>{navigation.goBack()}}>
               <Ionicons name='close-outline' size={28} color={Colors.primary}>
               </Ionicons>
            </TouchableOpacity>



          )
        }}/>
        <Stack.Screen name="(modal)/location-search" 
         options={{
          headerTitle:'Search Location' ,
          headerTitleAlign:'center',
          presentation:'fullScreenModal',
          animation:'slide_from_bottom',
          headerShadowVisible:false,
          headerLeft:()=>(
            <TouchableOpacity  onPress={()=>{setIsmodalVisble(false),navigation.goBack()}} >
               <Ionicons name='close-outline' size={28} color={Colors.primary}>

               </Ionicons>
            </TouchableOpacity>



          )
        }}/>
     
        <Stack.Screen name="(modal)/dish" 
         options={{
          headerTitle:'' ,
          headerTransparent:true,
          headerLeft:()=>(
            <TouchableOpacity 
            style={{backgroundColor:'#fff',borderRadius:20,padding:5}}
            onPress={()=>{navigation.goBack()}}>
               <Ionicons name='close-outline' size={28} color={Colors.primary}>
               </Ionicons>
            </TouchableOpacity>



          )
        }}/>
        <Stack.Screen name="(modal)/basket" 
         options={{
          headerTitle:'   My Basket' ,
          headerLeft:()=>(
            <TouchableOpacity 
            style={{backgroundColor:'#fff',borderRadius:20,padding:5}}
            onPress={()=>{navigation.goBack()}}>
               <Ionicons name='arrow-back-outline' size={20} color={Colors.primary}>
               </Ionicons>
            </TouchableOpacity>



          )
        }}/>
      </Stack>
      </BottomSheetModalProvider>
      </GestureHandlerRootView>

  );
  
}
