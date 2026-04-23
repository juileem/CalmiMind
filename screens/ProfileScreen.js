import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../App';

export default function ProfileScreen({ navigation }) {
  const { logout, user } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.replace('AuthStack');
  };

  return (
    <LinearGradient
      colors={['#1A0E3E', '#3A2A6B']}
      style={styles.container}
    >
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>{user?.name || 'User'}</Text>
      <Text style={styles.subtitle}>{user?.email}</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E8E0F5',
    marginBottom: 4,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#C8B5F5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  buttonText: {
    color: '#3A2A6B',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
