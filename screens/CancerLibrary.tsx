
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

const topics = [
  {
    title: 'Understanding Cancer',
    description:
      'Learn what cancer is, how it develops, and how different types are classified.',
  },
  {
    title: 'Cancer Types',
    description:
      'Explore general information about breast, lung, prostate, blood, and other cancers.',
  },
  {
    title: 'Diagnosis and Tests',
    description:
      'Understand biopsies, imaging scans, pathology reports, and common medical terms.',
  },
  {
    title: 'Treatment Basics',
    description:
      'Learn about surgery, chemotherapy, radiation therapy, immunotherapy, and targeted therapy.',
  },
  {
    title: 'Living with Cancer',
    description:
      'Explore general information about emotional wellbeing, support, and daily life.',
  },
  {
    title: 'Supporting a Loved One',
    description:
      'Learn ways family members and caregivers can provide practical and emotional support.',
  },
];

export default function CancerLibrary() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cancer Information Library</Text>
      <Text style={styles.subtitle}>
        Explore reliable general educational information.
      </Text>

      {topics.map((topic, index) => (
        <View style={styles.card} key={index}>
          <Text style={styles.cardTitle}>{topic.title}</Text>
          <Text style={styles.description}>
            {topic.description}
          </Text>
        </View>
      ))}

      <Text style={styles.disclaimer}>
        Educational information only. This library does not provide
        diagnoses or treatment recommendations. Discuss personal
        medical questions with your oncology team.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F3',
    padding: 22,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#244B43',
    marginTop: 25,
  },
  subtitle: {
    color: '#718078',
    marginTop: 9,
    marginBottom: 25,
    fontSize: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 14,
  },
  cardTitle: {
    color: '#244B43',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 9,
  },
  description: {
    color: '#718078',
    fontSize: 14,
    lineHeight: 22,
  },
  disclaimer: {
    color: '#718078',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 12,
    marginBottom: 35,
  },
});
