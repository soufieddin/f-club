import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import colors from '../../config/colors'
import AssetsItem from './AssetsItem'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import TopicInfo from './TopicInfo'
import BottomModalAdd from './BottomModalAdd'
import BottomModalSell from './BottomMadalSell'

import {useAuth} from '../../firebase/auth';
import firebase from 'firebase/compat/app';
import { getData } from '../../hooks/useFetch';
import { firestore } from '../../firebase/firebase'
import { useFirestoreQuery } from '../../firebase/useFirestoreQuery';
import ListItemSellAction from '../general/ListItemSellAction'

const Assets = ({setLoading}) => {
  //initialValues
  const user = useAuth();
  const { data: currentUser } = useFirestoreQuery(firestore.collection('users').doc(user.user.uid));
  let myAssets = [];
  let names = [];
  let ids = [];
  let capital = null;
  let profit = null;
  let balance = null;
  let targetCoins = [];
  let currentPercent = null;
  let currentTotalPriceForAsset = 0;
  
  //States
  const [isFetching, setIsFetching] = useState(false);
  const [allCoins, setAllCoins] = useState([])
  const [visible, setVisible] = useState(false);
  const [visibleSell, setVisibleSell] = useState(false);
  const [amount, setAmount] = useState(0);
  const [boughtPrice, setBoughtPrice] = useState(0);
  const [id, setId] = useState("");
  const [symbol, setSymbol] = useState("");
  const [symbolSell, setSymbolSell] = useState("");
  const [idAssetToSell, setIdAssetToSell] = useState("");
  const [idToSell, setIdToSell] = useState("");
  const [maxAmountSell, setMaxAmountSell] = useState(0);
  const [amountToSell, setAmountToSell] = useState(0);
  const [boughtPriceToSell, SetBoughtPriceToSell] = useState(0);
  const [coins, setCoins] = useState([]);

  //useEffects
  useEffect(()=> {
    fetchAllCoins();
  }, [])
  
  useEffect(()=> {
    fetchAssetsData();
  }, [names])

  //functions
  const fetchAssetsData = async () => {
    if(isFetching){
      return;
    }
    if(!names) {
      return;
    }
    setIsFetching(true);
    const assetsResult = await getData(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${names?.join('%2C%20')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`);
    setCoins(assetsResult);
    setIsFetching(false);
  }

  const fetchAllCoins = async () => {
    if(isFetching){
      return;
    }
    setIsFetching(true)
    const coinsList = await getData("https://api.coingecko.com/api/v3/coins/list?include_platform=false");
    setAllCoins(coinsList)
    setIsFetching(false);
  }

  const fetchCryptoData = async (id) => {
    if(!id){
      return;
    }
    setIsFetching(true)
    const detail = await getData(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&developer_data=false`);
    setIsFetching(false);

    return detail;
  }

  const onAddNewAsset = async () => {
    setVisible(false)
    setLoading(true);
    const result = await fetchCryptoData(id);
    const assetId = `${result?.id}_${boughtPrice}`;
    const doc = firestore.doc(`users/${user?.user?.uid}`);
    const indexOfExistingAsset = ids?.findIndex(i => i === assetId);
    const newAsset = {
      id: assetId,
      name: result?.id,
      image: result?.image?.small || result?.image?.thumb,
      symbol: result?.symbol,
      amount: +amount,
      boughtPrice: +boughtPrice,
      totalPrice: +amount * +boughtPrice
    };
    if(indexOfExistingAsset >= 0){
      const existingAsset = currentUser?.assets?.find(i => i.id === assetId);
      const existingAssetAmount = existingAsset?.amount;
      const amountToUpdate = (+existingAssetAmount) + (+amount);
      await doc.update({
        assets: firebase.firestore.FieldValue.arrayRemove(existingAsset),
        });
      newAsset.amount = amountToUpdate;
      newAsset.totalPrice = amountToUpdate * boughtPrice;
    } 
    await doc.update({
      assets: firebase.firestore.FieldValue.arrayUnion(newAsset),
    });
    setLoading(false);
    setId("")
    setSymbol("")
    setAmount(0)
    setBoughtPrice(0)
    fetchAssetsData();
  }

  const onDeleteAsset = async () => {
    setVisibleSell(false);
    setLoading(true);    
    const result = await fetchCryptoData(idToSell);
    const doc = firestore.doc(`users/${user?.user?.uid}`);

    const newAsset = {
      id: idAssetToSell,
      name: result?.id,
      image: result?.image?.small || result?.image?.thumb,
      symbol: result?.symbol,
      amount: +maxAmountSell,
      boughtPrice: +boughtPriceToSell,
      totalPrice: +maxAmountSell * +boughtPriceToSell
    };

    const existingAsset = currentUser?.assets?.find(i => i.id === idAssetToSell);
    const existingAssetAmount = existingAsset?.amount;
    const amountToUpdate = (+existingAssetAmount) - (+amountToSell);
    if(+amountToUpdate <= 0){
      await doc.update({
        assets: firebase.firestore.FieldValue.arrayRemove(existingAsset),
      });
      setLoading(false);
      setAmountToSell(0)
      fetchAssetsData();

    }
    else if(+amountToUpdate >= 1) {
      await doc.update({
        assets: firebase.firestore.FieldValue.arrayRemove(existingAsset),
      });
      newAsset.amount = amountToUpdate;
      newAsset.totalPrice = amountToUpdate * boughtPriceToSell;
      await doc.update({
        assets: firebase.firestore.FieldValue.arrayUnion(newAsset),
      });
      setLoading(false);
      setAmountToSell(0)
      fetchAssetsData();
    }
  }
  //get summary values for topic info
  if(currentUser && currentUser.assets?.length){
    myAssets = currentUser.assets;
    names = myAssets.map((obj) => obj.name);
    ids = myAssets.map((obj) => obj.id);
    coins?.forEach((coin) => {
      if(names.includes(coin.id)){
        currentTotalPriceForAsset = (coin.current_price) * (myAssets.find((e) => e.name === coin.id).amount)
      }
      targetCoins.push(currentTotalPriceForAsset)
    })
    targetCoins = [...new Set(targetCoins)];
    capital = myAssets.map((obj) => obj.totalPrice).reduce((partialSum, a) => partialSum + a, 0);
    balance = targetCoins?.reduce((partialSum, a) => partialSum + a, 0) || null;
    if(balance && capital) {
      profit = balance - capital;
    }else{
      profit = null;

    }
    if(profit && capital) {
      currentPercent = ((profit / capital) * 100);
    }
    else{
      currentPercent = null;
    }
  }

  const renderItem = ({item}) => (
    <AssetsItem  
      symbol={item.symbol} 
      name={item.name} 
      logo={item.image} 
      totalPrice={item.totalPrice} 
      boughtPrice={item.boughtPrice}
      amount={item.amount} 
      currentPrice={coins.find((el) => el.id === item.name)?.current_price} 
      percent={coins.find((e) => e.id === item.name)?.price_change_percentage_24h} 
      renderRightActions={()=>(<ListItemSellAction onPress={()=> {
        setVisibleSell(true);
        setIdAssetToSell(`${item.name.toLowerCase()}_${item.boughtPrice}`); 
        setIdToSell(`${item.name.toLowerCase()}`)
        setSymbolSell(item.symbol.toUpperCase()); 
        setMaxAmountSell(item.amount)
        SetBoughtPriceToSell(item.boughtPrice)
      }
      }/>)}
    />
  );
  
  return (
    <>
      <TopicInfo capital={capital} profit={profit} balance={balance} percent={currentPercent}/>
      <View style={styles.container}>
        <BottomModalAdd allCoins={allCoins} id={id} setId={setId} symbol={symbol} setSymbol={setSymbol} boughtPrice={boughtPrice} setBoughtPrice={setBoughtPrice} amount={amount} setAmount={setAmount} visible={visible} setVisible={setVisible} onAddNewAsset={onAddNewAsset}/>
        <BottomModalSell visibleSell={visibleSell} setVisibleSell={setVisibleSell}  maxAmountSell={maxAmountSell} setAmountToSell={setAmountToSell} amountToSell={amountToSell} symbolSell={symbolSell} onDeleteAsset={onDeleteAsset}/>
        <View style={styles.top}>
          <Text style={styles.label}>Your Assets</Text>
          <TouchableOpacity style={styles.btnAdd} onPress={()=>setVisible(true)}>
            <MaterialCommunityIcons name="plus" size={36} color={colors.white} />
          </TouchableOpacity>
        </View>
        <FlatList 
          data={myAssets}
          renderItem={renderItem}
        />
      </View>
    </>
  )
}

export default Assets

const styles = StyleSheet.create({
  container: {
    height: "75%",
    backgroundColor: colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingTop: 0,
    paddingHorizontal: 8,
    paddingBottom:60
  },
  title: {
    fontSize: 20,
    color: colors.primary,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  price: {
    fontSize: 32,
    fontWeight:"bold",
    color: colors.primary,
    marginVertical:5,
  },
  percentContainer: {
    paddingVertical:8,
    paddingHorizontal:12,
    backgroundColor: colors.green,
    borderRadius: 5,
  },
  percent: {
    fontSize: 16,
    color: colors.white,
  }, 
  refund: {
    fontSize: 18,
    color: colors.secondary,
  },
  label: {
    color: colors.primary,
    fontSize: 20,
    fontWeight:"bold",
    textTransform: "capitalize",
  },
  btnAdd: {
    width: 57,
    height: 57,
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: colors.primary, 
  },
  text:{
    color:colors.white,
    fontSize:18,
  },
  amount: {
    fontSize: 80,
    textAlign: "center",
    color: colors.primary,
    textDecorationLine:"none",
    marginVertical:10,
  },
  item:{
    borderWidth: 1,
    borderColor: colors.white,
    padding: 4,
    borderRadius:5,
    backgroundColor: colors.light,
  },
  top:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  }
})