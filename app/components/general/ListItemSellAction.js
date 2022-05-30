import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';

import colors from "../../config/colors";


export default function ListItemSellAction({onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={styles.edit}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Sell</Text>
      </View>
    </TouchableWithoutFeedback>

  )
}

const styles = StyleSheet.create({
 
  wrapper: {
    backgroundColor:colors.secondary,
    width:57,
    height: 57,
    justifyContent:"center",
    alignItems:"center",
    zIndex: 10,
    elevation: 10,
    borderRadius: 5
  },
  text: {
    color: colors.white,
    fontSize:18,
    fontWeight:"bold",
  }
})
