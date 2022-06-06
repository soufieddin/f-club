import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { BottomSheet } from 'react-native-btr';
import colors from '../../config/colors'
import Button from '../general/Button'

const BottomMadalSell = ({visibleSell, setVisibleSell, maxAmountSell, setAmountToSell, amountToSell, symbolSell, onDeleteAsset}) => {
  
  const toggleBottomNavigationViewSell = () => {
    //Toggling the visibility state of the bottom sheet
    setVisibleSell(!visibleSell);
  };
  return (
    <BottomSheet
    visible={visibleSell}
    onBackButtonPress={toggleBottomNavigationViewSell}
    onBackdropPress={toggleBottomNavigationViewSell}
  >
    <View style={styles.bottomNavigationViewSell}>
    <Text style={styles.label}>Remove Items from Asset</Text>
      <View style={styles.amountWrapper}>
        <TextInput
          multiline
          keyboardType = 'numeric'
          placeholder={`${maxAmountSell}`}
          placeholderTextColor={colors.light}
          style={styles.amount}
          onChangeText={(text)=> {text > maxAmountSell ? setAmountToSell(maxAmountSell) : setAmountToSell(text)}}
          value={amountToSell > 0 ? `${amountToSell}` : ""}
        />
        <Text style={styles.symbol}>{symbolSell.toUpperCase() || ""}</Text>

      </View>
      <Button styleBtn={styles.btn} text="Submit" styleText={styles.text} color={!amountToSell || amountToSell > maxAmountSell ? "light" : "primary"} onPress={onDeleteAsset} disabled={!amountToSell || amountToSell > maxAmountSell ? true : false}/>

    </View>
  </BottomSheet>
  )
}

export default BottomMadalSell

const styles = StyleSheet.create({
  bottomNavigationViewSell: {
    backgroundColor: colors.white,
    width: '100%',
    height: "40%",
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