import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QuizzApp</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#240046'
  },
  container: {
    marginTop: 20,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center' 
  }
})