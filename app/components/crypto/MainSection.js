import { StyleSheet, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors'

const MainSection = () => {
  return (
    <View style={styles.main}>
      <View style={styles.mainWrapper}></View>
    </View>
  )
}

export default MainSection

const styles = StyleSheet.create({
  main: {
    height: "63%",
  },
  mainWrapper: {
    backgroundColor: colors.white,
    height: '100%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
})