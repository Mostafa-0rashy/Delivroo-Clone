import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Categories from '@/components/Categories';
import Restaurants from '@/components/Restaurants';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
const index = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Categories />
        <Text style={styles.header}>Top Picks in your Neighborhood</Text>
        <Restaurants/>
        <Text style={styles.header}>Offers near You</Text>
      <Restaurants/>
      </ScrollView> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:80,
    backgroundColor: Colors.lightGrey,
    
  },
  header:{
    fontSize:18,
    fontWeight:'bold',
    marginHorizontal:16
  }
});

export default index;
