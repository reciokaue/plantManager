import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, Image } from 'react-native';

import colors from '../styles/colors';
import userImg from '../assets/userImg.png';
import fonts from '../styles/fonts';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Header() {
  const [name, setName] = useState<string>();

  useEffect(() => {
    getName()
  }, []);

  async function getName() {
    const user = await AsyncStorage.getItem('@plantmanager:user')
    setName(user || '')
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{name}</Text>
      </View>
      <Image style={styles.image} source={userImg}/>
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 50,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 40,
  },
});

export default Header;
