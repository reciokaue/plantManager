import React from 'react';

import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardPrimaryProps extends RectButtonProps{
  data: {
    name: string
    photo: string
  }
}

function PlantCardPrimary({ data, ...rest }: PlantCardPrimaryProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri width={70} height={70} uri={data.photo}/>
      <Text style={ styles.title }>{data.name}</Text>
    </RectButton>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.heading,
    color: colors.green_dark,
    marginVertical: 16,
  },
});

export default PlantCardPrimary;
