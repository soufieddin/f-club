import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, StatusBar, Image } from 'react-native';
import Screen from '../components/Screen';
import Item from '../components/Item';
import ItemSearch from '../components/ItemSearch';
import colors from '../config/colors'
import { getData } from '../hooks/useFetch';


export default function CryptosScreen() {
  const flatListRef = useRef()
  const [cryptos, setCryptos] = useState([]);
  const [results, setResults] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const cryptosUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=120&page=${page}&sparkline=false`
  const searchUrl = `https://api.coingecko.com/api/v3/search?query=${query}`
  const fetchMarketData = async () => {
    const marketData = await getData(cryptosUrl);
    setCryptos(marketData);
    setIsFetching(false);
  }

  const fetchSearchResultsData = async () => {
    const searchData = await getData(searchUrl);
    setResults(searchData.coins);
  }

  useEffect(()=> {
    fetchMarketData();
    fetchSearchResultsData();
  }, [page, query])

const onRefresh = () => {
  setIsFetching(true);
  fetchMarketData();
};
const loadMore = () => {
  setPage(page + 1);
  flatListRef.current.scrollToOffset({ animated: false, offset: 0 })

};


  const handleChange = (text) => {
    const formatQuery = text.toLowerCase();
    setQuery(formatQuery);
  }
  return (
    <Screen style={styles.container}>
      <View style={styles.top}>
      <Image style={styles.tinyLogo} source={require('../assets/light_logo.png')} />
      <TextInput
      style={styles.search}
          placeholder="Search"
          placeholderTextColor={colors.thirdly}
          onChangeText={handleChange}
        />
      </View>
      <View style={styles.mid}>
      <Text style={styles.main_title}>{query ? `Search results of ${query}` : "Crypto Market"}</Text>
      
      {!query ? <FlatList 
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        data = {cryptos}
        renderItem = {({item}) => (
          <Item 
          symbol={item.symbol}
          name={item.name}
          price={item.current_price}
          percent={item.price_change_percentage_24h}
          logo={item.image}
          />
        )}
        onRefresh={onRefresh}
        refreshing={isFetching}
      /> : 
      <FlatList 
        keyExtractor={(item) => item.id}
        data = {results}
        renderItem = {({item}) => (
          <ItemSearch
          symbol={item.symbol}
          name={item.name}
          logo={item.thumb}
          />
        )}
      />
      }
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  top: {
    backgroundColor: colors.primary,
    height: '18%',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }, 
  mid: {
    backgroundColor: colors.white, 
    height: '82%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 8,
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
    marginVertical: 16,
  },
  search:{
    borderRadius:8,
    height: 32,
    paddingHorizontal:10,
    width: "75%",
    backgroundColor: colors.white,
  },
  tinyLogo: {
    width: 64,
    height:64
  }
})
