import React from 'react'
import { StyleSheet, View } from 'react-native'
import {useAuth} from '../firebase/auth';
import colors from '../config/colors'
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import Icon from '../components/Icon';


export default function AccountScreen({navigation}) {
  const{logout} = useAuth();
  return (
    <Screen style={styles.container}>
      <View style={styles.wrapper}>
      <ListItem
        title='Profile'
        IconComponent={
          <Icon
            name='account'
            backgroundColor={colors.primary}
          />
        }
        onPress={() => {navigation.navigate("Profile")}}
        />
        <View style={styles.out}>
          <ListItem
            style={styles.leave}
            title="Log Out"
            IconComponent={
              <Icon
                name="logout"
                backgroundColor={colors.red}
              />
            }
            onPress={logout}
          />
        </View>

      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical:20,

  },
  out:{
    marginTop:50
  }
})
