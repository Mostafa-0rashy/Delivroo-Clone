import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { restaurants } from '@/assets/data/home';
import { Link, useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';
const Categories = () => {
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}>
      {restaurants.map((restaurant, index) => (
        <Link key={index} href={{pathname:"/details",params:{restaurants:JSON.stringify(restaurant)}}} asChild >
          <TouchableOpacity>
            <View style={styles.categoryCard}>
              <Image source={restaurant.img} style={styles.img} />
              <View style={styles.cateogryBox}>
                <Text style={styles.nametxt}>{restaurant.name}</Text>
                <Text style={{ color: Colors.green }}>{restaurant.rating} {restaurant.ratings}</Text>
                <Text style={{ color: Colors.medium }}>{restaurant.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
    backgroundColor: '#fff',
    marginEnd: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  img: {
    flex: 5,
    width: undefined,
  },
  cateogryBox: {
    flex: 2,
    padding: 5,
  },
  nametxt: {
    padding: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Categories;
