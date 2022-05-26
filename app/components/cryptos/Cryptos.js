import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Item from './Item';
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import FavTabs from '../general/FavTabs'

const Cryptos = ({query, flatListRef, cryptos, favosData, navigation, onRefresh, isFetching, results, tab, setTab }) => {
 
  const renderItem = ({item}) => (
    <Item 
    symbol={item.symbol}
    name={item.name}
    price={!query ? item.current_price : null}
    percent={!query ? item.price_change_percentage_24h_in_currency : null}
    logo={!query ? item.image : item.thumb}
    onPress={()=> {
      navigation.navigate(routes.CRYPTO_DETAIL_SCREEN, item);
    }}
    />
  );
  
  return (
    <View style={styles.mid}>
        <View style={styles.mid_topic}>
          <Text style={styles.main_title}>{query ? `Search results of ${query}` : "Crypto Market"}</Text>
          <FavTabs tab={tab} setTab={setTab}/>
        </View>
        <FlatList 
          ref={flatListRef}
          keyExtractor={(item) => item.id}
          data = {query ? results : tab==="all" ? cryptos : favosData}
          renderItem = {renderItem}
          onRefresh={!query ? onRefresh : null}
          refreshing={isFetching}
          initialNumToRender={7}
          />
      </View>
  )
}

export default Cryptos

const styles = StyleSheet.create({
  mid: {
    backgroundColor: colors.white, 
    height: '88%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 8,
  },
  mid_topic: {
    flexDirection: 'column',
    justifyContent: "space-between",
    marginTop: 20,
  },
  text: {
    color: colors.white,
    fontSize:24,
    fontWeight:"bold"
  },
  main_title: {
    fontSize: 18,
    color: colors.primary,
    fontWeight:"bold",
  },
  fav:{
    color: colors.primary,
  }
})