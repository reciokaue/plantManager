import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/core';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import Button from '../components/button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params{
  title: string
  subtitle: string
  buttonTitle: string
  icon: string
  nextScreen: string
}

function Confirmation() {
  const route = useRoute()
  const navigation = useNavigation()

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = route.params as Params

  function handleMoveOn(){
      navigation.navigate(nextScreen)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
        <View style={styles.footer}>
          <Button onPress={handleMoveOn}>{buttonTitle}</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30
  },
  emoji: {
    fontSize: 78
  },
  title: {
    fontSize: 22,
    lineHeight: 38,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 38,
    fontFamily: fonts.text,
    textAlign: 'center',
    color: colors.heading,
    paddingVertical: 10,    
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  }
});

export default Confirmation;
