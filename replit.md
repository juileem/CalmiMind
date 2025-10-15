# Calmi - Mindfulness Mobile App Prototype

## Overview
Calmi is a React Native (Expo) mobile app prototype featuring a beautiful lavender-glass aesthetic inspired by mindfulness and meditation apps. This is a front-end only prototype with no backend integration.

## Current State
The app is fully functional with all 4 screens implemented:
- **Onboarding**: 3 Yes/No questions with Continue button navigation
- **Chat**: Static scrollable message list with user & AI messages
- **Check-In**: Togglable Yes/No buttons for sleep, stress, and caffeine tracking
- **Insights**: Static progress bar and upcoming features cards

## Architecture
- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs)
- **UI Library**: React Native Paper
- **Design Elements**: 
  - expo-linear-gradient for purple-blue gradients
  - expo-blur for frosted glass effects
  - react-native-vector-icons for icons

## Design System
- **Background**: Lavender → Deep Purple gradient (#C8B5F5 → #3A2A6B)
- **Foreground**: Semi-transparent blur cards with rgba(255,255,255,0.15)
- **Text**: Soft white (#FFFFFF) and pastel gray (#E8E0F5)
- **Buttons**: Rounded, shadowed, pastel gradient (#C8B5F5)
- **Accent Colors**: Green (#9FE870), Coral (#FF8B94), Orange (#FFB347)

## Project Structure
```
/
├── App.js                    # Main app entry with navigation
├── screens/
│   ├── OnboardingScreen.js   # 3-question onboarding flow
│   ├── ChatScreen.js          # Static chat interface
│   ├── CheckInScreen.js       # Daily wellness tracking
│   └── InsightsScreen.js      # Progress and upcoming features
├── app.json                   # Expo configuration
├── babel.config.js            # Babel config with Paper plugin
└── package.json               # Dependencies
```

## Running the App
The app runs on port 5000 using Expo Go:
```
npx expo start --port 5000
```
Scan the QR code with:
- **iOS**: Camera app
- **Android**: Expo Go app

## Recent Changes
- 2025-10-15: Initial implementation of all 4 screens with lavender-glass aesthetic
- 2025-10-15: React Navigation bottom tabs configured
- 2025-10-15: Expo workflow configured on port 5000

## User Preferences
None documented yet.

## Future Enhancements (from Architect Review)
1. Add icon/splash assets or adjust app.json paths to avoid build warnings
2. Persist onboarding completion (SecureStore/AsyncStorage) for returning users
3. Centralize shared gradient/blur styles for easier maintenance
4. Implement functional breathing exercises with animations
5. Add local data persistence for check-ins and chat history
6. Create interactive progress charts with data visualization
