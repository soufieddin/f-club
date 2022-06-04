import React from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import colors from "../../config/colors";


export default function ListItemSellAction({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.edit}>
      <View style={styles.wrapper}>
        <MaterialCommunityIcons name="trash-can" size={27} color={colors.white}/>
      </View>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  edit:{
    alignSelf:"center",
    marginBottom:10,
  },
  wrapper: {
    backgroundColor:colors.secondary,
    width:57,
    height:57,
    justifyContent:"center",
    alignItems:"center",
    zIndex: 10,
    elevation: 10,
    borderRadius: 5,
    alignSelf:"center",
  },
  text: {
    color: colors.white,
    fontSize:18,
    fontWeight:"bold",
  }
})
