import { StyleSheet, StatusBar } from 'react-native';
import Screen from '../components/general/Screen';
import colors from '../config/colors'
import TopicInfo from '../components/portfolio/TopicInfo'
import Assets from '../components/portfolio/Assets'
import React from 'react'
export default function WalletScreen() {

  return (
    <Screen style={styles.container}>
      <TopicInfo />
      <Assets />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
})
