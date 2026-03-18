import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { colors } from '../../theme';
import type { FatherTabParamList } from './types';

// Placeholder screens
const Placeholder = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name}</Text>
  </View>
);

const SonsScreen = () => <Placeholder name="Sons" />;
const GoalsScreen = () => <Placeholder name="Goals" />;

const Tab = createBottomTabNavigator<FatherTabParamList>();

export function FatherTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.deepNightBlue,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.desertGold,
        tabBarInactiveTintColor: colors.mutedGray,
      }}
    >
      <Tab.Screen name="SonsTab" component={SonsScreen} options={{ tabBarLabel: 'أبنائي' }} />
      <Tab.Screen name="GoalsTab" component={GoalsScreen} options={{ tabBarLabel: 'الأهداف' }} />
    </Tab.Navigator>
  );
}
