import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { FatherGoalsStackParamList } from './types';
import { GoalsScreen } from '../../screens/father/goals-screen';
import { CreateGoalScreen } from '../../screens/father/create-goal-screen';

const Stack = createNativeStackNavigator<FatherGoalsStackParamList>();

export function FatherGoalsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GoalsFatherView" component={GoalsScreen} />
      <Stack.Screen name="CreateGoal" component={CreateGoalScreen} />
    </Stack.Navigator>
  );
}
