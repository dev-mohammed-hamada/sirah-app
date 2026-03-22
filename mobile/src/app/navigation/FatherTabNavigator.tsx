import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../theme';
import { AppText } from '../../components/ui/app-text';
import { FatherHomeScreen } from '../../screens/father/father-home-screen';
import { FatherGoalsStackNavigator } from './FatherGoalsStackNavigator';
import type { FatherTabParamList } from './types';
import { ar } from '../../i18n/ar';

const TAB_ICONS: Record<keyof FatherTabParamList, string> = {
  SonsTab: '👨‍👦',
  GoalsTab: '🎯',
};

const Tab = createBottomTabNavigator<FatherTabParamList>();

export function FatherTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.deepNightBlue,
          borderTopWidth: 1,
          borderTopColor: colors.desertGold,
          height: 70,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.desertGold,
        tabBarInactiveTintColor: colors.mutedGray,
        tabBarIcon: ({ color }) => (
          <AppText style={{ fontSize: 20, color, textAlign: 'center' }}>
            {TAB_ICONS[route.name]}
          </AppText>
        ),
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 9,
        },
      })}
    >
      <Tab.Screen
        name="SonsTab"
        component={FatherHomeScreen}
        options={{ tabBarLabel: ar.father.mySons }}
      />
      <Tab.Screen
        name="GoalsTab"
        component={FatherGoalsStackNavigator}
        options={{ tabBarLabel: ar.tabs.goals }}
      />
    </Tab.Navigator>
  );
}
