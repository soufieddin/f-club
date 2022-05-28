import React, {useState, useEffect, useRef} from 'react';

import { StyleSheet, StatusBar} from 'react-native';
import Screen from '../components/general/Screen';
import SearchSection from '../components/general/SearchSection';
import ActivityIndicator from '../components/general/ActivityIndicator';
import Cryptos from '../components/cryptos/Cryptos';
import colors from '../config/colors'
import { getData } from '../hooks/useFetch';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { firestore } from '../firebase/firebase'
import {useAuth} from '../firebase/auth';

export default function CryptosScreen({ navigation }) {
  const {user} = useAuth();
  const amount = 40;
  const flatListRef = useRef()
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [favosData, setFavosData] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);
  const { data: currentUser } = useFirestoreQuery(firestore.collection('users').doc(user.uid));
  const favos = currentUser?.favorite_cryptos;
  const cryptosUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${amount}&page=${page}&sparkline=false&price_change_percentage=24h`
  const searchUrl = `https://api.coingecko.com/api/v3/search?query=${query}`
  const favosUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favos?.join('%2C%20')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
 
  const fetchMarketData = async () => {
    if(isFetching){
      return;
    }
    setIsFetching(true)
    const marketData = await getData(cryptosUrl);
    setCryptos((existingCryptos) => ([...existingCryptos, ...marketData]));
    setIsFetching(false);
  }
  
  const fetchSearchResultsData = async () => {
    if(isFetching){
      return;
    }
    setIsFetching(true);
    const searchData = await getData(searchUrl);
    setResults(searchData.coins);
    setIsFetching(false);
  }

  const fetchFavosData = async () => {
    if(isFetching){
      return;
    }
    setIsFetching(true);
    const favosResult = await getData(favosUrl);
    setFavosData(favosResult);
    setIsFetching(false);
  }

  if(query !== "") {
    useEffect(()=> {
      fetchSearchResultsData();
    }, [tab, query, page])
  }else if(query === "" && tab === "all") {
    useEffect(()=> {
      fetchMarketData();
    }, [query, tab, page])
  }
  else if(query === "" && tab === "fav") {
    useEffect(()=> {
      fetchFavosData();
    }, [query, tab, page])
  }

  const handleChange = (text) => {
    const formatQuery = text.toLowerCase();
    setQuery(formatQuery);
  }



  const onRefresh = async () => {
    if(isFetching){
      return;
    }
    setIsFetching(true);
    if(query === "" && tab === "fav" ) {
      fetchFavosData();
    }else if(query === "" && tab === "all") {
      fetchMarketData();
    }
  };

  const loadMore = async () => {
    if(isFetching){
      return;
    }
    setPage((cryptos.length / amount) + 1);
  }
  return (
    <Screen style={styles.container}>
      <SearchSection onChangeText={handleChange} placeholder="Search a crypto..." />
      <Cryptos 
      query={query}
      flatListRef={flatListRef}
      cryptos={cryptos}
      favosData={favosData}
      results={results}
      onRefresh={onRefresh}
      isFetching={isFetching}
      navigation={navigation}
      tab={tab}
      setTab={setTab}
      onEndReached={loadMore}
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
