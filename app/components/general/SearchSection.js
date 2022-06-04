import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../config/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const SearchSection = ({ onChangeText, placeholder, query, onSearch, onReset, value}) => {


  return (
    <View style={styles.top}>
      <TextInput
      style={styles.search}
      placeholder={placeholder}
      placeholderTextColor={colors.thirdly}
      onChangeText={onChangeText}
      value={value}
      />
      { query ? 
        <TouchableOpacity style={styles.btnAdd} onPress={onReset}>
          <MaterialCommunityIcons name="close" size={20} color={colors.white} />
        </TouchableOpacity> 
        : 
        <TouchableOpacity style={styles.btnAdd} onPress={onSearch}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.white} />
        </TouchableOpacity>
      }
    </View>
  )
}

export default SearchSection

const styles = StyleSheet.create({
  top: {
    backgroundColor: colors.primary,
    height: '12%',
    paddingHorizontal: 8,
    justifyContent:"space-between",
    alignItems: "center",
    flexDirection:"row",
  }, 
  search:{
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,

    height: 40,
    paddingHorizontal:10,
    width: "90%",
    backgroundColor: colors.white,
  },
  btnAdd: {
    width: "10%",
    height: 40,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: colors.thirdly, 
  },
})