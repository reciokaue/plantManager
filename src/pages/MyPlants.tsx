import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { loadPlants, PlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Header from '../components/header';
import Load from '../components/load';
import PlantCardSecondary from '../components/plantCardSecondary';

import waterDrop from '../assets/waterdrop.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
        const plantsStorage = await loadPlants()
        const nextTime = formatDistance(
          new Date(plantsStorage[0].dateTimeNotification).getTime(),
          new Date().getTime(), {locale: ptBR}
        )
        setNextWaterd(`Não esqueça de regar a ${plantsStorage[0].name} daqui ${nextTime}`)
        setMyPlants(plantsStorage)
        setLoading(false)
    } 
    loadStorageData()
  }, []);

  function handleRemove(plant: PlantProps){
    Alert.alert('Remover',`Deseja mesmo remover a ${plant.name}?`, [{
        text: 'Não 🙏',
        style: 'cancel',
      },{
        text: 'Sim 😥',
        onPress: async () =>{
          try {
              await removePlant(plant.id)              
              setMyPlants((oldData) => 
                oldData.filter((item) => item.id !== plant.id)
              )
          } catch (error) {
            Alert.alert('Não foi possivel remover 🤧')
          }
        }
      }
    ])
  }
  if(loading)
    return <Load/>

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.spotlight}>
        <Image style={styles.spotlightImage} source={waterDrop}/>
        <Text style={styles.spotlightText}>{nextWaterd}</Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Proximas regadas</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20, flex: 1 }}
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={(item) => (
            <PlantCardSecondary handleRemove={() => handleRemove(item.item)} data={item.item}/>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    color: '#fff',
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal:20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage:{  
    width: 60,
    height: 60,
  },
  spotlightText:{
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },  
  plants:{
    flex: 1,
    width: '100%',
  },
  plantsTitle:{
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,   
    marginVertical: 10,
  },
});

export default MyPlants;
