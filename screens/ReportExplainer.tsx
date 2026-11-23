
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function ReportExplainer() {
  const [report, setReport] = useState('');
  const [result, setResult] = useState('');

  const explain = () => {
    if (!report.trim()) return;
    setResult(
      'This feature is an educational aid and cannot interpret your personal medical results yet. Please ask your healthcare team to explain the report. You can use the text below to prepare questions for your appointment.'
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Medical Report Explainer</Text>
      <Text style={styles.subtitle}>
        Learn how to prepare questions about a medical report.
      </Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Report text</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter non-identifying report text..."
          value={report}
          onChangeText={setReport}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={explain}>
          <Text style={styles.buttonText}>Prepare explanation</Text>
        </TouchableOpacity>
      </View>

      {result ? (
        <View style={styles.card}>
          <Text style={styles.heading}>Educational guidance</Text>
          <Text style={styles.description}>{result}</Text>
          <Text style={styles.description}>
            Questions to ask: What does this finding mean? Is it confirmed?
            Are additional tests needed? How does it affect my care plan?
          </Text>
        </View>
      ) : null}

      <Text style={styles.disclaimer}>
        Do not enter names, birth dates, addresses, or other identifying
        information. This prototype does not provide medical diagnoses or
        interpret test results. Consult your healthcare professional.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8F3', padding: 22 },
  title: { fontSize: 27, fontWeight: '700', color: '#244B43', marginTop: 25 },
  subtitle: { color: '#718078', marginVertical: 18 },
  card: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 14, marginBottom: 16 },
  heading: { fontSize: 18, fontWeight: '700', color: '#244B43', marginBottom: 12 },
  input: { backgroundColor: '#F4F6F1', padding: 14, borderRadius: 10, minHeight: 130, textAlignVertical: 'top' },
  button: { backgroundColor: '#315F52', padding: 16, borderRadius: 12, marginTop: 14, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
  description: { color: '#52675E', lineHeight: 23, marginBottom: 12 },
  disclaimer: { color: '#718078', fontSize: 12, lineHeight: 19, marginVertical: 20 },
});
