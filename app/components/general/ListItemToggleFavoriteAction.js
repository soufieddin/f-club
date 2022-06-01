import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import colors from "../../config/colors";


export default function ListItemToggleFavoriteAction({onPress, fav}) {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={styles.del}>
      <View style={styles.wrapper}>
        {/* {fav ? (<MaterialCommunityIcons name="star" size={27} color={colors.yellow} />) : (<MaterialCommunityIcons name="star-outline" size={27} color={colors.white} />)} */}
        {fav ? (<MaterialCommunityIcons name="star" size={27} color={colors.yellow} />) : (<MaterialCommunityIcons name="star-outline" size={27} color={colors.white} />)}

      </View>
    </TouchableWithoutFeedback>

  )
}

const styles = StyleSheet.create({

  wrapper: {
    backgroundColor:colors.secondary,
    width:55,
    height:55,
    justifyContent:"center",
    alignItems:"center",
    zIndex: 10,
    elevation: 10,
    borderRadius: 5,
    marginBottom:10,
    alignSelf:"center",
  }
})
