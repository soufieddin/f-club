import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { BottomSheet } from 'react-native-btr';
import colors from '../../config/colors'
import SearchableDropdown from 'react-native-searchable-dropdown';
import Button from '../general/Button'


const BottomModalAdd = ({allCoins, id, setId, symbol, setSymbol, boughtPrice, setBoughtPrice, amount, setAmount, visible, setVisible, onAddNewAsset }) => {
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };


  return (
    <BottomSheet
    visible={visible}
    onBackButtonPress={toggleBottomNavigationView}
    onBackdropPress={toggleBottomNavigationView}
  >
    <View style={styles.bottomNavigationView}>
    <Text style={styles.label}>Add A New Asset</Text>
      <SearchableDropdown
        items={allCoins}
        onItemSelect={(item)=>{setId(item.id); setSymbol(item.symbol)}}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={styles.itemText}
        resetValue={false}
        placeholder={id || "Select a Coin... "}
        placeholderTextColor={colors.light}
        textInputProps={{
          underlineColorAndroid: "transparent",
          style:{
            padding: 8,
            borderWidth: 1,
            borderColor: colors.light,
            borderRadius: 10,
            backgroundColor: colors.white,
            color: colors.primary,
          },
        }}
      
      />
      <View style={styles.amountWrapper}>
        <TextInput
          multiline
          keyboardType = 'numeric'
          placeholder="0"
          placeholderTextColor={colors.light}
          style={styles.amount}
          onChangeText={(text)=>setAmount(text)}
          value={amount ? `${amount}` : ""}
        />
        <Text style={styles.symbol}>{symbol.toUpperCase() || ""}</Text>

      </View>
        <TextInput
          keyboardType = 'numeric'
          placeholder="Buying Price in $ / one crypto"
          placeholderTextColor={colors.light}
          style={styles.input}
          onChangeText={(text)=>setBoughtPrice(text)}
          value={boughtPrice ? `${boughtPrice}` : ""}
        />

        <Button styleBtn={styles.btn} text="Add Asset" styleText={styles.text} color={!id || !boughtPrice || !amount ? "light" : "primary"} onPress={onAddNewAsset} disabled={!id || !boughtPrice || !amount ? true : false}/>

    </View>
  </BottomSheet>
  )
}

export default BottomModalAdd

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: colors.white,
    width: '100%',
    height: "60%",
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    paddingHorizontal: 8,
    paddingVertical: 20,
    flexDirection: 'column',
    justifyContent: "space-between",
    zIndex:5,
    elevation: 5,
  },
  label: {
    color: colors.primary,
    fontSize: 20,
    fontWeight:"bold",
    textTransform: "capitalize",
  },
  item:{
    borderWidth: 1,
    borderColor: colors.white,
    padding: 4,
    borderRadius:5,
    backgroundColor: colors.light,
  },
  itemText: {
    color: colors.white,
    textAlign: "center",
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  amount: {
    fontSize: 80,
    textAlign: "center",
    color: colors.primary,
    textDecorationLine:"none",
    marginVertical:10,
  },
  input: {
    borderRadius:10,
    borderWidth: 1,
    borderColor: colors.thirdly,
    padding: 8,
    width: '100%',
    marginBottom: 10,
    color: colors.primary,
  }, 
  btn: {
    width: '100%',
    height: 60,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: colors.thirdly, 
  },
  text:{
    color:colors.white,
    fontSize:18,
  },
  symbol: {
    fontSize: 18,
    color: colors.light,
    marginLeft: 10
  },
})