import React, {useState, useEffect, useRef} from 'react';

import { StyleSheet, StatusBar} from 'react-native';
import Screen from '../components/general/Screen';
import SearchSection from '../components/general/SearchSection';
import Cryptos from '../components/cryptos/Cryptos';

import colors from '../config/colors'
import { getData } from '../hooks/useFetch';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { firestore } from '../firebase/firebase'
import {useAuth} from '../firebase/auth';

export default function CryptosScreen({ navigation }) {
  const {user} = useAuth();
  const amount = 24;
  const flatListRef = useRef()
  const [query, setQuery] = useState("");
  const [queryToSearch, setQueryToSearch] = useState("");
  const [value, setValue] = useState("")
  const [results, setResults] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);
  const { data: currentUser } = useFirestoreQuery(firestore.collection('users').doc(user.uid));
  const favos = currentUser?.favorite_cryptos;
  const cryptosUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${amount}&page=${page}&sparkline=false&price_change_percentage=24h`
  const searchUrl = `https://api.coingecko.com/api/v3/search?query=${query}`
 
  const fetchMarketData = async () => {
    if(isFetching){
      return;
    }
    setIsFetching(true)
    const marketData = await getData(cryptosUrl);
    setCryptos((existingCryptos) => ([...existingCryptos, ...marketData]))
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


  if(query !== "") {
    useEffect(()=> {
      fetchSearchResultsData();
    }, [query, page])
  }else if(query === "") {
    useEffect(()=> {
      fetchMarketData();
    }, [query, page])
  }

  const handleChange = async (text) => {
    const formatQuery = text.toLowerCase();
    setQueryToSearch(formatQuery);
    setValue(formatQuery)
  }

  const handleSearch = async () => {
    setQuery(queryToSearch ? queryToSearch : "");
  }

  const handleReset = async () => {
    setQuery("");
    setResults([]);
    setValue("");
    setQueryToSearch("");
    onRefresh();
  }



  const onRefresh = async () => {
    if(isFetching){
      return;
    }
    setIsFetching(true);
    setCryptos([]);
    setPage(1);
    setIsFetching(false);
  };

  const loadMore = async () => {
    if(isFetching){
      return;
    }
    setIsFetching(true)
    setPage((cryptos.length / amount) + 1);
    setIsFetching(false)
  }
  return (
    <Screen style={styles.container}>
      <SearchSection onChangeText={handleChange} query={query} onSearch={handleSearch} onReset={handleReset} value={value} placeholder="Search a crypto..." />
      <Cryptos 
        query={query}
        flatListRef={flatListRef}
        cryptos={cryptos}
        results={results}
        onRefresh={onRefresh}
        isFetching={isFetching}
        navigation={navigation}
        tab={tab}
        setTab={setTab}
        onEndReached={loadMore}
        favos= {favos}
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
