import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors'
const TopicInfo = ({capital, profit, balance, percent}) => {
  const percentColor = percent > 0 ? `${colors.green}` : `${colors.red}` || `${colors.secondary}`;
  const percentSymbol = percent > 0 ? "+" : "";
  const profitColor = profit > 0 ? `${colors.green}` : `${colors.red}` || `${colors.white}`;
  const profitSymbol = profit > 0 ? "+" : "";


  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.infoItem}>
            <Text style={styles.title}>Balance</Text>
            {balance ? 
              <Text style={styles.numberBig}>$ {balance?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
              : 
              <Text style={styles.calc}>Calculating...</Text>
            }
            <View style={[styles.percentContainer, {backgroundColor: percentColor}]}>
              {percent ? 
                <Text style={styles.percent}>{percentSymbol}{percent && percent?.toFixed(2)}{percent ? "%" : ""}</Text> 
                : 
                <Text style={styles.calc}>Calculating...</Text>
              }
            </View>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.title}>Capital</Text>
            {capital ? 
              <Text style={styles.number}>$ {capital?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
              :
              <Text style={styles.calc}>Calculating...</Text>
            }
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.title}>Profit</Text>
            {profit ? 
              <Text style={[styles.number, {color: profitColor}]}>$ {profitSymbol}{profit?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
              :
              <Text style={styles.calc}>Calculating...</Text>
            }
          </View>
          
        </View>
      </View>
    </View>
  )
}

export default TopicInfo

const styles = StyleSheet.create({
  view: {
    height:"25%",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 8,
    marginTop: 10

  },
  container: {
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    height: "100%",
    width: "100%",
  },
  wrapper: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },  
  title: {
    fontSize: 18,
    color: colors.thirdly,
    fontWeight:"500",
  },
  wrapper: {
    paddingHorizontal: 8,
    marginTop: 10
  },
  number: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight:"bold",
  },
  numberBig: {
    fontSize: 24,
    fontWeight:"bold",
    color: colors.primary,
    width: "50%",
    textAlign: "center",
  },
  percentContainer: {
    paddingVertical:4,
    paddingHorizontal:8,
    backgroundColor: colors.green,
    borderRadius: 5,
  },
  percent: {
    fontSize: 16,
    color: colors.white,
    fontWeight:"bold",
  },
  label: {
    fontSize: 20,
    color: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 20,
    backgroundColor: colors.primary,
    marginTop: 20
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop:5,
    paddingBottom:10,
    borderColor: colors.borderLight,
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 8,
    
  },
  calc: {
    color: colors.light,
    fontSize: 10,
  }
})