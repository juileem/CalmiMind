import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Button } from 'react-native-paper';

export default function OnboardingScreen({ onComplete }) {
  const [answers, setAnswers] = useState({
    question1: null,
    question2: null,
    question3: null,
  });

  const questions = [
    { id: 'question1', text: 'Do you often feel stressed or anxious?' },
    { id: 'question2', text: 'Would you like to improve your sleep quality?' },
    { id: 'question3', text: 'Are you interested in mindfulness practices?' },
  ];

  const toggleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const allAnswered = Object.values(answers).every(answer => answer !== null);

  return (
    <LinearGradient
      colors={['#C8B5F5', '#8B7FD1', '#5E4FA0', '#3A2A6B']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Welcome to Calmi</Text>
        <Text style={styles.subtitle}>Let's personalize your mindfulness journey</Text>

        {questions.map((question, index) => (
          <BlurView intensity={20} tint="light" style={styles.questionCard} key={question.id}>
            <View style={styles.cardContent}>
              <Text style={styles.questionNumber}>Question {index + 1}</Text>
              <Text style={styles.questionText}>{question.text}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.yesNoButton,
                    answers[question.id] === true && styles.yesNoButtonActive,
                  ]}
                  onPress={() => toggleAnswer(question.id, true)}
                >
                  <Text
                    style={[
                      styles.yesNoButtonText,
                      answers[question.id] === true && styles.yesNoButtonTextActive,
                    ]}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.yesNoButton,
                    answers[question.id] === false && styles.yesNoButtonActive,
                  ]}
                  onPress={() => toggleAnswer(question.id, false)}
                >
                  <Text
                    style={[
                      styles.yesNoButtonText,
                      answers[question.id] === false && styles.yesNoButtonTextActive,
                    ]}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        ))}

        <Button
          mode="contained"
          onPress={onComplete}
          disabled={!allAnswered}
          style={[styles.continueButton, !allAnswered && styles.continueButtonDisabled]}
          labelStyle={styles.continueButtonText}
        >
          Continue to Calmi
        </Button>
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
    marginBottom: 40,
    textAlign: 'center',
  },
  questionCard: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardContent: {
    padding: 24,
  },
  questionNumber: {
    fontSize: 12,
    color: '#C8B5F5',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  questionText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
    lineHeight: 26,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  yesNoButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  yesNoButtonActive: {
    backgroundColor: '#C8B5F5',
    borderColor: '#C8B5F5',
  },
  yesNoButtonText: {
    textAlign: 'center',
    color: '#E8E0F5',
    fontSize: 16,
    fontWeight: '600',
  },
  yesNoButtonTextActive: {
    color: '#3A2A6B',
  },
  continueButton: {
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 6,
    backgroundColor: '#C8B5F5',
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(200, 181, 245, 0.4)',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A2A6B',
  },
});
