import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Item from './Item';
import ItemSearch from './ItemSearch'
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import FavTabs from '../general/FavTabs'

const Cryptos = ({query, flatListRef, cryptos, navigation, onRefresh, isFetching, onEndReached, results, tab, setTab }) => {
  const renderItem = ({item}) => (
    <Item 
    symbol={item.symbol}
    name={item.name}
    price={item.current_price}
    percent={item.price_change_percentage_1h_in_currency}
    logo={item.image}
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
        {!query ? <FlatList 
          ref={flatListRef}
          keyExtractor={(item) => item.id}
          data = {cryptos}
          renderItem = {renderItem}
          onRefresh={onRefresh}
          refreshing={isFetching}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.3}
          inverted={false}
          initialNumToRender={12}
          /> : 
        <FlatList 
          keyExtractor={(item) => item.id}
          data = {results}
          renderItem = {({item}) => (
            <ItemSearch
            symbol={item.symbol}
            name={item.name}
            logo={item.thumb}
            onPress={()=> {
              navigation.navigate(routes.CRYPTO_DETAIL_SCREEN, item);
            }}
            />
          )}
        />
        }
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
  }
})