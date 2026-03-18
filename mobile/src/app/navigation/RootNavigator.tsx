import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../../stores/auth-store';
import { colors } from '../../theme';
import { AuthNavigator } from './AuthNavigator';
import { SonTabNavigator } from './SonTabNavigator';
import { FatherTabNavigator } from './FatherTabNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isAuthenticated, isLoading, user, loadStoredAuth } = useAuthStore();

  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.deepNightBlue }}>
        <ActivityIndicator size="large" color={colors.desertGold} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : user?.accountType === 'FATHER' ? (
          <Stack.Screen name="FatherTabs" component={FatherTabNavigator} />
        ) : (
          <Stack.Screen name="SonTabs" component={SonTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
