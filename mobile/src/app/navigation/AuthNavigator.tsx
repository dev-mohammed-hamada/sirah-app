import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthStackParamList } from './types';
import { LandingScreen } from '../../screens/auth/landing-screen';
import { SignUpScreen } from '../../screens/auth/sign-up-screen';
import { LoginScreen } from '../../screens/auth/login-screen';
import { OnboardingScreen } from '../../screens/auth/OnboardingScreen';
import { colors } from '../../theme';

// Placeholder screens — will be replaced with real implementations
const Placeholder = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name}</Text>
  </View>
);

const SplashScreen = () => <Placeholder name="Splash" />;

const ONBOARDING_COMPLETE_KEY = 'onboarding_complete';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY)
      .then((value) => {
        setShowOnboarding(value !== 'true');
      })
      .catch(() => {
        setShowOnboarding(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.deepNightBlue,
        }}
      >
        <ActivityIndicator color={colors.desertGold} size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showOnboarding && <Stack.Screen name="Onboarding" component={OnboardingScreen} />}
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
