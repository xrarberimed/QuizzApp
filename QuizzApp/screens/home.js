import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Title from '../components/title'



const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Title/>
      <View style={styles.bannerContainer}>
        <Image
          source={require('../assets/Shrug-amico.png')}
          style= {styles.banner}
          resizeMode="contain"
        />
  
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Quiz')} style={styles.button}>
        <Text style= {styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  banner:{
    height:300,
    width: 300
  },
  bannerContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container:{
    paddingTop: 40,
    paddingHorizontal: 30,
    height: '100%'
  },
  button: {
    width: '100%',
    backgroundColor: '#240046',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 50
  },
  buttonText: {
    fontSize: 21,
    fontWeight: '600',
    color: 'white'
    
  }
})