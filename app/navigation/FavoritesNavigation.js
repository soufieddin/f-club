import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FavoritesCryptosScreen from '../screens/FavoritesCryptosScreen'
import CryptoDetailScreen from '../screens/CryptoDetailScreen';
import colors from "../config/colors"

const Stack = createStackNavigator();

const CryptosNavigator = () => (
  <Stack.Navigator  screenOptions={{
    presentation:"modal",
    headerShown:false,
    }}
  >
    <Stack.Screen 
      name="Favorites" 
      component={FavoritesCryptosScreen} 
      options={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        labeled: false,
      }}
    />
    <Stack.Screen 
      name="CryptoDetail" 
      component={CryptoDetailScreen}
      options={{
        headerShown:false,
      }}
    />
  </Stack.Navigator>
)

export default CryptosNavigator;