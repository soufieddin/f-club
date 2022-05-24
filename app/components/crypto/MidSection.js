import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native'
import React from 'react'
import colors from '../../config/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const MidSection = ({selected, setSelected}) => {

  const handlePress = (name) => {
    setSelected(name)
  }
  return (
    <View style={styles.mid}>
      <View style={styles.midWrapper}>
        <TouchableWithoutFeedback onPress={()=>handlePress("chart")}>
          <View style={styles.wrapper}>
            <View style={[styles.icon, {backgroundColor:`${selected === "chart" ? colors.primary : colors.thirdly}`}]}>
              <MaterialCommunityIcons name="chart-bell-curve" size={32} color={colors.white}/>
            </View>
            <Text style={[styles.text, {color:`${selected === "chart" ? colors.primary : colors.thirdly}`}]}>chart</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>handlePress("news")}>
          <View style={styles.wrapper}>
            <View style={[styles.icon, {backgroundColor:`${selected === "news" ? colors.primary : colors.thirdly}`}]}>
                <MaterialCommunityIcons name="newspaper-variant" size={32} color={colors.white}/>
            </View>
            <Text style={[styles.text, {color:`${selected === "news" ? colors.primary : colors.thirdly}`}]}>news</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>handlePress("info")}>
          <View style={styles.wrapper}>
            <View style={[styles.icon, {backgroundColor:`${selected === "info" ? colors.primary : colors.thirdly}`}]}>
              <MaterialCommunityIcons name="information-variant" size={32} color={colors.white}/>
            </View>
            <Text style={[styles.text, {color:`${selected === "info" ? colors.primary : colors.thirdly}`}]}>info</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mid: {
    marginVertical: 20,
    height: "12%",
    paddingHorizontal: 8,
    justifyContent:"center",
    alignItems: "center",
  },
  midWrapper: {
    backgroundColor: colors.white,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  wrapper:{
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textTransform: 'capitalize',
    fontSize: 14
  }
})

export default MidSection