import { StyleSheet, StatusBar } from 'react-native';
import Screen from '../components/general/Screen';
import colors from '../config/colors'
import Assets from '../components/portfolio/Assets'
import React, {useState }from 'react'
import ActivityIndicator from '../components/general/ActivityIndicator';

export default function WalletScreen() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <Assets setLoading={setLoading} />
      </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
})
