import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import useBasketStore, { Product } from '@/store/basketStore'
import { FlatList } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location'
const Basket = () => {
    const { products, total, clearCart, reduceProduct,addProduct } = useBasketStore();
    const [order, setOrder] = useState(false);
    const FEES = {
        service: 2.99,
        delivery: 4.99
    };

    let Total = 0;
    if (total > 0) {
        Total = FEES.delivery + FEES.service + total;
    }

    const checkout = () => {
        clearCart();
        setOrder(true);
    };
    const  initialRegion={
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      } 
    

    const reduce = (product: Product) => {
        reduceProduct(product);
    };
    const add = (product: Product) => {
        addProduct(product);
    };
    const [location,setLocation]=useState(initialRegion);
    const[errorMsg,setErrorMsg]=useState('null');
    useEffect(()=>{
    _getlocation();
},[])
      
      const _getlocation=async ()=>
      {
        try{
          let {status}=await Location.requestForegroundPermissionsAsync();
          if(status!=='granted')
          {
            setErrorMsg('Permission to access location is denied');
            return;
          }
      
          let location1 = await Location.getCurrentPositionAsync({});
          setLocation({
            latitude: location1.coords.latitude,
            longitude: location1.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        
        }
      catch (err)
      {
        console.warn(err);
      }
       
      }
      
    return (
        <>
            {order && (
                <>
                <View style={{flex:1}}>
                 <LottieView style={{flex:1}}source={require('@/assets/Confetti.json')} autoPlay loop/>
                     <View style={{bottom:'50%',left:'20%'}}>
                        <Text style={styles.placedOrderTxt}>Your Order Is Placed!</Text>
                        <Link href={{ pathname: '/' }} asChild>
                            <TouchableOpacity style={styles.NewOrderBtn}>
                                <Text style={styles.footertxt}>New Order?</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                 </View>
                </>
            )}

            {!order && (
                <>
                    {total === 0 ? (
                        <View style={{ alignItems: 'center', marginTop: '80%' }}>
                            <Link href={{ pathname: '/' }} asChild>
                            <TouchableOpacity style={styles.NewOrderBtn}>
                                <Text style={styles.footertxt}>Start Shopping !</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                    ) : (
                        <View>
                            <FlatList
                            data={products}
                            ListHeaderComponent={<Text style={{fontSize:25,fontWeight:'bold',margin:10}}>Your Items</Text>}
                            ItemSeparatorComponent={()=><View style={{height:1,backgroundColor:Colors.grey}}></View>}
                            renderItem={({item})=>(
                                <View style={styles.row}>
                                <Text style={{fontSize:18,color:Colors.primary}}>{item.quantity}x </Text>
                                <Text style={{fontSize:18,flex:1}}>{item.name}</Text>   
                                <TouchableOpacity onPress={()=>add(item)}><Ionicons name="add-circle-outline" size={25} style={{color:Colors.primary}}></Ionicons></TouchableOpacity> 
                                <TouchableOpacity onPress={()=>reduce(item)}><Ionicons name="remove-circle-outline" size={25} style={{color:Colors.primary}}></Ionicons></TouchableOpacity>
                                <Text style={styles.price}>${(item.price*item.quantity)}</Text>                             
                                </View>
                            )}
                            ListFooterComponent={
                                <View>
                                    <View style={styles.totalRow}>
                                        <Text style={styles.flatlistfootertxt}>Subtotal</Text>
                                        <Text style={styles.price}>${total.toFixed(2)}</Text>
                                        
                                    </View>
                                    <View style={styles.totalRow}>
                                        <Text style={styles.flatlistfootertxt}>Servicee Fee</Text>
                                        <Text style={styles.price}>${FEES.service}</Text>
                                        
                                    </View>
                                    <View style={styles.totalRow}>
                                        <Text style={styles.flatlistfootertxt}>Delivery Fee</Text>
                                        <Text style={styles.price}>${FEES.delivery}</Text>
                                        
                                    </View>
                                    <View style={styles.totalRow}>
                                        <Text style={styles.flatlistfootertxt}>Order Total</Text>
                                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                                            ${ (FEES.delivery + FEES.service + total).toFixed(2) }
                                            </Text>                                        
                                    </View>
                                    <View style={{flex:1}}>
                                    <Text style={{fontSize:20,padding: 10,fontWeight:'bold',textAlign:'center',backgroundColor:'#fff',color:Colors.primary}}>Delivery To</Text>
                                    <MapView style={{width:Dimensions.get('window').width,
                                     height:Dimensions.get('window').height/2 }}
                                    provider={PROVIDER_GOOGLE}
                                    showsUserLocation={true}
                                    showsMyLocationButton={true}
                                    showsTraffic
                                     />                                     
                                    </View>
                                </View>
                            }
                            >
                            
                            </FlatList>
                        </View> 
                          
                    )}
                    {total>0&&(<View style={styles.footer}>
                        <TouchableOpacity style={styles.footerBtn} onPress={checkout}>
                            <Text style={styles.footertxt}>Place Order!</Text>
                        </TouchableOpacity>
                    </View>)}
                    
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        gap: 10
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 10,
        padding: 16,
    },
    footertxt: {
        fontSize: 18,
        color: "#fff",
        marginBottom: 5,
        fontWeight: 'bold',
    },
    footerBtn: {
        backgroundColor: Colors.primary,
        padding: 24,
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1
    },
    NewOrderBtn: {
        backgroundColor: Colors.primary,
        padding: 24,
        paddingHorizontal: 16,
        width: 250,
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:16
    },
    placedOrderTxt: {
        fontSize: 26,
        fontWeight: 'bold',
        
    },
    price:
    {
        fontSize:18
    },
    flatlistfootertxt:{
        fontSize:18,
        color:'#808080'
    }
});

export default Basket;
