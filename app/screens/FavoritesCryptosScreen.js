import React, {useState, useEffect, useRef} from 'react';

import { StyleSheet, StatusBar, Text} from 'react-native';
import Screen from '../components/general/Screen';
import Favorites from '../components/cryptos/Favorites';

import colors from '../config/colors'
import { getData } from '../hooks/useFetch';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { firestore } from '../firebase/firebase'
import {useAuth} from '../firebase/auth';

export default function FavoritesCryptosScreen({ navigation }) {
  const {user} = useAuth();
  const flatListRef = useRef()
  const [favosData, setFavosData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { data: currentUser } = useFirestoreQuery(firestore.collection('users').doc(user.uid));
  const favos = currentUser?.favorite_cryptos;
  const favosUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favos?.join('%2C%20')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;

  const fetchFavosData = async () => {
    if(isFetching){
      return;
    }
    setIsFetching(true);
    console.log(favos);
    const favosResult = await getData(favosUrl);
    setFavosData(favosResult);
    setIsFetching(false);
  }

  useEffect(()=> {
    if(!favos || !favos.length){
      return;
    }
    fetchFavosData();
  }, [favos])
  
  const onRefresh = async () => {
    if(isFetching){
      return;
    }
    
    if(!favos || !favos.length){
      return;
    }
    setIsFetching(true);
    fetchFavosData();
    setIsFetching(false);
  };
  //console.log(favosData);
  return (
    <Screen style={styles.container}> 
      <Favorites 
        flatListRef={flatListRef}
        favosData={favosData}
        onRefresh={onRefresh}
        isFetching={isFetching}
        navigation={navigation}
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
  },
  text:{
    color: colors.primary,
    textAlign: "center",
    fontSize: 20,
  }
})
