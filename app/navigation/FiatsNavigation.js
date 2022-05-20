import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FiatsScreen from '../screens/FiatsScreen';
import FiatDetailScreen from '../screens/FiatDetailScreen';
import colors from "../config/colors"

const Stack = createStackNavigator();

const FiatsNavigator = () => (
  <Stack.Navigator  screenOptions={{
    presentation:"modal",
    headerShown:false,
    }}
  >
    <Stack.Screen 
      name="Stocks" 
      component={FiatsScreen} 
      options={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
      }}
    />
    <Stack.Screen 
      name="Stock Detail" 
      component={FiatDetailScreen}
      options={{
        headerShown:false,
      }}
    />
  </Stack.Navigator>
)

export default FiatsNavigator;