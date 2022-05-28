import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import colors from '../../config/colors'

const FavTabs = ({tab, setTab}) => {

  const handlePress = (name) => {
    setTab(name)
  }
  return (
    <View style={styles.tabsWrapper}>
      <TouchableWithoutFeedback onPress={()=>handlePress("all")}>
          <View style={[styles.btn, {backgroundColor:`${tab === "all" ? colors.primary : colors.thirdly}`}]}>
            <Text style={styles.text}>All</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>handlePress("fav")}>
          <View style={[styles.btn, {backgroundColor:`${tab === "fav" ? colors.primary : colors.thirdly}`}]}>
            <Text style={styles.text}>Favorites</Text>
          </View>
        </TouchableWithoutFeedback>
    </View>
  )
}

export default FavTabs

const styles = StyleSheet.create({
  tabsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "40%",
    marginBottom: 20,
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