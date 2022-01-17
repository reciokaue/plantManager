import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Header from '../components/header';
import PlantCardPrimary from '../components/plantCardPrimary';
import EnviromentButton from '../components/enviromentButton';
import Load from '../components/load'

import api from '../services/api';
import { PlantProps } from '../libs/storage'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentsProps{
  key: string
  title: string
}

function PlantSelect() {
  const [ environments, setEnvironments ] = useState<EnvironmentsProps[]>([])
  const [ plants, setPlants ] = useState<PlantProps[]>([])

  const [environmentsSelected, setEnvironmentsSelected] = useState('all');
  const [ filteredPlants, setFilteredPlants ] = useState<PlantProps[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1);

  function handleSetFilter(environment: string){
    setEnvironmentsSelected(environment)
    
    if(environment == 'all')
    return setFilteredPlants(plants)
    
    const filtered = plants.filter(plant =>
      plant.environments.includes(environment)  
      );
      setFilteredPlants(filtered)
  }
  async function fetchPlants() {
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

    if(!data)
      return setLoading(true)
    if(page > 1){
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    }else{
      setPlants(data)
      setFilteredPlants(data)
    }

    setLoading(false)
    setLoadingMore(false)
  }
  function handleFetchMore(distance: number){
    if(distance < 1)
    return
    
    setLoadingMore(true)
    setPage(oldValue => oldValue + 1)
    fetchPlants()
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get('plants_environments?_sort=title&_order=asc')
      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data,
      ])
    }
    fetchEnviroment()
  }, []);
  useEffect(() => {
    fetchPlants()
  }, []);
  
  const navigation = useNavigation()

  function handleItem(plant: PlantProps){
      navigation.navigate('PlantSave', {plant})
  }


  if(loading)
    return <Load/>

  return (
    <SafeAreaView style={ styles.container }>
      <View style={styles.wrapper}>
        <Header/>
        <Text style={ styles.title }>Em qual ambiente</Text>
        <Text style={ styles.subtitle }>você quer colocar sua planta?</Text>
      </View>
      <View>
        <FlatList
          data={environments}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          renderItem={({ item }) => (
            <EnviromentButton 
              key={item.key} 
              active={item.key === environmentsSelected}
              onPress={() => handleSetFilter(item.key)}
              title={item.title}
            />
          )}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator style={{marginTop: 20}} color={colors.green}/>: <></>
          }
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.contentContainerStyle}
          data={filteredPlants.length == 0? plants: filteredPlants }
          renderItem={({ item }) => (
            <PlantCardPrimary
              key={item.id}
              data={item}
              onPress={() => handleItem(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginVertical: 32,
    marginLeft: 30,
    paddingRight: 60,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  contentContainerStyle: {
    paddingBottom: 40,
  },
  row: {
    flex: 1,
    justifyContent: "space-between"
  },
});

export default PlantSelect;
