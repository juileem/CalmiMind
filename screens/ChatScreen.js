import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChatScreen() {
  const messages = [
    { id: 1, text: 'Hello! I want to work on reducing my stress.', isUser: true },
    { id: 2, text: 'Hi there! I\'m here to help. Let\'s start with a simple breathing exercise. Would you like to try that?', isUser: false },
    { id: 3, text: 'Yes, that sounds great!', isUser: true },
    { id: 4, text: 'Perfect! Take a deep breath in for 4 counts, hold for 4, then exhale for 4. Ready?', isUser: false },
    { id: 5, text: 'I feel more relaxed already. Thank you!', isUser: true },
    { id: 6, text: 'That\'s wonderful! Remember, you can practice this anytime you feel stressed. I\'m always here to guide you.', isUser: false },
  ];

  return (
    <LinearGradient
      colors={['#C8B5F5', '#8B7FD1', '#5E4FA0', '#3A2A6B']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mindful Chat</Text>
        <Text style={styles.headerSubtitle}>Your AI companion</Text>
      </View>

      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isUser ? styles.userMessageWrapper : styles.aiMessageWrapper,
            ]}
          >
            <BlurView
              intensity={20}
              tint="light"
              style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <View style={styles.messageContent}>
                {!message.isUser && (
                  <Icon name="robot-outline" size={20} color="#C8B5F5" style={styles.aiIcon} />
                )}
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            </BlurView>
          </View>
        ))}
      </ScrollView>

      <BlurView intensity={30} tint="dark" style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputPlaceholder}>Type your message...</Text>
          <Icon name="send" size={24} color="#C8B5F5" />
        </View>
      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
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
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 100,
  },
  messageWrapper: {
    marginBottom: 12,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  aiMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    borderRadius: 20,
    maxWidth: '80%',
    overflow: 'hidden',
  },
  userMessage: {
    backgroundColor: 'rgba(200, 181, 245, 0.3)',
  },
  aiMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  messageContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    marginRight: 8,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(58, 42, 107, 0.5)',
  },
  inputPlaceholder: {
    flex: 1,
    color: '#A89BC7',
    fontSize: 16,
  },
});
