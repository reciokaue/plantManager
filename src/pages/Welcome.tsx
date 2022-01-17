import React from 'react'
import {
    SafeAreaView,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    View
} from 'react-native'

import {
    Feather
} from "@expo/vector-icons"

import wateringImg from '../assets/watering.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { useNavigation } from '@react-navigation/core'

function Welcome(){
    const navigation = useNavigation()

    function handleStart(){
        navigation.navigate('UserIdentification')
    }

    return(
        <View style={styles.wrapper}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    Gerencie{'\n'}
                    suas plantas de{'\n'}
                    forma fácil
                </Text>
                <Image
                    style={styles.image}
                    source={wateringImg}
                    resizeMode="contain"
                />
                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas  plantas.
                    Nós cuidamos de lembrar você sempre que precisar
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={handleStart}
                >
                    <Feather
                        name={'chevron-right'}
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 28,
        fontFamily: fonts.heading,
        lineHeight: 34,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },
    image: {
        height: Dimensions.get('window').width * 0.7,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: fonts.text,
        paddingHorizontal: 20,
        color: colors.heading
    },
    button: {
        backgroundColor:  colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    },
    buttonIcon: {
        fontSize: 32,   
        color: colors.white
    }
})

export default Welcome;
