import { View, Text, Image, StyleSheet,TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../../config/colors';
import { useFirestoreQuery } from '../../firebase/useFirestoreQuery';
import { firestore } from '../../firebase/firebase'
import {useAuth} from '../../firebase/auth';
import firebase from 'firebase/compat/app';

const TopicCard = ({name, image, price, percent, id}) => {
  const {user} = useAuth();
  const percentColor = percent > 0 ? `${colors.green}` : `${colors.red}` || `${colors.white}`;
  const percentSymbol = percent > 0 ? "+" : "";
  const { data: currentUser } = useFirestoreQuery(firestore.collection('users').doc(user.uid));

  return (
    <View style={styles.container}>
      <View style={styles.topicWrapper}>
        <View style={styles.topicSymbols}>
          <Text style={styles.name}>{name}</Text>
          <Image source={{uri: image}} style={styles.image} />
        </View>
        <View style={styles.topicNumbers}>
          <Text style={styles.price}>
            $ {price?.toFixed(2)}
          </Text>
          <Text style={[styles.percent, {color: percentColor}]}>
            {percentSymbol}{percent?.toFixed(2)}%
          </Text>
        </View>
        <View style={styles.topicActions}>
          {/* <TouchableWithoutFeedback onPress={()=>console.log("Notification", id)}>
            <View style={styles.action}>
              <MaterialCommunityIcons name="bell" size={20} color={colors.white}/>
            </View>
          </TouchableWithoutFeedback> */}
          <TouchableWithoutFeedback onPress={()=> {
              let arrayAction;
              if(!currentUser?.favorite_cryptos?.includes(id)){
                arrayAction = firebase.firestore.FieldValue.arrayUnion;
              }
              else{
                arrayAction = firebase.firestore.FieldValue.arrayRemove;
              }
              const doc =firestore.doc(`users/${user.uid}`);
              doc.update({
                favorite_cryptos:arrayAction(
                  id
                )
              })
            }}>
            <View style={styles.action}>
              <MaterialCommunityIcons name="star" size={20} color={currentUser?.favorite_cryptos?.includes(id) ? colors.yellow : colors.white}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height:"25%" ,
  },
  topicWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 16,
    height: "100%"

  },
  topicSymbols: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    color: colors.primary,
  },
  image: {
    height: 32,
    width: 32,
  },
  topicNumbers: {
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 32,
    fontWeight:"bold",
    color: colors.primary,
  },
  percent: {
    fontSize: 16,
  },
  topicActions: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  action: {
    height: 32,
    width: 32,
    borderRadius:16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default TopicCard
