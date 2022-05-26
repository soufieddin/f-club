import React, {useState, useEffect} from 'react';

import { StyleSheet, StatusBar } from 'react-native';
import Screen from '../components/general/Screen';
import colors from '../config/colors'
import TopicCard from '../components/crypto/TopicCard'
import MidSection from '../components/crypto/MidSection'
import MainSection from '../components/crypto/MainSection'
import { getData } from '../hooks/useFetch';
export default function CryptoDetailScreen({ route }) {
  const crypto = route.params;
  const id = crypto.id
  const [days, setDays] = useState("1")
  const [label, setLabel] = useState("all")
  const cryptoUrl = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&developer_data=false`
  const historyUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  const [result, setResult] = useState({});
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState("chart");
  
  const fetchCryptoData = async () => {
    const detail = await getData(cryptoUrl);
    setResult(detail);
  }

  useEffect(()=> {
    fetchCryptoData();
  }, [id])

  const fetchCryptoHistory = async () => {
    const historyData = await getData(historyUrl);
    setHistory(historyData.prices);
  }
  useEffect(()=> {
    fetchCryptoHistory();
  }, [days, id])
  return (
    <Screen style={styles.container}>
      <TopicCard 
        name={crypto.name || result?.name}
        price={crypto.current_price || result?.market_data?.current_price?.usd}
        percent={ crypto.price_change_percentage_24h || result.market_data?.price_change_percentage_24h }
        image={crypto.image || result?.image?.large}
        id={crypto.id}
      />
      <MidSection setSelected={setSelected} selected={selected} />
      <MainSection days={days} setDays={setDays} selected={selected} label={label} setLabel={setLabel} history={history} price={result ? result.market_data?.current_price?.usd : crypto.current_price} lastUpdate={result?.market_data?.last_updated} result={result}/>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
})
