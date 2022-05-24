import { StyleSheet, Dimensions, View } from 'react-native'
import React from 'react'
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel, ChartXLabel} from '@rainbow-me/animated-charts';
import colors from '../../config/colors'
export const {width: SIZE} = Dimensions.get('window');
const Chart = ({history}) => {

  const formattedData = history.map((item) => ({x: item[0], y: item[1]}));
  const formatUSD = value => {
    'worklet';
    if (value === '') {
      return ""
    }
    const formattedValue = `$ ${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

    return formattedValue
  };

  const formatDate = value => {
    'worklet';
    if (value === '') {
      return ""
    }
     return `${new Date(value * 1000).toLocaleString("en-US").slice(0,20)}`
  };

  return (
    <ChartPathProvider data={{ 
      points:formattedData, 
      smoothingStrategy: 'bezier' 
      }}>
      <View style={styles.chartTextsWrapper}>
        <ChartYLabel
          format={formatUSD}
          style={styles.price}
        />
        <ChartXLabel format={formatDate} style={styles.price}/>
      </View>
      <View style={styles.chartLineWrapper}>
        <ChartPath height={SIZE / 2} stroke={colors.primary} width={SIZE} strokeWidth={2}/>
        <ChartDot style={{ backgroundColor: colors.thirdly }} />
      </View>
    </ChartPathProvider>
  )
}

export default Chart

const styles = StyleSheet.create({
  chartLineWrapper: {
    marginTop: 10,
  },
  chartTextsWrapper: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  }, 
  price : {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "bold",
  }
})