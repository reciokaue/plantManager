import React from 'react';

import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

function EnviromentButton({ title, active = false, ...rest}: ButtonProps) {
  return (
    <RectButton style={[styles.container, active && styles.containerActive]} {...rest}>
      <Text style={[styles.title, active && styles.titleActive]}>{title}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  title: {
    fontSize: 16,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 40,
  },
  titleActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
});

export default EnviromentButton;