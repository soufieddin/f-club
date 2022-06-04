import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Item from './Item';
import routes from '../../navigation/routes';
import colors from '../../config/colors';
import ListItemToggleFavoriteAction from '../general/ListItemToggleFavoriteAction'
import { firestore } from '../../firebase/firebase'
import {useAuth} from '../../firebase/auth';
import firebase from 'firebase/compat/app';

const Favorites = ({flatListRef, favosData, navigation, onRefresh, isFetching, favos}) => {
  const {user} = useAuth();
  // const [fav, setFav] = useState(false)
  // const { data: currentUser } = useFirestoreQuery(firestore.collection('users').doc(user.uid));
  const renderItem = ({item}) => (
    <Item 
    symbol={item.symbol}
    name={item.name}
    price={item.current_price}
    percent={item.price_change_percentage_24h_in_currency}
    logo={item.image}
    favos={favos}
    onPress={()=> {
      navigation.navigate(routes.CRYPTO_DETAIL_SCREEN, item);
    }}
    renderRightActions={()=>(<ListItemToggleFavoriteAction  
      fav={favos?.includes(item.name.toLowerCase()) ? true : false}
      onPress={()=> {
        //setFav(!fav)
        let arrayAction;
        if(!favos.includes(item.name.toLowerCase())){
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
    <>
    
    {/* <View style={styles.topic}></View> */}
    <View style={styles.mid}>
        <View style={styles.mid_topic}>
          <Text style={styles.main_title}>Favorites</Text>
        </View>
        {favos?.length ? 
        <FlatList 
          ref={flatListRef}
          keyExtractor={(item) => item.id}
          data = {favosData}
          renderItem = {renderItem}
          onRefresh={onRefresh}
          refreshing={isFetching}
          initialNumToRender={8}
          /> : 
          <View style={styles.textWrapper}>
            <Text style={styles.text}>No favorite cryptos yet!</Text>
          </View>     
        }
        
      </View>
    </>
  )
}

export default Favorites

const styles = StyleSheet.create({
  // topic: {
  //   height: "12%"
  // },
  mid: {
    backgroundColor: colors.white, 
    height: '100%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 8,

  },
  mid_topic: {
    flexDirection: 'column',
    justifyContent: "space-between",
    marginTop: 20,
  },
  textWrapper: {
    height: '100%',
    justifyContent: "center",
    alignItems:"center",
  },
  text: {
    color: colors.white,
    fontSize:24,
    fontWeight:"400",
    backgroundColor: colors.red,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5,
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