import { View, Text, Image, StyleSheet,TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../../config/colors';

const TopicCard = ({name, image, price, percent, id}) => {
  const percentColor = percent > 0 ? `${colors.green}` : `${colors.red}`;
  const percentSymbol = percent > 0 ? "+" : "";
  return (
    <View style={styles.container}>
      <View style={styles.topicWrapper}>
        <View style={styles.topicSymbols}>
          <Text style={styles.name}>{name}</Text>
          <Image source={{uri: image}} style={styles.image} />
        </View>
        <View style={styles.topicNumbers}>
          <Text style={styles.price}>
            $ {price?.toFixed(2)}
          </Text>
          <Text style={[styles.percent, {color: percentColor}]}>
            {percentSymbol}{percent?.toFixed(2)}%
          </Text>
        </View>
        <View style={styles.topicActions}>
          <TouchableWithoutFeedback onPress={()=>console.log("Notification", id)}>
            <View style={styles.action}>
              <MaterialCommunityIcons name="bell" size={20} color={colors.white}/>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=>console.log("Favorite", id)}>
            <View style={styles.action}>
              <MaterialCommunityIcons name="star" size={20} color={colors.white}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    height:"25%" ,
  },
  topicWrapper: {
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 16,
    height: "100%"

  },
  topicSymbols: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    color: colors.primary,
  },
  image: {
    height: 32,
    width: 32,
  },
  topicNumbers: {
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 32,
    fontWeight:"bold",
    color: colors.primary,
  },
  percent: {
    fontSize: 16,
  },
  topicActions: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  action: {
    height: 32,
    width: 32,
    borderRadius:16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default TopicCard
