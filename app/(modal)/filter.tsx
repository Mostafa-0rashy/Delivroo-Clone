import { View, Text, StyleSheet, ListRenderItem, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import categoriesData from '@/assets/data/filter.json'
import { Ionicons } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated'; 

interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const itemHeader = () => (
  <>
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name='arrow-down-outline' size={30} color={Colors.primary} />
        <Text style={{ flex: 1 }}>Sort</Text>
        <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name='fast-food-outline' size={30} color={Colors.primary} />
        <Text style={{ flex: 1 }}>Hygeine Rating</Text>
        <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name='pricetag-outline' size={30} color={Colors.primary} />
        <Text style={{ flex: 1 }}>Offers</Text>
        <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name='nutrition-outline' size={30} color={Colors.primary} />
        <Text style={{ flex: 1 }}>Dietary</Text>
        <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>
    <Text style={styles.header}>Categories</Text>
  </>
);

const Filter = () => {
  const nav = useNavigation();
  const [items, setItems] = useState<Category[]>(categoriesData);
  const [selected,setSelected]=useState<Category[]>([]);
  const flexWidth=useSharedValue(0);
  const borderwidth=useSharedValue(0);
  useEffect(()=>
  {
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length >0;
    
        flexWidth.value=newSelected?150:0;
        borderwidth.value=newSelected?0.5:0;
      setSelected(selectedItems);
  },[items])
  
  const handleClearAll =  ()=>
    {
      const updatedItems=items.map((item)=>
      {
        item.checked=false;
        return item;

      })
      setItems(updatedItems);
    } 
    const animatedStyles= useAnimatedStyle(()=>{
      {
        return{
          width:withTiming(flexWidth.value),
          borderWidth:withTiming(borderwidth.value)
        };

      }});



  const renderItem: ListRenderItem<Category> = ({ item,index}) => (
    <View style={styles.row}>
      <Text>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
         isChecked={items[index].checked}
        fillColor={Colors.primary}
        iconStyle={{ borderColor: Colors.primary, borderRadius: 4, marginLeft:20 }}
        innerIconStyle={{ borderRadius: 4 }}
        onPress={()=>
        { 
          const isChecked=items[index].checked
          const updateItems = items.map((item)=>
            { if(item.name==items[index].name)
              {
                item.checked=!isChecked;
              }
              return item;

            }
            
          )
          setItems(updateItems);

        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderItem} ListHeaderComponent={itemHeader} />
      <View style={{ height: 87 }} />
      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          <Animated.View style={[animatedStyles,styles.outlineBtn]}>
      <TouchableOpacity  onPress={handleClearAll}>
          <Text style={styles.outlineBtnTxt}>Clear All</Text>
        </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.fullBtn} onPress={() => nav.goBack()}>
          <Text style={styles.btnText}>Done</Text>
        </TouchableOpacity>
      </View>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    padding: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    padding: 6,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    backgroundColor: '#fff',
  },
  fullBtn: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 7,
    alignItems: 'center',
    height:56,
    width:150
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemContainer: {
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderColor: Colors.grey,
    marginBottom: 3,
    borderBottomWidth: 0.7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  btnContainer:
  {
    flexDirection:'row',
    gap:10,
    justifyContent:'center',
    flex:1
  },
  outlineBtn:
  {
    padding: 16,
    borderRadius: 7,
    alignItems: 'center',
    borderColor:Colors.primary,
    height:56

  },
  outlineBtnTxt:
  {
    color: Colors.primary,
    fontWeight: 'bold',
  }
});

export default Filter;
