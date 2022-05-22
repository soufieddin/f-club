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
  const cryptoUrl = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&developer_data=false`
  const [result, setResult] = useState({});
  const fetchCryptoData = async () => {
    const detail = await getData(cryptoUrl);
    setResult(detail);
  }

  useEffect(()=> {
    fetchCryptoData();
  }, [id])

  return (
    <Screen style={styles.container}>
      <TopicCard 
        name={result?.name}
        price={result?.market_data?.current_price?.usd}
        percent={result?.market_data?.price_change_percentage_24h}
        image={result?.image?.thumb}
        id={crypto.id}
      />
      <MidSection />
      <MainSection />
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
