import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

function UserIdentification() {
  const [ isFocused, setFocused] = useState(false)
  const [ isFilled, setFilled] = useState(false)
  const [ name, setName] = useState<string>()

  const navigation = useNavigation()

  function handleInputBlur(){
    setFocused(false)
    setFilled(!!name)
  }
  function handleInputFocus(){
    setFocused(true)
  }
  function handleInputChange(value: string){
    setFilled(!!value)
    setName(value)
  }
  async function handleSubmit(){
      if(!name){
        return Alert.alert('Me diz como devo te chamar 😅')
      }else try{
        await AsyncStorage.setItem('@plantmanager:user', name);
        (navigation.navigate('Confirmation',{
          title: 'prontinho',
          subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
          buttonTitle: 'Começar',
          icon: '😁',
          nextScreen: 'PlantSelect',
        }))
      }catch{
        return Alert.alert('Não foi possivel salvar o seu nome 😅')
      }
      //Deixar o alert mais bonito
  }

  return (
    <SafeAreaView style={ styles.container }>
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding': 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={{alignItems: 'center'}}>
                <Text style={ styles.emoji}>
                  {isFilled? '😁':'😀'}
                </Text>
                <Text style={ styles.title}>
                  Como podemos {'\n'}
                  chamar você
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                ( isFocused || isFilled) && {borderColor: colors.green}
                ]}
                placeholder='digite um nome'
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={styles.footer}>
                <Button onPress={handleSubmit}>Confirmar</Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 54,
  },
  emoji: {
    fontSize: 44
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    fontSize: 18,
    fontFamily: fonts.text,
    color: colors.heading,
    textAlign: 'center',
    width: '100%',
    padding: 10,
    marginTop: 50,
  },
  footer: {
    marginTop: 40,
    width:'100%',
    paddingHorizontal: 20,
  }
});

export default UserIdentification;
