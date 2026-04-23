import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ProgressBar } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export default function InsightsScreen() {
  const upcomingFeatures = [
    { 
      icon: 'chart-timeline-variant', 
      title: 'Advanced Analytics', 
      description: 'Track your mindfulness journey over time' 
    },
    { 
      icon: 'meditation', 
      title: 'Guided Meditations', 
      description: 'Curated meditation sessions for every mood' 
    },
    { 
      icon: 'brain', 
      title: 'AI Insights', 
      description: 'Personalized recommendations based on your patterns' 
    },
  ];

  return (
    <LinearGradient
      colors={['#C8B5F5', '#8B7FD1', '#5E4FA0', '#3A2A6B']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Insights</Text>
          <Text style={styles.headerSubtitle}>Track your progress</Text>
        </View>

        <BlurView intensity={20} tint="light" style={styles.progressCard}>
          <View style={styles.cardContent}>
            <View style={styles.progressHeader}>
              <Icon name="trophy-outline" size={32} color="#C8B5F5" />
              <Text style={styles.progressTitle}>Weekly Mindfulness</Text>
            </View>
            <Text style={styles.progressSubtitle}>5 out of 7 days completed</Text>
            <ProgressBar 
              progress={0.71} 
              color="#C8B5F5" 
              style={styles.progressBar}
            />
            <Text style={styles.progressLabel}>71% complete</Text>
          </View>
        </BlurView>

        <BlurView intensity={20} tint="light" style={styles.statsCard}>
          <View style={styles.cardContent}>
            <Text style={styles.sectionTitle}>This Week</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Icon name="meditation" size={28} color="#9FE870" />
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Sessions</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Icon name="timer-outline" size={28} color="#C8B5F5" />
                <Text style={styles.statValue}>84</Text>
                <Text style={styles.statLabel}>Minutes</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Icon name="fire" size={28} color="#FFB347" />
                <Text style={styles.statValue}>7</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
            </View>
          </View>
        </BlurView>

        <Text style={styles.upcomingTitle}>Upcoming Features</Text>

        {upcomingFeatures.map((feature, index) => (
          <BlurView 
            key={index} 
            intensity={20} 
            tint="light" 
            style={styles.featureCard}
          >
            <View style={styles.featureContent}>
              <View style={styles.featureIconContainer}>
                <Icon name={feature.icon} size={32} color="#C8B5F5" />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>Soon</Text>
              </View>
            </View>
          </BlurView>
        ))}
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
  progressCard: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardContent: {
    padding: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  progressSubtitle: {
    fontSize: 16,
    color: '#E8E0F5',
    marginBottom: 16,
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressLabel: {
    fontSize: 14,
    color: '#C8B5F5',
    marginTop: 8,
    fontWeight: '600',
  },
  statsCard: {
    borderRadius: 20,
    marginBottom: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#E8E0F5',
    marginTop: 4,
  },
  upcomingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  featureCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(200, 181, 245, 0.2)',
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(200, 181, 245, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#E8E0F5',
  },
  comingSoonBadge: {
    backgroundColor: 'rgba(200, 181, 245, 0.4)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  comingSoonText: {
    color: '#C8B5F5',
    fontSize: 12,
    fontWeight: '600',
  },
});
