import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import colors from "../../config/colors";


export default function ListItemSellAction({onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.wrapper}>
        <MaterialCommunityIcons name="trash-can" size={27} color={colors.white}/>
      </View>
    </TouchableWithoutFeedback>

  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor:colors.secondary,
    width:57,
    height:57,
    justifyContent:"center",
    alignItems:"center",
    zIndex: 10,
    elevation: 10,
    borderRadius: 5,
    marginBottom:10,
    alignSelf:"center",
  }
})
