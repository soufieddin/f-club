import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors'
const TopicInfo = () => {
  //const percentColor = percent > 0 ? `${colors.green}` : `${colors.red}` || `${colors.white}`;

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.title}>Current Balance</Text>
            <Text style={styles.price}>$ 4,512.20</Text>
            <Text style={styles.refund}>$ 810 (All Time)</Text>
          </View>
          <View style={styles.percentContainer}>
            <Text style={styles.percent}>+1.8%</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default TopicInfo

const styles = StyleSheet.create({
  view: {
    height:"20%",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 8,
    marginTop: 10

  },
  container: {
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    height: "100%",
    width: "100%",
  },
  wrapper: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },  
  title: {
    fontSize: 20,
    color: colors.primary,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  price: {
    fontSize: 32,
    fontWeight:"bold",
    color: colors.primary,
    marginVertical:5,
  },
  percentContainer: {
    paddingVertical:8,
    paddingHorizontal:12,
    backgroundColor: colors.green,
    borderRadius: 5,
  },
  percent: {
    fontSize: 16,
    color: colors.white,
  }, 
  refund: {
    fontSize: 16,
    color: colors.thirdly,
  },
  label: {
    fontSize: 20,
    color: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 20,
    backgroundColor: colors.primary,
    marginTop: 20
  },
})