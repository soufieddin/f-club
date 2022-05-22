import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, StatusBar} from 'react-native';
import Screen from '../components/general/Screen';
import SearchSection from '../components/cryptos/SearchSection';
import Cryptos from '../components/cryptos/Cryptos';
import colors from '../config/colors'
import { getData } from '../hooks/useFetch';

export default function CryptosScreen({ navigation }) {
  const flatListRef = useRef()
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const cryptosUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=${page}&sparkline=false`
  const searchUrl = `https://api.coingecko.com/api/v3/search?query=${query}`

  const fetchMarketData = async () => {
    const marketData = await getData(cryptosUrl);
    setCryptos(marketData);
    // setCryptos(cryptos => [...cryptos, ...marketData]);
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

  const handleChange = (text) => {
    const formatQuery = text.toLowerCase();
    setQuery(formatQuery);
  }

  const onRefresh = () => {
    setIsFetching(true);
    fetchMarketData();
  };

  const loadMore = async () => {
    setPage(page + 1);
  };

  return (
    <Screen style={styles.container}>
      <SearchSection onChangeText={handleChange} />
      <Cryptos 
      query={query}
      flatListRef={flatListRef}
      cryptos={cryptos}
      results={results}
      onRefresh={onRefresh}
      isFetching={isFetching}
      onEndReached={loadMore}
      navigation={navigation}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})
