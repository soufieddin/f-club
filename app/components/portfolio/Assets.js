import { StyleSheet, Text, View, FlatList, TextInput, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import colors from '../../config/colors'
import Button from '../general/Button'
import AssetsItem from './AssetsItem'
import { BottomSheet } from 'react-native-btr';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import ActivityIndicator from '../general/ActivityIndicator';

// import { useRecoilState } from 'recoil'
// import { portfolioAssetsFirebse } from '../../atoms/PortfolioAssets'
import SearchableDropdown from 'react-native-searchable-dropdown';
import {useAuth} from '../../firebase/auth';
import firebase from 'firebase/compat/app';
import { getData } from '../../hooks/useFetch';
import { firestore } from '../../firebase/firebase'
import { useFirestoreQuery } from '../../firebase/useFirestoreQuery';
import ListItemSellAction from '../general/ListItemSellAction'

const Assets = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useAuth();
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
  const myPrice = React.createRef()
  const myAmount = React.createRef()
  const allCoinsUrl = 'https://api.coingecko.com/api/v3/coins/list?include_platform=false'

  const { data: currentUser } = useFirestoreQuery(firestore.collection('users').doc(user.user.uid));

  let myAssets = [];
  let names = [];
  let ids = [];

  if(currentUser && currentUser.assets?.length){
    myAssets = currentUser.assets;
    names = myAssets.map((obj) => obj.name);
    ids = currentUser.assets.map((obj) => obj.id);
  }
  // const myAssets = currentUser?.assets && currentUser?.assets.length > 1
  // && currentUser.assets.sort((a, b) => (a.amount * a.boughtPrice ) < (b.amount * b.boughtPrice )) || [];
  // const names = myAssets && myAssets.length > 1 && myAssets.map((obj) => obj.name) || [];
  // const ids = currentUser?.assets && currentUser?.assets.length > 1 && currentUser.assets.map((obj) => obj.id) || [];

  
  const assetsUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${names?.join('%2C%20')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
  
  const fetchAssetsData = async () => {
    if(isFetching){
      return;
    }
    if(!ids) {
      return;
    }
    setIsFetching(true);
    const assetsResult = await getData(assetsUrl);
    setCoins(assetsResult);
    setIsFetching(false);
  }

  useEffect(()=> {
    fetchAssetsData();
  }, [ids])

  const fetchAllCoins = async () => {
    if(isFetching){
      return;
    }
    setIsFetching(true)
    const coinsList = await getData(allCoinsUrl);
    setAllCoins(coinsList)
    setIsFetching(false);
  }
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  const toggleBottomNavigationViewSell = () => {
    //Toggling the visibility state of the bottom sheet
    setVisibleSell(!visibleSell);
  };

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
      setLoading(false);
      setId("")
      setSymbol("")
      setAmount(0)
      setBoughtPrice(0)
    } else {
      await doc.update({
        assets: firebase.firestore.FieldValue.arrayUnion(newAsset),
      });
      setLoading(false);
      setId("")
      setSymbol("")
      setAmount(0)
      setBoughtPrice(0)
    }
  }


  const onDeleteAsset = async () => {
    let start = new Date();
    setVisibleSell(false)
    setLoading(true);    
    start = new Date();
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
      start = new Date();
      await doc.update({
        assets: firebase.firestore.FieldValue.arrayRemove(existingAsset),
      });
      setLoading(false);
      setAmountToSell(0)
    }
    else if(+amountToUpdate >= 1) {
      start = new Date();
      await doc.update({
        assets: firebase.firestore.FieldValue.arrayRemove(existingAsset),
      });
      newAsset.amount = amountToUpdate;
      newAsset.totalPrice = amountToUpdate * boughtPriceToSell;
      start = new Date();
      await doc.update({
        assets: firebase.firestore.FieldValue.arrayUnion(newAsset),
      });
      setLoading(false);
      setAmountToSell(0)
    }
  }

  // const onDeleteAsset = async () => {
    
  // }
  useEffect(()=> {
    fetchAllCoins();
  }, [])
 
  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={styles.container}>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}
        >
          <View style={styles.bottomNavigationView}>
          <Text style={styles.label}>Add A New Asset</Text>
            <SearchableDropdown
              items={allCoins}
              onItemSelect={(item)=>{setId(item.id); setSymbol(item.symbol)}}
              containerStyle={styles.dropdownContainer}
              itemStyle={styles.item}
              itemTextStyle={styles.itemText}
              resetValue={false}
              placeholder={id || "Select a Coin... "}
              placeholderTextColor={colors.light}
              textInputProps={{
                underlineColorAndroid: "transparent",
                style:{
                  padding: 8,
                  borderWidth: 1,
                  borderColor: colors.light,
                  borderRadius: 10,
                  backgroundColor: colors.white,
                  color: colors.primary,
                },
              }}
            
            />
            <View style={styles.amountWrapper}>
              <TextInput
                ref={myAmount}
                multiline
                keyboardType = 'numeric'
                placeholder="0"
                placeholderTextColor={colors.light}
                style={styles.amount}
                onChangeText={(text)=>setAmount(text)}
                value={amount ? `${amount}` : ""}
              />
              <Text style={styles.symbol}>{symbol.toUpperCase() || ""}</Text>

            </View>
              <TextInput
                ref={myPrice}
                keyboardType = 'numeric'
                placeholder="Buying Price in $"
                placeholderTextColor={colors.light}
                style={styles.input}
                onChangeText={(text)=>setBoughtPrice(text)}
                value={boughtPrice ? `${boughtPrice}` : ""}
              />

              <Button styleBtn={styles.btn} text="Add Asset" styleText={styles.text} color={!id || !boughtPrice || !amount ? "light" : "primary"} onPress={onAddNewAsset} disabled={!id || !boughtPrice || !amount ? true : false}/>

          </View>
        </BottomSheet>
        <BottomSheet
          visible={visibleSell}
          onBackButtonPress={toggleBottomNavigationViewSell}
          onBackdropPress={toggleBottomNavigationViewSell}
        >
          <View style={styles.bottomNavigationViewSell}>
          <Text style={styles.label}>Remove Items from Asset</Text>
            <View style={styles.amountWrapper}>
              <TextInput
                ref={myAmount}
                multiline
                keyboardType = 'numeric'
                placeholder={`${maxAmountSell}`}
                placeholderTextColor={colors.light}
                style={styles.amount}
                onChangeText={(text)=> {text > maxAmountSell ? setAmountToSell(maxAmountSell) : setAmountToSell(text)}}
                value={amountToSell > 0 ? `${amountToSell}` : ""}
              />
              <Text style={styles.symbol}>{symbolSell.toUpperCase() || ""}</Text>

            </View>
            <Button styleBtn={styles.btn} text="Submit" styleText={styles.text} color={!amountToSell ? "light" : "primary"} onPress={onDeleteAsset} disabled={!amountToSell ? true : false}/>

          </View>
        </BottomSheet>
        <View style={styles.top}>
          <Text style={styles.label}>Your Assets</Text>
          <Pressable style={styles.btnAdd} onPress={()=>setVisible(true)}>
            <MaterialCommunityIcons name="plus" size={36} color={colors.white} />
          </Pressable>
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
  btn: {
    width: '100%',
    height: 60,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: colors.thirdly, 
  },
  text:{
    color:colors.white,
    fontSize:18,
  },
  bottomNavigationView: {
    backgroundColor: colors.white,
    width: '100%',
    height: "60%",
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    paddingHorizontal: 8,
    paddingVertical: 20,
    flexDirection: 'column',
    justifyContent: "space-between"
  },
  bottomNavigationViewSell: {
    backgroundColor: colors.white,
    width: '100%',
    height: "40%",
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    paddingHorizontal: 8,
    paddingVertical: 20,
    flexDirection: 'column',
    justifyContent: "space-between"
  },
  input: {
    borderRadius:10,
    borderWidth: 1,
    borderColor: colors.thirdly,
    padding: 8,
    width: '100%',
    marginBottom: 10,
    color: colors.primary,

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
  itemText: {
    color: colors.white,
    textAlign: "center",
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  symbol: {
    fontSize: 18,
    color: colors.light,
    marginLeft: 10
  },
  top:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  }
})