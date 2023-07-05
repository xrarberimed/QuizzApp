import { StyleSheet,View, Text } from 'react-native'
import React from 'react'
import Home from './screens/home'
import Quiz from './screens/quiz'
import Result from './screens/result'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MyStack from './navigation'

const App = () => {
  return (
    
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
  
  )
}

export default App;

const styles = StyleSheet.create({
container: {
  paddingTop: 40,
  paddingHorizontal: 16,
}
})