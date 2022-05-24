import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import colors from '../../config/colors'

const RangeTabs = ({days, setDays}) => {

  const handlePress = (amount) => {
    setDays(amount)
  }
  return (
    <View style={styles.tabsWrapper}>
      <TouchableWithoutFeedback onPress={()=>handlePress("1")}>
          <View style={[styles.btn, {backgroundColor:`${days === "1" ? colors.primary : colors.thirdly}`}]}>
            <Text style={styles.text}>Day</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>handlePress("7")}>
          <View style={[styles.btn, {backgroundColor:`${days === "7" ? colors.primary : colors.thirdly}`}]}>
            <Text style={styles.text}>Week</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>handlePress("30")}>
          <View style={[styles.btn, {backgroundColor:`${days === "30" ? colors.primary : colors.thirdly}`}]}>
            <Text style={styles.text}>Month</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>handlePress("365")}>
          <View style={[styles.btn, {backgroundColor:`${days === "365" ? colors.primary : colors.thirdly}`}]}>
            <Text style={styles.text}>Year</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>handlePress("max")}>
          <View style={[styles.btn, {backgroundColor:`${days === "max" ? colors.primary : colors.thirdly}`}]}>
            <Text style={styles.text}>Max</Text>
          </View>
        </TouchableWithoutFeedback>
    </View>
  )
}

export default RangeTabs

const styles = StyleSheet.create({
  tabsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  btn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 60,
    justifyContent:"center",
    alignItems: "center",
    borderRadius: 4,
  },
  text: {
    color: colors.white,
    fontWeight:"bold",
    fontSize: 14,
  }
})