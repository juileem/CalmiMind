import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: Date.now().toString(), text: "Hi there! I'm your mindful AI companion. How are you feeling today?", isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now().toString(), text: inputText.trim(), isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:11434' : 'http://192.168.1.98:11434'; // Use Local IP for physical device Expo Go
      const promptContext = "You are a calm, empathetic, and mindful AI therapist named Calmi. Keep responses concise, supportive, and soothing. " + userMsg.text;

      const response = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3',
          prompt: promptContext,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const aiMsg = { 
        id: (Date.now() + 1).toString(), 
        text: data.response.trim(), 
        isUser: false 
      };
      
      setMessages(prev => [...prev, aiMsg]);
      
    } catch (error) {
      console.warn("Ollama Connection Error:", error);
      const errorMsg = { 
        id: (Date.now() + 1).toString(), 
        text: "I'm having a hard time focusing right now. (Please make sure Ollama is running locally with the 'llama3' model).", 
        isUser: false 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <LinearGradient
      colors={['#C8B5F5', '#8B7FD1', '#5E4FA0', '#3A2A6B']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mindful Chat</Text>
        <Text style={styles.headerSubtitle}>Your AI companion</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
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
          
          {isTyping && (
            <View style={[styles.messageWrapper, styles.aiMessageWrapper]}>
               <BlurView intensity={20} tint="light" style={[styles.messageBubble, styles.aiMessage, { padding: 16 }]}>
                 <ActivityIndicator size="small" color="#FFFFFF" />
               </BlurView>
            </View>
          )}
        </ScrollView>

        <BlurView intensity={30} tint="dark" style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.inputField}
              placeholder="Type your message..."
              placeholderTextColor="#A89BC7"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity onPress={handleSend} disabled={isTyping || !inputText.trim()}>
              <Icon 
                name="send" 
                size={24} 
                color={inputText.trim() ? "#C8B5F5" : "rgba(200, 181, 245, 0.4)"} 
              />
            </TouchableOpacity>
          </View>
        </BlurView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? 90 : 60, 
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
    paddingBottom: 40,
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
    maxWidth: '85%',
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
    flexShrink: 1,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: 'rgba(58, 42, 107, 0.5)',
  },
  inputField: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
