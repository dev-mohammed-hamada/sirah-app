import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme';
import { AppText } from '../../components/ui/app-text';
import { FatherHomeScreen } from '../../screens/father/father-home-screen';
import type { FatherTabParamList } from './types';
import { ar } from '../../i18n/ar';

// Placeholder for Goals tab — not yet built
const GoalsScreen = () => (
  <View style={placeholderStyles.container}>
    <AppText style={placeholderStyles.text}>{ar.tabs.goals}</AppText>
  </View>
);

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
        component={GoalsScreen}
        options={{ tabBarLabel: ar.tabs.goals }}
      />
    </Tab.Navigator>
  );
}

const placeholderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.deepNightBlue,
  },
  text: {
    fontSize: 18,
    color: colors.starlightWhite,
    textAlign: 'center',
  },
});
