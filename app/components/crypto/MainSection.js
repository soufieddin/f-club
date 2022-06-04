import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import colors from '../../config/colors'
import RangeTabs from '../general/RangeTabs'
import NewsTabs from '../general/NewsTabs'
import Chart from '../general/Chart'
import Info from './Info'
const MainSection = ({days, setDays, selected, label, setLabel, history, price, lastUpdate, result}) => {
  return (
    <View style={styles.main}>
      <View style={styles.mainWrapper}>
        <Text style={styles.text}>{selected}</Text>
        { selected === "chart" ? <RangeTabs days={days} setDays={setDays} /> :  selected === "news" ? <NewsTabs label={label} setLabel={setLabel} /> : <></>}
        { selected === "chart" ? <Chart history={history} price={price} lastUpdate={lastUpdate}/> : selected==="info" ? <Info result={result}/> : <></>}
      </View>
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
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  text: {
    color: colors.primary,
    fontSize: 18,
    fontWeight:"bold",
    textTransform: "capitalize",
  }
})