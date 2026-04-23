import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

export default function CheckInScreen({ onComplete }) {
  const [checkIns, setCheckIns] = useState({
    sleep: null,
    stress: null,
    caffeine: null,
  });

  const toggleCheckIn = (key, value) => {
    setCheckIns({ ...checkIns, [key]: checkIns[key] === value ? null : value });
  };

  const checkInItems = [
    { 
      key: 'sleep', 
      icon: 'sleep', 
      title: 'Good Sleep', 
      question: 'Did you sleep well last night?' 
    },
    { 
      key: 'stress', 
      icon: 'emoticon-sad-outline', 
      title: 'Stress Level', 
      question: 'Are you feeling stressed today?' 
    },
    { 
      key: 'caffeine', 
      icon: 'coffee', 
      title: 'Caffeine Intake', 
      question: 'Have you had caffeine today?' 
    },
  ];

  return (
    <LinearGradient
      colors={['#C8B5F5', '#8B7FD1', '#5E4FA0', '#3A2A6B']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Daily Check-In</Text>
          <Text style={styles.headerSubtitle}>Track your wellbeing</Text>
        </View>

        {checkInItems.map((item) => (
          <BlurView 
            key={item.key} 
            intensity={20} 
            tint="light" 
            style={styles.checkInCard}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Icon name={item.icon} size={32} color="#C8B5F5" />
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              <Text style={styles.cardQuestion}>{item.question}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    checkIns[item.key] === true && styles.toggleButtonYes,
                  ]}
                  onPress={() => toggleCheckIn(item.key, true)}
                >
                  <Icon 
                    name="check-circle" 
                    size={24} 
                    color={checkIns[item.key] === true ? '#3A2A6B' : '#E8E0F5'} 
                  />
                  <Text
                    style={[
                      styles.toggleButtonText,
                      checkIns[item.key] === true && styles.toggleButtonTextActive,
                    ]}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    checkIns[item.key] === false && styles.toggleButtonNo,
                  ]}
                  onPress={() => toggleCheckIn(item.key, false)}
                >
                  <Icon 
                    name="close-circle" 
                    size={24} 
                    color={checkIns[item.key] === false ? '#3A2A6B' : '#E8E0F5'} 
                  />
                  <Text
                    style={[
                      styles.toggleButtonText,
                      checkIns[item.key] === false && styles.toggleButtonTextActive,
                    ]}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        ))}

        <BlurView intensity={20} tint="light" style={styles.breathingCard}>
          <View style={styles.cardContent}>
            <View style={styles.breathingHeader}>
              <Icon name="lungs" size={40} color="#C8B5F5" />
              <Text style={styles.breathingTitle}>Breathing Exercise</Text>
            </View>
            <Text style={styles.breathingSubtitle}>Coming soon: Guided breathing sessions</Text>
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Advanced Feature</Text>
            </View>
          </View>
        </BlurView>

        {onComplete && (
          <Button
            mode="contained"
            style={styles.submitButton}
            labelStyle={styles.submitButtonText}
            onPress={onComplete}
          >
            Submit Check-In
          </Button>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8E0F5',
    marginTop: 4,
  },
  checkInCard: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardContent: {
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  cardQuestion: {
    fontSize: 16,
    color: '#E8E0F5',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    gap: 8,
  },
  toggleButtonYes: {
    backgroundColor: '#9FE870',
    borderColor: '#9FE870',
  },
  toggleButtonNo: {
    backgroundColor: '#FF8B94',
    borderColor: '#FF8B94',
  },
  toggleButtonText: {
    color: '#E8E0F5',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButtonTextActive: {
    color: '#3A2A6B',
  },
  breathingCard: {
    borderRadius: 20,
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(200, 181, 245, 0.2)',
  },
  breathingHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  breathingTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
  },
  breathingSubtitle: {
    fontSize: 16,
    color: '#E8E0F5',
    textAlign: 'center',
    marginBottom: 16,
  },
  comingSoonBadge: {
    backgroundColor: 'rgba(200, 181, 245, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
  },
  comingSoonText: {
    color: '#C8B5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    borderRadius: 25,
    paddingVertical: 8,
    backgroundColor: '#C8B5F5',
    marginTop: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2A6B',
  },
});
