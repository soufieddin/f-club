import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import colors from '../config/colors';
const ItemSearch = ({symbol, name, logo}) => {
  return (
  <TouchableOpacity style={styles.container}>
    <View style={styles.itemWrapper}>
      <View style={styles.itemNames}>
        <Text style={styles.shortName}>{symbol}</Text>
        <Text style={styles.longName}>{name}</Text>
      </View>
      <View style={styles.wrapperImage}>
        <Image source={{uri: logo}} style={styles.logo} />
      </View>
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemNames: {
    flexDirection: "column",
  },
  shortName: {
    fontSize: 16,
    fontWeight:"bold",
    color: colors.primary,
    textTransform: "uppercase",
  },
  longName: {
    fontSize: 14,
    color: colors.thirdly,
    textTransform: "capitalize",
  },
  logo: {
    height: 32,
    width: 32,
  },
  wrapper: {
    justifyContent: "center",
  }
})

export default ItemSearch