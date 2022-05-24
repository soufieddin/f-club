import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, {memo} from 'react'
import colors from '../../config/colors';
const Item = ({symbol, name, logo, price, percent, onPress}) => {
  const percentColor = percent > 0 ? `${colors.green}` : `${colors.red}`;
  const percentSymbol = percent > 0 ? "+" : "";
  return (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.itemWrapper}>
      <View style={styles.itemNames}>
        <Text style={styles.shortName}>{symbol}</Text>
        <Text style={styles.longName}>{name}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.price}>
          $ {price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={[styles.percent, {color: percentColor}]}>
          {percentSymbol}{percent?.toFixed(2)}%
        </Text>
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
    width: "25%",
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
  price: {
    color: colors.primary,
    fontWeight:"bold",
    fontSize: 14,
  },
  percent: {
    fontSize: 16,
    alignSelf: "center",
  },
  wrapper: {
    width: "25%",
    justifyContent: "center",
  }
})

export default memo(Item)