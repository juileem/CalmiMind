import React, { useState, useEffect, createContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import CheckInScreen from './screens/CheckInScreen';
import JournalScreen from './screens/JournalScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

export const AuthContext = createContext(null);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStackNav = createNativeStackNavigator();

const DB_KEY = 'calmi_db_v1';
const SESSION_KEY = 'calmi_session_v1';

function AuthStack() {
  return (
    <AuthStackNav.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <AuthStackNav.Screen name="Login" component={LoginScreen} />
      <AuthStackNav.Screen name="Signup" component={SignupScreen} />
    </AuthStackNav.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-variant-outline';
          else if (route.name === 'CheckIn') iconName = 'check-circle-outline';
          else if (route.name === 'Journal') iconName = 'book-open-outline';
          else if (route.name === 'Profile') iconName = 'account-outline';
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="CheckIn" component={CheckInScreen} />
      <Tab.Screen name="Journal" component={JournalScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(SESSION_KEY).then(res => {
      if (res) setUser(JSON.parse(res));
      setIsLoading(false);
    });
  }, []);

  const login = async (email, password) => {
    await new Promise(r => setTimeout(r, 600)); // artificial delay
    const db = await AsyncStorage.getItem(DB_KEY);
    const users = db ? JSON.parse(db) : [];
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(found));
      setUser(found);
    } else {
      throw new Error('Incorrect email or password.');
    }
  };

  const signup = async (name, email, password) => {
    await new Promise(r => setTimeout(r, 600));
    const db = await AsyncStorage.getItem(DB_KEY);
    const users = db ? JSON.parse(db) : [];
    if (users.find(u => u.email === email)) {
      throw new Error('That email address is already in use.');
    }
    const newUser = { name, email, password };
    users.push(newUser);
    await AsyncStorage.setItem(DB_KEY, JSON.stringify(users));
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A0E3E' }}>
        <ActivityIndicator size="large" color="#C8B5F5" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      <PaperProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName={user ? "MainTabs" : "AuthStack"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}
