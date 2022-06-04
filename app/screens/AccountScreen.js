import React, {useState} from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import {useAuth} from '../firebase/auth';
import colors from '../config/colors'
import Screen from '../components/general/Screen';
import ListItem from '../components/general/ListItem';
import Icon from '../components/general/Icon';
import ActivityIndicator from '../components/general/ActivityIndicator';


export default function AccountScreen({navigation}) {
  const{logout, deleteAccount} = useAuth();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <View style={styles.wrapper}>
        <ListItem
          title='Edit My Profile'
          IconComponent={
            <Icon
              name='account'
              backgroundColor={colors.primary}
            />
          }
          onPress={() => {navigation.navigate("Profile")}}
          />
          <View style={styles.wrapper}>
            <ListItem
              style={styles.leave}
              title="Log Out"
              IconComponent={
                <Icon
                  name="logout"
                  backgroundColor={colors.secondary}
                />
              }
              onPress={logout}
            />
          </View>

          <View style={styles.wrapper}>
            <ListItem
              style={styles.leave}
              title="Delete My Account"
              IconComponent={
                <Icon
                  name="delete"
                  backgroundColor={colors.red}
                />
              }
              onPress={()=> {
                Alert.alert('Alert', 'Are you sure you want to delete your account and all your data ?', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'Delete', onPress: async() => {
                    setLoading(true)
                    try {
                      await deleteAccount();
                      setLoading(false)
                    }catch(error){
                      console.log(error);
                      setLoading(false)
                    }
                  } },
                ]);
              }}
            />
          </View>

        </View>
      </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical:20,

  },
  wrapper:{
    marginTop:20
  }
})
