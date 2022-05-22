import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons'


import CryptosNavigation from './CryptosNavigation';
import StocksNavigation from './StocksNavigation';
import FiatsNavigation from './FiatsNavigation';
import AccountNavigator from './AccountNavigator'
import colors from '../config/colors'
const Tab = createBottomTabNavigator();


const AppNavigator = () => {
 
  return (
    <Tab.Navigator
    screenOptions={() => ({
      tabBarOptions:{
        style: {
          borderTopWidth: 0, 
          borderTopColor: "transparent"
        }
    },
      tabBarStyle:{
        backgroundColor: colors.primary,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 10,
        height: 56,
      },
      tabBarShowLabel: false,
    })}
    >
      <Tab.Screen 
      
        name="Cryptos page" 
        component={CryptosNavigation}
        options={{
          headerShown:false,
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons name="bitcoin" size={32} color={focused ? `${colors.white}` : `${colors.light}`}/>
          )
        }}
      />

      <Tab.Screen 
        name="Stocks page" 
        component={StocksNavigation}
        options={{
          headerShown:false,
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons name="chart-arc" size={32} color={focused ? `${colors.white}` : `${colors.light}`}/>
          )
        }}
      />

      <Tab.Screen 
        name="Fiat" 
        component={FiatsNavigation}
        options={{
          headerShown:false,
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons name="currency-usd" size={32} color={focused ? `${colors.white}` : `${colors.light}`}/>
          )
        }}
      />

      <Tab.Screen 
        name="My Profile" 
        component={AccountNavigator}
        options={{
          headerShown:false,
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons name="account-circle" size={32} color={focused ? `${colors.white}` : `${colors.light}`}/>
          )
        }}
      />
    </Tab.Navigator>
  )
}



export default AppNavigator;