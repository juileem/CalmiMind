import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';

import OnboardingScreen from './screens/OnboardingScreen';
import ChatScreen from './screens/ChatScreen';
import CheckInScreen from './screens/CheckInScreen';
import InsightsScreen from './screens/InsightsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  if (!hasCompletedOnboarding) {
    return (
      <PaperProvider>
        <StatusBar style="light" />
        <OnboardingScreen onComplete={() => setHasCompletedOnboarding(true)} />
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Chat') {
                iconName = 'message-text-outline';
              } else if (route.name === 'Check-In') {
                iconName = 'checkbox-marked-circle-outline';
              } else if (route.name === 'Insights') {
                iconName = 'chart-line';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#C8B5F5',
            tabBarInactiveTintColor: '#8B7FD1',
            tabBarStyle: {
              backgroundColor: '#1A0E3E',
              borderTopColor: 'rgba(200, 181, 245, 0.2)',
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Check-In" component={CheckInScreen} />
          <Tab.Screen name="Insights" component={InsightsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
