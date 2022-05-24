import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import colors from '../../config/colors'

const NewsTabs = ({label, setLabel}) => {

  const handlePress = (type) => {
    setLabel(type)
  }
  return (
    <View style={styles.tabsWrapper}>
      <TouchableWithoutFeedback onPress={()=>handlePress("all")}>
          <View style={[styles.btn, {backgroundColor:`${label === "all" ? colors.primary : colors.thirdly}`}]}>
            <Text style={styles.text}>All</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>handlePress("+")}>
          <View style={[styles.btn, {backgroundColor:`${label === "+" ? colors.primary : colors.thirdly}`}]}>
            <Text style={styles.text}>Positive</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>handlePress("-")}>
          <View style={[styles.btn, {backgroundColor:`${label === "-" ? colors.primary : colors.thirdly}`}]}>
            <Text style={styles.text}>Negative</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>handlePress("=")}>
          <View style={[styles.btn, {backgroundColor:`${label === "=" ? colors.primary : colors.thirdly}`}]}>
            <Text style={styles.text}>Neutral</Text>
          </View>
        </TouchableWithoutFeedback>
    </View>
  )
}

export default NewsTabs

const styles = StyleSheet.create({
  tabsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
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