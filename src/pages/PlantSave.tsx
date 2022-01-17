import React, { ReactNode, useState } from 'react';

import { View, Text, StyleSheet, Image, Platform, Alert, ScrollView} from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgFromUri } from 'react-native-svg'
import { useNavigation, useRoute } from '@react-navigation/core'
import WaterDrop from '../assets/waterdrop.png'
import Button from '../components/button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { format, isBefore } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PlantProps, savePlant } from '../libs/storage';
 
interface Params{
  plant: PlantProps
} 

function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date);
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

  const route = useRoute()
  const navigation = useNavigation()

  const { plant } = route.params as Params

  function handleChangeTime(event: Event, dateTime: Date | undefined){
    if(Platform.OS === 'android'){
      setShowDatePicker(!showDatePicker)
    }
    if(dateTime && isBefore(dateTime, new Date())){
      setSelectedDateTime(new Date())
      return Alert.alert('Escolha uma data no futuro 🕓')
    }
    if(dateTime)
      setSelectedDateTime(dateTime)
  }
  function handleOpenTimePickerAndroid(){
    setShowDatePicker(!showDatePicker)
  }

  async function handleSavePlant(){
    try{
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      })
      navigation.navigate('Confirmation',{
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado',
        buttonTitle: 'Muito obrigado 😉',
        icon: '🤗',
        nextScreen: 'MyPlants',
      })

    }catch{
      Alert.alert('Nao foi possivel salvar 😖')
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} width={150} height={150}/>
          <Text style={styles.title}>{plant.name}</Text>
          <Text style={styles.about}>{plant.about}</Text>
        </View>
        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image source={WaterDrop} style={styles.tipImage}/>
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>
          <Text style={styles.alertLabel}>alertLabel</Text>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode='time'
              display='spinner'
              onChange={handleChangeTime}
            />
          )}
          { Platform.OS === 'android' && 
              <TouchableOpacity style={styles.TimePickerButton} onPress={handleOpenTimePickerAndroid}>
                <Text style={styles.TimePickerText}>
                  {`Mudar Horario ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
          }
          <Button onPress={() => handleSavePlant()}>Cadastrar planta </Button>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.shape,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  about: {
    fontSize: 17,
    color: colors.heading,
    textAlign: 'center',
    fontFamily: fonts.text,
    marginTop: 10,
    marginBottom: 20,
  },
  controller: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 22,
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.blue,
    textAlign: 'justify',
  },
  alertLabel: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: fonts.complement,
    color: colors.heading,
    marginBottom: 5,
  },
  TimePickerButton:{
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  TimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  }
});

export default PlantSave;
