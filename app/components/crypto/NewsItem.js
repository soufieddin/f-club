import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../../config/colors'

const NewsItem = ({image_url, title, text, source_name, date, sentiment, onPress}) => {
  const labelColor = sentiment === "Positive" ? `${colors.green}` : sentiment === "Negative" ? `${colors.red}` : `${colors.thirdly}`;


  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.itemWrapper}>
        <View style={styles.texts}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{text.slice(0, 38)}...</Text>
          <View style={styles.infoWrapper}>
            <Text style={styles.source}>{source_name} | </Text>
            <Text style={styles.source}>{date.slice(0,25)} | </Text>
            <Text style={[styles.label, {color: labelColor}]}>{sentiment}</Text>
          </View>
        </View>
        <View style={styles.wrapperImage}>
          <Image source={{uri: image_url}} style={styles.img} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default NewsItem

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
  title:{
    color: colors.primary,
    fontSize: 14,
    fontWeight:"bold",
  },
  desc:{
    fontSize: 14,
    color: colors.secondary,
    fontWeight: "300",
    marginVertical: 5
  },
  infoWrapper:{
    flexDirection: 'row',
    alignItems: "center",
  },
  source: {
    fontSize: 11,
    fontWeight:"300",
    color: colors.primary,
  },
  label:{
    fontSize: 11,
    fontWeight:"bold",
  },
  texts: {
    flexDirection: "column",
    width: "75%",
  },
  wrapperImage: {
    height: 70,
    width: "20%",
  },
  img: {
    borderRadius: 5,
    height: "100%",
    width: "100%",
  }
})