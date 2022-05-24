import { View, StyleSheet } from 'react-native';
import Screen from '../components/general/Screen';
import SearchSection from '../components/general/SearchSection';
import colors from '../config/colors'

export default function StocksScreen() {
  const handleChange = (text) => {
    const formatQuery = text.toLowerCase();
    console.log(formatQuery);
  }

  return (
    <Screen style={styles.container}>
      <SearchSection onChangeText={handleChange} placeholder="Search a stock..." />
      <View style={styles.mid}></View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
  },
  mid: {
    backgroundColor: colors.white, 
    height: '88%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 8,
  },
})
