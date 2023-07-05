import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Result = ({navigation, route}) => {
  const params = route.params
  const {correctAnswers, wrongAnswers, successPercentage} = route.params
  console.log(params)

  /* const handleRestart = () => {
    navigation.navigate('Quiz');
  }*/

  const handleExit = () => {
    navigation.popToTop();
  }

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          source={require('../assets/Awards-amico.png')}
          style= {styles.banner}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.heading}>Result</Text>
      <View style={styles.resultContainer}>
        <TouchableOpacity>
        <Text style={styles.resultText}>Correct Answers: {correctAnswers}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.resultText}>Wrong Answers: {wrongAnswers}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.resultText}>Success Percentage: {successPercentage.toFixed(2)}%</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
      
        <TouchableOpacity style={styles.button} onPress={handleExit}>
          <Text style={styles.buttonText}> EXIT </Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 30,
    flex: 1
    //height: '100%'
  },
  banner:{
    height:300,
    width: 300
  },
  bannerContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#240046'
  },
  resultContainer: {
    borderWidth: 3,
    borderColor: '#FF8500',
    borderRadius: 10,
    padding: 20,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#240046'
  },
  bottom: {
    paddingVertical: 100,
    justifyContent: "space-between",
    //flexDirection: 'row',
  },
  button: {
    backgroundColor: '#240046',
    padding: 22,
    paddingHorizontal: 44,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white'
    
  },
});

export default Result;