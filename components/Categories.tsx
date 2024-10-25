import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React from 'react';
import { categories } from '@/assets/data/home';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }} style={styles.tst}>
      {categories.map((category, index) => (
        <View style={styles.categoryCard} key={index}>
          <Link href={{ pathname: './Under Development' }}>
          <TouchableOpacity>
          <Image source={category.img} />
          <Text style={styles.categoryText}>{category.text}</Text>
          </TouchableOpacity>
          </Link>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  tst:{
    
  },
  categoryCard: {
    width: 100,
    height: 100,
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
  categoryText: {
    padding: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Categories;
