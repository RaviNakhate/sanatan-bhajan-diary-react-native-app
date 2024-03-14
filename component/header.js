// Header.js

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <StatusBar backgroundColor="#ff9933" barStyle="light-content" />
      <View style={styles.leftContainer}>

        <Text style={styles.appName}>श्री नगर मित्र मंडल</Text>
      </View>
      
        <TouchableOpacity onPress={() => {
          navigation.navigate('search');
        }}>
          <Ionicons name="search" size={22} color="#fff" />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ff9933',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 10,
  },
  appName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:3
  },
});

export default Header;
