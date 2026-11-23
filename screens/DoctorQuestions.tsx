
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DoctorQuestions() {
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const saved = await AsyncStorage.getItem('doctorQuestions');
        if (saved) setQuestions(JSON.parse(saved));
      } catch {
        Alert.alert('Error', 'Could not load saved questions.');
      } finally {
        setLoaded(true);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(
      'doctorQuestions',
      JSON.stringify(questions)
    ).catch(() => {
      Alert.alert('Error', 'Could not save questions.');
    });
  }, [questions, loaded]);

  const addQuestion = () => {
    if (!question.trim()) return;

    setQuestions((current) => [...current, question.trim()]);
    setQuestion('');
  };

  const deleteQuestion = (index: number) => {
    setQuestions((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Questions for Your Doctor</Text>
      <Text style={styles.subtitle}>
        Prepare questions for your next appointment.
      </Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Suggested questions</Text>
        {[
          'Can you explain my diagnosis?',
          'What do my test results mean?',
          'What should I expect at my next appointment?',
          'Who should I contact if I have concerns?',
        ].map((item) => (
          <Text key={item} style={styles.suggestion}>• {item}</Text>
        ))}
      </View>

      <Text style={styles.heading}>Add your own question</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a question..."
        value={question}
        onChangeText={setQuestion}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={addQuestion}>
        <Text style={styles.buttonText}>Add question</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>My questions</Text>

      {questions.length === 0 ? (
        <Text style={styles.empty}>Your questions will appear here.</Text>
      ) : (
        questions.map((item, index) => (
          <View style={styles.card} key={`${index}-${item}`}>
            <Text style={styles.suggestion}>
              {index + 1}. {item}
            </Text>
            <TouchableOpacity
              onPress={() => deleteQuestion(index)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <Text style={styles.disclaimer}>
        These questions are for appointment preparation and do not replace
        advice from your healthcare team.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8F3', padding: 22 },
  title: { fontSize: 27, fontWeight: '700', color: '#244B43', marginTop: 25 },
  subtitle: { color: '#718078', marginVertical: 18 },
  heading: { fontSize: 18, fontWeight: '700', color: '#244B43', marginVertical: 12 },
  card: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 14, marginBottom: 14 },
  suggestion: { color: '#52675E', lineHeight: 24, marginBottom: 7 },
  input: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, minHeight: 90, textAlignVertical: 'top' },
  button: { backgroundColor: '#315F52', padding: 16, borderRadius: 12, marginVertical: 14, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
  empty: { color: '#718078' },
  deleteButton: { marginTop: 8, alignSelf: 'flex-start' },
  deleteText: { color: '#B44B4B', fontWeight: '600' },
  disclaimer: { color: '#718078', fontSize: 12, lineHeight: 19, marginVertical: 20 },
});
