import React, { ReactNode } from 'react';

import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

function Button({ children, ...rest}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.title}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontFamily: fonts.heading,
  },
});

export default Button;
