import React, {useState, useEffect, useRef} from 'react';

import { StyleSheet, StatusBar} from 'react-native';
import Screen from '../components/general/Screen';
import SearchSection from '../components/general/SearchSection';
import Cryptos from '../components/cryptos/Cryptos';
import colors from '../config/colors'
import { getData } from '../hooks/useFetch';

export default function CryptosScreen({ navigation }) {
  const amount = 50;
  const flatListRef = useRef()
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  // const [cachedCryptos, setCachedCryptos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("all");

  //const [loadedPages, setLoadedPages] = useState([]);
  const cryptosUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${amount}&page=${page}&sparkline=false&price_change_percentage=1h`
  const searchUrl = `https://api.coingecko.com/api/v3/search?query=${query}`
  
  const fetchMarketData = async () => {
   // if(!loadedPages.find(lp => lp === page)){
      // console.log("DETECTED NEW PAGE " + page);
    //  const marketData = await getData(cryptosUrl);
      // console.log("NEW MARKET DATA " + marketData.length);
      // console.log("NEW MARKET DATA IDS " + JSON.stringify(marketData.map(m => m.id)));
    //  const newMarketData = cachedCryptos.concat(marketData);
      // console.log("CACHED CRYPTOS " + newMarketData.length);
      // console.log("CACHED CRYPTOS DATA IDS " + JSON.stringify(newMarketData.map(m => m.id)));
    //  setCryptos(marketData);
    //  setCachedCryptos(newMarketData)
      // console.log("LOADED PAGES " + JSON.stringify(loadedPages));
    //  setLoadedPages(loadedPages.concat(page))
    //} else {
      // console.log("NO NEW PAGE DETECTED FOR " + page);
      // console.log("CACHED CRYPTOS " + cachedCryptos.length);
      //const cachedMarketData = cachedCryptos.slice(amount * (page-1), amount * page)
      // console.log("CACHED MARKET DATA " + cachedMarketData.length);
    //   setCryptos(cachedMarketData);
    // }
    //setCryptos(cryptos => [...cryptos, ...marketData]);
    const marketData = await getData(cryptosUrl);
    const union = cryptos.concat(marketData);
    const result = union.filter((item, pos) => union.indexOf(item) === pos)
    setCryptos(result);
    setIsFetching(false);
  }
  
  const fetchSearchResultsData = async () => {
    const searchData = await getData(searchUrl);
    setResults(searchData.coins);
  }

  useEffect(()=> {
    fetchSearchResultsData();
  }, [query])

  useEffect(()=> {
    fetchMarketData();
  }, [page])

  const handleChange = (text) => {
    const formatQuery = text.toLowerCase();
    setQuery(formatQuery);
  }

  const onRefresh = () => {
      console.log("REFRESHING")
      setIsFetching(true);
      // setLoadedPages([]);
      // setCachedCryptos([]);
      setPage(1);
      setIsFetching(false);
  };

  // const loadMore = () => {
  //   console.log("LOAD MORE");
  //   const newPage = page + 1;
  //   console.log("SET PAGE " + newPage);
  //   setPage(newPage);
  // };

  const loadMore = async () => {
    if(!isFetching){
      setIsFetching(true);
      const newPage = page + 1;
      console.log("more, page " + newPage);
      setPage(newPage);
      setIsFetching(false)

    }
  };

  // const loadPrevious = () => {
  //   console.log("LOAD PREVIOUS");
  //   const newPage = page - 1;
  //   console.log("SET PAGE " + newPage);
  //   if(newPage > 0) {
  //     setPage(newPage);
  //   }
  // }

  // const loadPrevious = async () => {
  //   console.log("LOAD PREVIOUS");
  //   const newPage = page - 1;
  //   console.log("SET PAGE " + newPage);
  //   if(newPage > 0) {
  //     setPage(newPage);
  //   } else {
  //     setPage(1);
  //   }
  // };
  return (
    <Screen style={styles.container}>
      <SearchSection onChangeText={handleChange} placeholder="Search a crypto..." />
      <Cryptos 
      query={query}
      flatListRef={flatListRef}
      cryptos={cryptos}
      results={results}
      onRefresh={onRefresh}
      isFetching={isFetching}
      //onStartReached={loadPrevious}
      onEndReached={loadMore}
      navigation={navigation}
      tab={tab}
      setTab={setTab}
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
