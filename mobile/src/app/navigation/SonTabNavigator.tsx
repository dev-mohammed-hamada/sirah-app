import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme';
import { AppText } from '../../components/ui/app-text';
import { JourneyMapScreen } from '../../screens/son/journey-map-screen';
import { ProgressScreen } from '../../screens/son/progress-screen';
import { GoalsScreen } from '../../screens/son/goals-screen';
import type { SonTabParamList } from './types';
import { ar } from '../../i18n/ar';

// Placeholder screens for tabs not yet built
const Placeholder = ({ name }: { name: string }) => (
  <View style={placeholderStyles.container}>
    <AppText style={placeholderStyles.text}>{name}</AppText>
  </View>
);

// ProgressScreen imported from ../../screens/son/progress-screen
// GoalsScreen imported from ../../screens/son/goals-screen
const AwardsScreen = () => <Placeholder name={ar.tabs.awards} />;
const SettingsScreen = () => <Placeholder name={ar.tabs.settings} />;

const TAB_ICONS: Record<keyof SonTabParamList, string> = {
  HomeTab: '🏠',
  ProgressTab: '📊',
  GoalsTab: '🎯',
  AwardsTab: '🏆',
  SettingsTab: '⚙️',
};

const Tab = createBottomTabNavigator<SonTabParamList>();

export function SonTabNavigator() {
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
        name="HomeTab"
        component={JourneyMapScreen}
        options={{ tabBarLabel: ar.tabs.home }}
      />
      <Tab.Screen
        name="ProgressTab"
        component={ProgressScreen}
        options={{ tabBarLabel: ar.tabs.progress }}
      />
      <Tab.Screen
        name="GoalsTab"
        component={GoalsScreen}
        options={{ tabBarLabel: ar.tabs.goals }}
      />
      <Tab.Screen
        name="AwardsTab"
        component={AwardsScreen}
        options={{ tabBarLabel: ar.tabs.awards }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ tabBarLabel: ar.tabs.settings }}
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
