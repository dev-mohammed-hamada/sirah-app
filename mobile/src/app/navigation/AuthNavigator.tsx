import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AuthStackParamList } from './types';

// Placeholder screens — will be replaced with real implementations
import { View, Text } from 'react-native';

const Placeholder = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name}</Text>
  </View>
);

const SplashScreen = () => <Placeholder name="Splash" />;
const OnboardingScreen = () => <Placeholder name="Onboarding" />;
const LandingScreen = () => <Placeholder name="Landing" />;
const SignUpScreen = () => <Placeholder name="SignUp" />;
const LoginScreen = () => <Placeholder name="Login" />;

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
