import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors'

const SearchSection = ({ onChangeText, placeholder }) => {


  return (
    <View style={styles.top}>
      <TextInput
      style={styles.search}
      placeholder={placeholder}
      placeholderTextColor={colors.thirdly}
      onChangeText={onChangeText}
      />
    </View>
  )
}

export default SearchSection

const styles = StyleSheet.create({
  top: {
    backgroundColor: colors.primary,
    height: '12%',
    paddingHorizontal: 8,
    justifyContent:"center",
    alignItems: "center",
  }, 
  search:{
    borderRadius:8,
    height: 40,
    paddingHorizontal:10,
    width: "100%",
    backgroundColor: colors.white,
  },
})