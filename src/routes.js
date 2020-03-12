import React from 'react';
import { TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';

import { primaryColor, placeholderColor, whiteColor } from '~/styles/colors';

Icon.loadFont();

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  ) : (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: primaryColor,
        inactiveTintColor: placeholderColor,
        style: {
          backgroundColor: whiteColor,
        },
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="Deliveries"
        component={Deliveries}
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color }) => (
            <Icon name="reorder" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" size={20} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
