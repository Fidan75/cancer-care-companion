
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

import AICompanion from './screens/AICompanion';
import AppointmentPlanner from './screens/AppointmentPlanner';
import CancerLibrary from './screens/CancerLibrary';
import MedicalDictionary from './screens/MedicalDictionary';
import WellbeingDiary from './screens/WellbeingDiary';
import DoctorQuestions from './screens/DoctorQuestions';
import ReportExplainer from './screens/ReportExplainer';

const screens: Record<string, React.ComponentType> = {
  ai: AICompanion,
  appointments: AppointmentPlanner,
  library: CancerLibrary,
  dictionary: MedicalDictionary,
  diary: WellbeingDiary,
  questions: DoctorQuestions,
  reports: ReportExplainer,
};

const menu = [
  { id: 'ai', icon: '✦', label: 'AI Companion', description: 'Get general information and support' },
  { id: 'appointments', icon: '▦', label: 'Appointments', description: 'Organize upcoming appointments' },
  { id: 'library', icon: '▤', label: 'Cancer Library', description: 'Explore educational resources' },
  { id: 'dictionary', icon: 'Aa', label: 'Medical Dictionary', description: 'Understand medical terminology' },
  { id: 'diary', icon: '♡', label: 'Wellbeing Diary', description: 'Keep personal daily notes' },
  { id: 'questions', icon: '?', label: 'Doctor Questions', description: 'Prepare for your appointments' },
  { id: 'reports', icon: '▧', label: 'Report Explainer', description: 'Learn about medical report terms' },
];

export default function App() {
  const [screen, setScreen] = useState('home');
  const Screen = screens[screen];

  if (Screen) {
    return (
      <View style={styles.full}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity
          style={styles.back}
          onPress={() => setScreen('home')}
        >
          <Text style={styles.backText}>←  Back to home</Text>
        </TouchableOpacity>
        <Screen />
      </View>
    );
  }

  return (
    <View style={styles.full}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>✚</Text>
          </View>
          <Text style={styles.brand}>CancerCare</Text>
          <View style={styles.topTag}>
            <Text style={styles.topTagText}>COMPANION</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>YOUR PERSONAL SUPPORT SPACE</Text>
          <Text style={styles.title}>Care, knowledge & support.</Text>
          <Text style={styles.subtitle}>
            Explore helpful tools and educational resources
            to support conversations with your healthcare team.
          </Text>
          <View style={styles.heroDecoration}>
            <Text style={styles.heroIcon}>✦</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Explore your tools</Text>
            <Text style={styles.sectionSubtitle}>
              Everything in one place
            </Text>
          </View>
          <Text style={styles.count}>07 FEATURES</Text>
        </View>

        <View style={styles.grid}>
          {menu.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                index === 0 ? styles.featuredCard : null,
              ]}
              activeOpacity={0.8}
              onPress={() => setScreen(item.id)}
            >
              <View style={styles.cardTop}>
                <View style={[
                  styles.iconBox,
                  index === 0 ? styles.featuredIcon : null,
                ]}>
                  <Text style={[
                    styles.cardIcon,
                    index === 0 ? styles.featuredCardIcon : null,
                  ]}>
                    {item.icon}
                  </Text>
                </View>
                <Text style={styles.arrow}>↗</Text>
              </View>

              <Text style={styles.cardTitle}>{item.label}</Text>
              <Text style={styles.cardDescription}>
                {item.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeIcon}>ⓘ</Text>
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>A helpful reminder</Text>
            <Text style={styles.noticeText}>
              This app provides educational information and organizational
              tools. It does not replace professional medical advice,
              diagnosis or treatment.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>CANCERCARE COMPANION  •  VERSION 1.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#F5F7F3',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 35,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#315F52',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '700',
  },
  brand: {
    color: '#244B43',
    fontSize: 19,
    fontWeight: '800',
    marginLeft: 10,
  },
  topTag: {
    backgroundColor: '#E4EDE6',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
    marginLeft: 9,
  },
  topTagText: {
    color: '#527366',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  hero: {
    backgroundColor: '#244B43',
    padding: 26,
    borderRadius: 23,
    marginBottom: 32,
    overflow: 'hidden',
  },
  eyebrow: {
    color: '#B9D5C6',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '800',
    lineHeight: 38,
    maxWidth: 360,
  },
  subtitle: {
    color: '#D4E2D9',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
    maxWidth: 420,
  },
  heroDecoration: {
    position: 'absolute',
    right: 18,
    top: 12,
    opacity: 0.13,
  },
  heroIcon: {
    color: '#FFFFFF',
    fontSize: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#244B43',
  },
  sectionSubtitle: {
    color: '#849189',
    fontSize: 13,
    marginTop: 4,
  },
  count: {
    color: '#718078',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 13,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 17,
    width: '48%',
    flexGrow: 1,
    flexBasis: 145,
    minHeight: 155,
    borderWidth: 1,
    borderColor: '#E9EEE9',
  },
  featuredCard: {
    backgroundColor: '#E7F0E9',
    borderColor: '#D5E4D8',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },
  iconBox: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: '#EFF4EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredIcon: {
    backgroundColor: '#315F52',
  },
  cardIcon: {
    color: '#315F52',
    fontSize: 21,
    fontWeight: '700',
  },
  featuredCardIcon: {
    color: '#FFFFFF',
  },
  arrow: {
    color: '#91A098',
    fontSize: 18,
  },
  cardTitle: {
    color: '#244B43',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 7,
  },
  cardDescription: {
    color: '#829087',
    fontSize: 12,
    lineHeight: 18,
  },
  notice: {
    flexDirection: 'row',
    backgroundColor: '#EDF2ED',
    padding: 17,
    borderRadius: 15,
    marginTop: 27,
  },
  noticeIcon: {
    color: '#527366',
    fontSize: 20,
    marginRight: 12,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    color: '#315F52',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 5,
  },
  noticeText: {
    color: '#718078',
    fontSize: 12,
    lineHeight: 19,
  },
  footer: {
    color: '#A0AAA3',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 28,
  },
  back: {
    padding: 16,
    backgroundColor: '#F5F7F3',
  },
  backText: {
    color: '#315F52',
    fontSize: 15,
    fontWeight: '700',
  },
});
