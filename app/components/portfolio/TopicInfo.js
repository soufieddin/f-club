import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors'
const TopicInfo = () => {
  //const percentColor = percent > 0 ? `${colors.green}` : `${colors.red}` || `${colors.white}`;

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.infoItem}>
            <Text style={styles.title}>Balance</Text>
            <Text style={styles.numberBig}>$ 4,512.20</Text>
            <View style={styles.percentContainer}>
              <Text style={styles.percent}>+1.8%</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.title}>Capital</Text>
            <Text style={styles.number}>$ 3,720.65</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.title}>Profit</Text>
            <Text style={styles.number}>$ 810 (All Time)</Text>
          </View>
          
        </View>
      </View>
    </View>
  )
}

export default TopicInfo

const styles = StyleSheet.create({
  view: {
    height:"25%",
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
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },  
  title: {
    fontSize: 18,
    color: colors.thirdly,
    fontWeight:"bold",
  },
  wrapper: {
    paddingHorizontal: 8,
    marginTop: 10
  },
  number: {
    fontSize: 16,
    fontWeight:"bold",
    color: colors.secondary,
  },
  numberBig: {
    fontSize: 24,
    fontWeight:"bold",
    color: colors.primary,
    width: "50%",
    textAlign: "center",
  },
  percentContainer: {
    paddingVertical:4,
    paddingHorizontal:8,
    backgroundColor: colors.green,
    borderRadius: 5,
  },
  percent: {
    fontSize: 16,
    color: colors.white,
    fontWeight:"bold",
  },
  label: {
    fontSize: 20,
    color: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 20,
    backgroundColor: colors.primary,
    marginTop: 20
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop:5,
    paddingBottom:10,
    borderColor: colors.border,
    borderBottomWidth: 1,
    marginBottom: 5,
    
  }
})