import React from 'react';
import { TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import Detail from '~/pages/Deliveries/Detail';
import Profile from '~/pages/Profile';

import { primaryColor, placeholderColor, whiteColor } from '~/styles/colors';
import ReportProblem from './pages/Deliveries/ReportProblem';
import ListProblems from './pages/Deliveries/ListProblems';
import ConfirmDelivery from './pages/Deliveries/ConfirmDelivery';

Icon.loadFont();

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function DeliveryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: whiteColor,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <Stack.Screen name=" " component={Deliveries} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={({ navigation }) => ({
          title: 'Detalhes da encomenda',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ReportProblem"
        component={ReportProblem}
        options={({ navigation }) => ({
          title: 'Informar problema',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ListProblems"
        component={ListProblems}
        options={({ navigation }) => ({
          title: 'Visualizar problemas',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ConfirmDelivery"
        component={ConfirmDelivery}
        options={({ navigation }) => ({
          title: 'Confirmar entrega',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

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
        name="DeliveryStack"
        component={DeliveryStack}
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color }) => (
            <Icon name="reorder" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" size={25} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
