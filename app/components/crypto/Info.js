import { StyleSheet, Text, ScrollView, View, Linking } from 'react-native'
import React from 'react'
import colors from '../../config/colors'
const Info = ({result}) => {

  const numFormatter = (num) => {
    if(num > 999 && num < 1000000){
      return (num/1000).toFixed(1) + ' K';
    }else if(num > 1000000 && num < 1000000000){
      return (num/1000000).toFixed(1) + ' M';
    }else if(num > 1000000000 && num < 1000000000000){
      return (num/1000000000).toFixed(1) + ' B';
    }else if(num > 1000000000000 && num < 1000000000000000){
      return (num/1000000000000).toFixed(1) + ' T';
    }else if(num < 900){
      return num; // if value < 1000, nothing to do
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{result?.description?.en.replace( /(<([^>]+)>)/ig, '')}</Text>
      </View>
      {result?.categories[0] && 
        <View style={styles.wrapper}>
          <Text style={styles.title}>Main category:</Text>
          <Text style={styles.text}>{result?.categories[0]}</Text>
        </View>
      }
      <View style={styles.wrapper}>
        <Text style={styles.title}>Official website:</Text>
        <Text style={styles.link}
          onPress={() => {
            Linking.openURL(`${result?.links.homepage[0]}`);
          }}
        >{result?.links.homepage[0]}</Text>
      </View>
      {result?.genesis_date && 
        <View style={styles.wrapper}>
          <Text style={styles.title}>Genesis date:</Text>
          <Text style={styles.text}>
              {result?.genesis_date}
          </Text>
        </View>
      }
      <View style={styles.wrapper}>
        <Text style={styles.title}>Market cap rank:</Text>
        <Text style={styles.text}>{result?.market_cap_rank}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Market cap:</Text>
        <Text style={styles.text}>$ {numFormatter(result?.market_data.market_cap.usd)}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Total volume:</Text>
        <Text style={styles.text}>$ {numFormatter(result?.market_data.total_volume.usd)}</Text>
      </View>
      {result?.market_data.total_supply && 
        <View style={styles.wrapper}>
          <Text style={styles.title}>Total supply:</Text>
          <Text style={styles.text}>{numFormatter(result?.market_data.total_supply)}</Text>
        </View>
      }
      {result?.market_data.max_supply && 
        <View style={styles.wrapper}>
          <Text style={styles.title}>Max supply:</Text>
          <Text style={styles.text}>{numFormatter(result?.market_data.max_supply)}</Text>
        </View>
      }
      {result?.market_data.circulating_supply && 
        <View style={styles.wrapper}>
          <Text style={styles.title}>Circulating supply:</Text>
          <Text style={styles.text}>{numFormatter(result?.market_data.circulating_supply)}</Text>
        </View>
      }
    </ScrollView>
  )
}

export default Info

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginBottom: 60,
  },
  text: {
    color: colors.secondary,
  },
  link:{
    color: colors.thirdly,
    textDecorationLine:'underline',
  },
  wrapper: {
    marginBottom: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
  }, 
  title: {
    color: colors.primary,
    fontWeight:"bold",
  }
})