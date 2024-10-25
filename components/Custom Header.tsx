import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBottomSheet from './CustomBottomSheet';

const CustomHeader = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null); // Reference to your custom BottomSheet

  const openBottomSheet = () => {
    bottomSheetRef.current?.present(); // Call expand on the bottom sheet
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>    
        <TouchableOpacity onPress={openBottomSheet}>
          <Image style={styles.bike} source={require('@/assets/images/Delivery_Bike.jpg')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.header} onPress={openBottomSheet}>
          <Text style={styles.headertext}>Delivery. To</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.subtitle}>Cairo </Text>
            <Ionicons name="chevron-down-outline" size={20} color={Colors.primary} style={{ paddingTop: 3 }} />
          </View>
        </TouchableOpacity>
        <Link href={{ pathname: './Under Development' }}>
          <TouchableOpacity style={styles.profilebtn}>
            <Ionicons name="person-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </Link>
        <CustomBottomSheet ref={bottomSheetRef} content={''} />
      </View>
      <Searchbar />
      
      {/* Custom Bottom Sheet */}
      
    </SafeAreaView>
  );
};

const Searchbar = () => {
  return ( 
    <View style={styles.searchbar}>
      <View style={styles.searchSection}>
        <View style={styles.searchField}>
          <Ionicons name="search" size={25} color='#9F9AA1' style={{ padding: 5 }} />
          <TextInput 
            placeholder="Restaurants, groceries, dishes, etc" 
            style={styles.searchText} 
          />
        </View>
        <Link href={'/(modal)/filter'} asChild>
          <TouchableOpacity style={styles.optionBtn}>
            <Ionicons name="options-outline" size={20} color={Colors.primary} style={{ paddingTop: 3 }} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  bike: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  header: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  headertext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#808080',
  },
  profilebtn: {
    padding: 10,
    backgroundColor: Colors.lightGrey,
    borderRadius: 50,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchbar: {
    height: 60,
    backgroundColor: '#fff'
  },
  searchSection: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchField: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  optionBtn: {
    padding: 10,
    borderRadius: 50,
  },
  searchText: {
    color: '#424242',
  }
});

export default CustomHeader;
