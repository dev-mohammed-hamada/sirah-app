import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { colors } from '../../theme';
import type { SonTabParamList } from './types';

// Placeholder screens
const Placeholder = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name}</Text>
  </View>
);

const HomeScreen = () => <Placeholder name="Home" />;
const ProgressScreen = () => <Placeholder name="Progress" />;
const GoalsScreen = () => <Placeholder name="Goals" />;
const AwardsScreen = () => <Placeholder name="Awards" />;
const SettingsScreen = () => <Placeholder name="Settings" />;

const Tab = createBottomTabNavigator<SonTabParamList>();

export function SonTabNavigator() {
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
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'الرئيسية' }} />
      <Tab.Screen name="ProgressTab" component={ProgressScreen} options={{ tabBarLabel: 'التقدم' }} />
      <Tab.Screen name="GoalsTab" component={GoalsScreen} options={{ tabBarLabel: 'الأهداف' }} />
      <Tab.Screen name="AwardsTab" component={AwardsScreen} options={{ tabBarLabel: 'الجوائز' }} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ tabBarLabel: 'الإعدادات' }} />
    </Tab.Navigator>
  );
}
