import { Feather } from '@expo/vector-icons';
import React from 'react';

import { Text, StyleSheet, View, Animated } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardPrimaryProps extends RectButtonProps{
  data: {
    name: string
    photo: string
    hour: string
  }
  handleRemove: () => void
}

function PlantCardSecondary({ data, handleRemove, ...rest }: PlantCardPrimaryProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton onPress={handleRemove} style={styles.removeButton}>
              <Feather name="trash" size={32} color={colors.white}/>
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri width={50} height={50} uri={data.photo}/>
        <Text style={ styles.title }>{data.name}</Text>
        <View style={styles.details}>
          <Text style={ styles.timeLabel }>Regar as</Text>
          <Text style={ styles.time }>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}
 
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.shape,
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading,
  },
  details: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
  removeButton: {
    width: 100,
    height: 85,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 15,
    borderRadius: 20,
    right: 15,
    paddingLeft: 15, 
  }
});

export default PlantCardSecondary;
