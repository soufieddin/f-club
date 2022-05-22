import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StocksScreen from '../screens/StocksScreen';
import StockDetailScreen from '../screens/StockDetailScreen';
import colors from "../config/colors"

const Stack = createStackNavigator();

const StocksNavigator = () => (
  <Stack.Navigator  screenOptions={{
    presentation:"modal",
    headerShown:false,
    }}
  >
    <Stack.Screen 
      name="Stocks" 
      component={StocksScreen} 
      options={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
      }}
    />
    <Stack.Screen 
      name="StockDetail" 
      component={StockDetailScreen}
      options={{
        headerShown:false,
      }}
    />
  </Stack.Navigator>
)

export default StocksNavigator;