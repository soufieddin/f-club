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

  //initial values
  const {user} = useAuth();
  const amount = 24;
  const { data: currentUser } = useFirestoreQuery(firestore.collection('users').doc(user.uid));
  const favos = currentUser?.favorite_cryptos;
  const flatListRef = useRef();

  //states
  const [query, setQuery] = useState("");
  const [queryToSearch, setQueryToSearch] = useState("");
  const [value, setValue] = useState("")
  const [results, setResults] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);

  // urls
  const cryptosUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${amount}&page=${page}&sparkline=false&price_change_percentage=24h`
  const searchUrl = `https://api.coingecko.com/api/v3/search?query=${query}`

 //useEffects
  if(query !== "") {
    useEffect(()=> {
      fetchSearchResultsData();
    }, [query])
  }
  if(query === "") {
    useEffect(()=> {
      fetchMarketData();
    }, [page])
  }

  //Functions
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

  const handleReset = async () => {
    if(isFetching){
      console.log("waiting")
      return;
    }
    setQuery("");
    setResults([]);
    setValue("");
    setQueryToSearch("");
    setCryptos([])
    setPage(1)
  }

  const onRefresh = async () => {
    if(isFetching){
      console.log("waiting")
      return;
    }
    console.log("working")
    setCryptos([]);
    setIsFetching(true);
    setPage(1);
    fetchMarketData();
    setIsFetching(false);
    console.log("fin")
  };

  const loadMore = async () => {
    if(isFetching){
      return;
    }
    setIsFetching(true)
    setPage(page + 1);
    setIsFetching(false)
  }

  const handleChange = async (text) => {
    const formatQuery = text.toLowerCase();
    setQueryToSearch(formatQuery);
    setValue(formatQuery)
  }

  const handleSearch = async () => {
    setCryptos([]);
    setQuery(queryToSearch ? queryToSearch : "");
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
