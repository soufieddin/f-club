import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WalletScreen from '../screens/WalletScreen';
//import FiatDetailScreen from '../screens/FiatDetailScreen';
import colors from "../config/colors"

const Stack = createStackNavigator();

const WalletNavigator = () => (
  <Stack.Navigator  screenOptions={{
    presentation:"modal",
    headerShown:false,
    }}
  >
    <Stack.Screen 
      name="Wallet" 
      component={WalletScreen} 
      options={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
      }}
    />
    {/* <Stack.Screen 
      name="FiatDetail" 
      component={FiatDetailScreen}
      options={{
        headerShown:false,
      }}
    /> */}
  </Stack.Navigator>
)

export default WalletNavigator;