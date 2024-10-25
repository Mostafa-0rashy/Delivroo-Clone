import { View, Text, Image, Dimensions, StyleSheet, SectionList, ListRenderItem } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { Link, Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { restaurant } from '@/assets/data/restaurant';
import { SetStateAction, useState } from 'react';
import useBasketStore from '@/store/basketStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
const { width } = Dimensions.get('window');
const IMG_Height = 300;
const Details = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const nav = useNavigation();
  const [activeIndex,setActiveIndex]=useState(0);
  const [sectionPoistions,setSectionPoistions]= useState<number[]>([])
  const selectCateogry = (index: number)=>
    {
      setActiveIndex(index);
      if(scrollRef.current)
        {
         
          scrollRef.current.scrollTo({y:sectionPoistions[index],animated:true})
        }

    };
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_Height / 2], [0, 1]),

    };
  });
  const headerAnimatedStyleTitle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [235, IMG_Height * 2], [0, 1]),

    };
  });
  const stickySegmentAnimatedStyleTitle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [235, IMG_Height * 4], [0, 4]),

    };
  });
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(scrollOffset.value, [-IMG_Height, 0, IMG_Height], [-IMG_Height / 2, 0, IMG_Height * 0.75]),
        },
        {
          scale: interpolate(scrollOffset.value, [IMG_Height, 0], [2, 1]),
        },
      ],
    };
  });

  const { restaurants } = useLocalSearchParams();
  const parsedRestaurant = typeof restaurants === 'string' ? JSON.parse(restaurants) : restaurants;
  const { name, tags } = parsedRestaurant;
  const {items,total}=useBasketStore();
  const DATA= restaurant.food.map((item,index)=>
  ({
    title: item.category,
    data:  item.meals,
    index
  }))

  const renderItem:ListRenderItem<any>=({item,index})=>
    (
      <Link href={{pathname:'/(modal)/dish',params:{id:item.id}}} asChild>
      <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:0,padding:16,backgroundColor:'#fff' }}>
        <View style={{flex:1}}>
          <Text style={styles.dishName}>{item.name}</Text>
          <Text style={styles.dishInfo}>{item.info}</Text>
          <Text style={styles.dishPrice}>${item.price}</Text>
        </View>
        <Image source={item.img} style={{width:80,height:80,borderRadius:5}}/>
      </TouchableOpacity>
      </Link>
    )
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <Animated.View style={[headerAnimatedStyle, { flexDirection: 'row' }]}>
            <TouchableOpacity onPress={() => nav.goBack()}>
              <Ionicons name="arrow-back-outline" size={25} color={Colors.primary} />
            </TouchableOpacity>
            
            <Animated.Text style={[styles.RestNameHeader, headerAnimatedStyleTitle, { flex: 1, textAlign: 'center' }]}>
              {parsedRestaurant.name}
            </Animated.Text>
            <View style={{ width: 55 }} />
          </Animated.View>
          ),
          headerBackground: () => <Animated.View style={[styles.header, headerAnimatedStyle]} />,
        }}
      />
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
      
        <Animated.Image source={parsedRestaurant.img} style={[styles.img, imageAnimatedStyle]} />
        <View style={{ backgroundColor:'#FAF9F6' }}>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text style={styles.restaurantDescription}>
          {parsedRestaurant.duration} · {tags.map((tag: any, index: number) => `${tag}${index < tags.length - 1 ? ' · ' : ''}`)}
          </Text>
          <Text style={styles.restaurantDescription}>{restaurant.about}</Text>
          <SectionList 
          scrollEnabled={false} 
          sections={DATA}
          SectionSeparatorComponent={()=><View style={{height:1,backgroundColor:Colors.grey}}/>}
          ItemSeparatorComponent={()=><View style={{height:1,backgroundColor:Colors.grey}}/>}
          renderItem={renderItem}
          renderSectionHeader={({section:{title,index}})=>
            
          <Text style={[styles.SectionHeader]} 
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            setSectionPoistions(prevPositions => {
              const newPositions = [...prevPositions];
              //TO BE MODIFIED//
              newPositions[0]=480
              newPositions[1]=1000
              newPositions[2]=1300
              newPositions[3]=1600
              newPositions[4]=2000
              newPositions[5]=2590
              newPositions[6]=3300
              newPositions[7]=3300

              return newPositions;
            });
          }}>
            {title}</Text>}>
           </SectionList>
         
        </View>
      </Animated.ScrollView>
      <Animated.View style={[stickySegmentAnimatedStyleTitle,styles.stickySegment]}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {restaurant.food.map((item,index)=>(
                <TouchableOpacity key={index} onPress={()=>selectCateogry(index)}>
                  <Text style={activeIndex==index?styles.activeStickySegmentItem:styles.stickySegmentItem}> {item.category} </Text>
                </TouchableOpacity>
              ))}
              </ScrollView>
            </Animated.View>
            
            {items>0 && (
      
    <View style={styles.footer}>  
    <SafeAreaView edges={['bottom']} style={{backgroundColor:'#fff'}}>
       <Link href={{pathname:'/(modal)/basket'}} asChild>
        <TouchableOpacity style={styles.footerBtn}>
        <Ionicons name="cart" style={styles.icon} size={25} color={'#fff'} />
        <Text style={styles.footertxt}>View Basket </Text>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>${total}</Text>
        </TouchableOpacity>
    </Link>
    </SafeAreaView>
  </View>


    )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  img: {
    width: width,
    height: IMG_Height,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderWidth: StyleSheet.hairlineWidth,
  },
    restaurantName: {
    fontSize: 30,
    margin: 16,
  },
  RestNameHeader:{
    fontSize:25,
    },
  restaurantDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.medium,
    padding:16
  },
  SectionHeader:{
    fontSize:22,
    fontWeight:'bold',
    margin:20
  },
  dishName:{
    fontWeight:'400',
    fontSize:17,
  },
  dishInfo:{
    color:'#a9a9a9',
    marginVertical:7
  },
  dishPrice:{
    color:'#a9a9a9'
  },
  stickySegment:
{
  position:'absolute',
  top:85,
  backgroundColor:'#fff',
  padding:20
},
stickySegmentItem:
{
  padding:10,
  color:Colors.primary
},
activeStickySegmentItem:
{
  padding:10,
  backgroundColor:Colors.primary,
  color:'#fff',
  fontWeight:"bold",
  borderRadius:22
},
footer:{
  position:'absolute',
  bottom:0,
  left:0,
  width:'100%',
  backgroundColor:'#fff',  
  paddingTop:10,
  padding:15,

},
footertxt:{
  fontSize:16,
  color:"#fff",
  marginBottom:5,
  fontWeight:'semibold'
},
footerBtn:{
  backgroundColor:Colors.primary,
  padding:24,
  borderRadius:8,
  elevation:5,
  shadowColor:'#000',
  shadowOffset:{width:0,height:-10},
  shadowOpacity:0.3,
  shadowRadius:10,
  flexDirection:'row', 
  justifyContent:'space-between',
  flex:1
},
icon:{
  
}
});

export default Details;
