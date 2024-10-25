import { View, Text,StyleSheet,Image } from 'react-native'
import React, { useState } from 'react'
import {  useLocalSearchParams } from 'expo-router'
import { getDishById } from '@/assets/data/restaurant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, FadeInLeft, } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useBasketStore from '@/store/basketStore';
import * as Haptics from 'expo-haptics';
const dish = () => {
    const nav=useNavigation();
    const{id}=useLocalSearchParams();
    const item=getDishById(+id);
    const [count, setCount] = useState(0);
    const {addProduct}=useBasketStore();
    const incrementVal = () => {
        setCount(count + 1);
    };

    const decrementVal = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const addToCart=()=>
        {
            for (let i = 0; i < count; i++) {
            addProduct(item!);
            }
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            nav.goBack();
            
        }

  return (
   <SafeAreaView style={{flex:1}}edges={['bottom']}>
   <View style={styles.container}>
        <Animated.Image style={styles.image} source={item?.img} entering={FadeIn.duration(500).delay(200)}/>
        <View style={{padding:20}}>
      <Animated.Text style={styles.dishName} entering={FadeInLeft.duration(500).delay(250)}>{item?.name}</Animated.Text>
      <Animated.Text style={styles.dishInfo} entering={FadeInLeft.duration(500).delay(350)}>{item?.info}</Animated.Text>
      </View>
        <Animated.View style={styles.footer} entering={FadeInDown.duration(500).delay(650)}>
            
            <View style={styles.iconsRow}>
            <TouchableOpacity onPress={incrementVal}>
                <Ionicons name="add" style={styles.icons} size={50}></Ionicons>
            </TouchableOpacity>
            <Text style={{fontSize:30}}>{count}</Text>
            <TouchableOpacity onPress={decrementVal}>
                <Ionicons name="remove" style={styles.icons} size={50}></Ionicons>
            </TouchableOpacity>
            </View>
            
            <View style={{flex:1,width:'100%'}}>
            <TouchableOpacity style={styles.footerBtn} onPress={addToCart} >
                <Text style={styles.btnTxt}>Add to Cart for ${item?.price}</Text>
            </TouchableOpacity>
            </View>
            
        </Animated.View>
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({


    container:{
        flex:1,
        overflow: 'visible'
    },

    image:{
        width:'100%',
        height:300

    },
    dishName:{
        fontSize:24,
        fontWeight:'bold',
        
    },
    dishInfo:{
        fontSize:16,
        color:'#777',
        marginTop:12

    },
    footer:{
        position:'absolute',
        bottom:0,
        left:0,
        width:'100%',
        padding:10,
        elevation:5,
        shadowColor:'#000',
        shadowOffset:{width:0,height:-10},
        shadowOpacity:0.1,
        shadowRadius:10,
        backgroundColor:'#fff',
        paddingTop:20,
        },
    footerBtn:{
    backgroundColor:Colors.primary,
    padding:16,
    alignItems:'center',
    borderRadius:8,
    marginBottom:10,

    },
    btnTxt:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold'
    },
    icons:{
        color:Colors.primary,
    },
    iconsRow:{
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 20, 
        paddingHorizontal: 10, 
    }

})

export default dish