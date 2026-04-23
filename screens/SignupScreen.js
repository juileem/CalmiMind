import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { AuthContext } from '../App';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signup } = useContext(AuthContext);

  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length > 5) strength += 1;
    if (pass.match(/[a-z]+/)) strength += 1;
    if (pass.match(/[A-Z]+/)) strength += 1;
    if (pass.match(/[0-9]+/)) strength += 1;
    return strength;
  };

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'];
  
  const strengthLimit = Math.min(Math.max(getPasswordStrength(password) - 1, 0), 3);
  const passStrengthLabel = password ? strengthLabels[strengthLimit] : '';
  const passStrengthColor = password ? strengthColors[strengthLimit] : 'transparent';

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Hold on', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Oops', 'Passwords do not match.');
      return;
    }

    if (getPasswordStrength(password) < 2) {
      Alert.alert('Weak Password', 'Please choose a stronger password.');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email.trim(), password);
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Signup failed', error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#C8B5F5', '#8B7FD1', '#5E4FA0', '#3A2A6B']}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Begin your mindfulness journey with us.</Text>
          </View>

          <BlurView intensity={20} tint="light" style={styles.card}>
            <View style={styles.cardContent}>
              
              <View style={styles.inputContainer}>
                <Icon name="account-outline" size={20} color="#C8B5F5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#C8B5F5"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon name="email-outline" size={20} color="#C8B5F5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#C8B5F5"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon name="lock-outline" size={20} color="#C8B5F5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#C8B5F5"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#C8B5F5" 
                  />
                </TouchableOpacity>
              </View>

              {password.length > 0 && (
                <View style={styles.strengthContainer}>
                  <Text style={[styles.strengthText, { color: passStrengthColor }]}>
                    Strength: {passStrengthLabel}
                  </Text>
                  <View style={styles.strengthBarBg}>
                    <View 
                      style={[
                        styles.strengthBarFill, 
                        { 
                          width: `${((strengthLimit + 1) / 4) * 100}%`,
                          backgroundColor: passStrengthColor
                        }
                      ]} 
                    />
                  </View>
                </View>
              )}

              <View style={styles.inputContainer}>
                <Icon name="lock-check-outline" size={20} color="#C8B5F5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#C8B5F5"
                  secureTextEntry={!showPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <Button
                mode="contained"
                onPress={handleSignup}
                loading={loading}
                disabled={loading}
                style={styles.signupButton}
                labelStyle={styles.signupButtonText}
              >
                Sign Up
              </Button>
              
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E8E0F5',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardContent: {
    padding: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  strengthContainer: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  strengthText: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  strengthBarBg: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  strengthBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  signupButton: {
    borderRadius: 25,
    paddingVertical: 6,
    backgroundColor: '#C8B5F5',
    marginBottom: 20,
    marginTop: 10,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2A6B',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#E8E0F5',
    fontSize: 15,
  },
  loginLink: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
