import { View, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../config/colors'

const MidSection = () => {
  return (
    <View style={styles.mid}>
      <View style={styles.midWrapper}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  mid: {
    marginVertical: 20,
    height: "12%",
    paddingHorizontal: 8,
  },
  midWrapper: {
    backgroundColor: colors.white,
    height: '100%',
  }
})

export default MidSection