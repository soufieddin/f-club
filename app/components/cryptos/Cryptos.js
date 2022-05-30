import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Item from './Item';
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import FavTabs from '../general/FavTabs'
import ListItemToggleFavoriteAction from '../general/ListItemToggleFavoriteAction'
import { useFirestoreQuery } from '../../firebase/useFirestoreQuery';
import { firestore } from '../../firebase/firebase'
import {useAuth} from '../../firebase/auth';
import firebase from 'firebase/compat/app';

const Cryptos = ({query, flatListRef, cryptos, favosData, navigation, onRefresh, isFetching, results, tab, setTab, onEndReached, favos}) => {
  const {user} = useAuth();
  const { data: currentUser } = useFirestoreQuery(firestore.collection('users').doc(user.uid));
  const renderItem = ({item}) => (
    <Item 
    symbol={item.symbol}
    name={item.name}
    price={!query ? item.current_price : null}
    percent={!query ? item.price_change_percentage_24h_in_currency : null}
    logo={!query ? item.image : item.thumb}
    favos={favos}
    onPress={()=> {
      navigation.navigate(routes.CRYPTO_DETAIL_SCREEN, item);
    }}
    renderRightActions={()=>(<ListItemToggleFavoriteAction  
      fav={favos.includes(item.name.toLowerCase()) ? true : false}
      onPress={()=> {
        let arrayAction;
        if(!currentUser?.favorite_cryptos?.includes(item.name.toLowerCase())){
          arrayAction = firebase.firestore.FieldValue.arrayUnion;
        }
        else{
          arrayAction = firebase.firestore.FieldValue.arrayRemove;
        }
        const doc =firestore.doc(`users/${user.uid}`);
        doc.update({
          favorite_cryptos:arrayAction(
            item.name.toLowerCase()
          )
        })
      }}
    
    />)}
    />
  );
  
  return (
    <View style={styles.mid}>
        <View style={styles.mid_topic}>
          <Text style={styles.main_title}>{query ? `Search results of ${query}` : "Crypto Market"}</Text>
          {!query &&
            <FavTabs tab={tab} setTab={setTab}/>        
          }
        </View>
        <FlatList 
          ref={flatListRef}
          keyExtractor={(item) => item.id}
          data = {query ? results : tab==="all" ? cryptos : favosData}
          renderItem = {renderItem}
          onRefresh={!query ? onRefresh : null}
          refreshing={isFetching}
          initialNumToRender={8}
          onEndReached={onEndReached}
          />
      </View>
  )
}

export default Cryptos

const styles = StyleSheet.create({
  mid: {
    backgroundColor: colors.white, 
    height: '88%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 8,
  },
  mid_topic: {
    flexDirection: 'column',
    justifyContent: "space-between",
    marginTop: 20,
  },
  text: {
    color: colors.white,
    fontSize:24,
    fontWeight:"bold",
  },
  main_title: {
    fontSize: 18,
    color: colors.primary,
    fontWeight:"bold",
    marginBottom: 20,
  },
  fav:{
    color: colors.primary,
  }
})