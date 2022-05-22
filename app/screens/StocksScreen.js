import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/general/Screen';
import colors from '../config/colors'

export default function StocksScreen() {

  return (
    <Screen style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>Stocks</Text>
      </View>
      <View style={styles.mid}>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
  },
  top: {
    backgroundColor: colors.primary,
    height: '20%',
    justifyContent:"center",
    alignItems:"center",
  }, 
  mid: {
    backgroundColor: colors.white, 
    height: '80%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  text: {
    color: colors.white,
    fontSize:24,
    fontWeight:"bold"
  }
})
