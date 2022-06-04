import { StyleSheet, Text, View, Image } from 'react-native'
import React, {memo} from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../../config/colors'
const AssetsItem = ({symbol, name, currentPrice=null, logo, totalPrice, amount, percent=null, boughtPrice, renderRightActions}) => {
  const percentColor = percent > 0 ? `${colors.green}` : `${colors.red}` || `${colors.white}`;
  const percentSymbol = percent > 0 ? "+" : "";
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <View style={styles.itemWrapper}>
          <View style={styles.itemNames}>
            <Text style={styles.shortName}>{symbol.toUpperCase()}</Text>
            <Text style={styles.longName}>{name}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.price}>
            {currentPrice ? "$" : ""} {currentPrice?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Text>
            <Text style={[styles.percent, {color: percentColor}]}>
              {percentSymbol}{percent && percent?.toFixed(2)}{percent ? "%" : ""}

            </Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.price}>
              $ {totalPrice?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Text>
            <Text style={styles.amount}>
              {amount} * ${parseFloat(boughtPrice)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Text>
          </View>
          <View style={styles.wrapperImage}>
            <Image source={{uri: logo}} style={styles.logo} />
          </View>
        </View>
      </View>
    </Swipeable>
  )
}

export default memo(AssetsItem)

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    backgroundColor: colors.white,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemNames: {
    flexDirection: "column",
    width: "25%"
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
    alignSelf: "flex-end"
  },
  price: {
    color: colors.primary,
    fontWeight:"bold",
    fontSize: 14,
    alignSelf: "center"


  },
  percent: {
    fontSize: 12,
    alignSelf: "center"

  },
  wrapper: {
    flexDirection: "column",
    alignItems: "center",
    width: "32.5%"

  },
  amount: {
    color: colors.thirdly,
    fontSize: 12,
    alignSelf: "center"
  },
  wrapperImage: {
    width: "10%"
  }
})