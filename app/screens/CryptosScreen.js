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
  const amount = 100;
  const flatListRef = useRef()
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [favosData, setFavosData] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tab, setTab] = useState("all");

  const { data: currentUser } = useFirestoreQuery(firestore.collection('users').doc(user.uid));
  const favos = currentUser?.favorite_cryptos;
  const cryptosUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${amount}&page=1&sparkline=false&price_change_percentage=24h`
  const searchUrl = `https://api.coingecko.com/api/v3/search?query=${query}`
  const favosUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favos?.join('%2C%20')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
 
  const fetchMarketData = async () => {
    const marketData = await getData(cryptosUrl);
    setCryptos(marketData);
    setIsFetching(false);
  }
  
  const fetchSearchResultsData = async () => {
    const searchData = await getData(searchUrl);
    setResults(searchData.coins);
  }

  const fetchFavosData = async () => {
    const favosResult = await getData(favosUrl);
    setFavosData(favosResult);
  }

  if(query !== "") {
    useEffect(()=> {
      fetchSearchResultsData();
    }, [tab, query])
  }else if(query === "" && tab === "all") {
    useEffect(()=> {
      fetchMarketData();
    }, [query, tab])
  }
  else if(query === "" && tab === "fav") {
    useEffect(()=> {
      fetchFavosData();
    }, [query, tab])
  }

  const handleChange = (text) => {
    const formatQuery = text.toLowerCase();
    setQuery(formatQuery);
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onRefresh = async () => {
    setIsFetching(true);
    await sleep(2000);
    setIsFetching(false);
  };

  return (
    <>
      <ActivityIndicator visible={isFetching} />
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
        />
      </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})
