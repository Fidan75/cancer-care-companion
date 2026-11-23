
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

export default function WellbeingDiary() {
  const [date, setDate] = useState('');
  const [mood, setMood] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const [entries, setEntries] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const saved = await AsyncStorage.getItem('wellbeingEntries');
        if (saved) setEntries(JSON.parse(saved));
      } catch {
        Alert.alert('Error', 'Could not load diary entries.');
      } finally {
        setLoaded(true);
      }
    };

    loadEntries();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(
      'wellbeingEntries',
      JSON.stringify(entries)
    ).catch(() => {
      Alert.alert('Error', 'Could not save diary entries.');
    });
  }, [entries, loaded]);

  const saveEntry = () => {
    if (!date.trim()) {
      Alert.alert('Date required', 'Please enter a date.');
      return;
    }

    setEntries((current) => [
      ...current,
      {
        id: Date.now(),
        date: date.trim(),
        mood: mood.trim(),
        symptoms: symptoms.trim(),
        notes: notes.trim(),
      },
    ]);

    setDate('');
    setMood('');
    setSymptoms('');
    setNotes('');
  };

  const deleteEntry = (id: number) => {
    setEntries((current) =>
      current.filter((entry) => entry.id !== id)
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Symptom & Wellbeing Diary</Text>
      <Text style={styles.subtitle}>
        Record information to discuss with your healthcare team.
      </Text>

      <View style={styles.card}>
        <Text style={styles.heading}>New daily entry</Text>

        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>How are you feeling?</Text>
        <TextInput
          style={styles.input}
          placeholder="Your mood today"
          value={mood}
          onChangeText={setMood}
        />

        <Text style={styles.label}>Symptoms or changes</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Describe what you noticed"
          value={symptoms}
          onChangeText={setSymptoms}
          multiline
        />

        <Text style={styles.label}>Additional notes</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Anything you want to remember?"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={saveEntry}>
          <Text style={styles.buttonText}>Save entry</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Previous entries</Text>

      {entries.length === 0 ? (
        <Text style={styles.empty}>Your entries will appear here.</Text>
      ) : (
        entries.map((entry) => (
          <View style={styles.card} key={entry.id}>
            <Text style={styles.entryTitle}>{entry.date}</Text>
            <Text style={styles.detail}>Mood: {entry.mood || 'Not entered'}</Text>
            <Text style={styles.detail}>Symptoms: {entry.symptoms || 'Not entered'}</Text>
            <Text style={styles.detail}>Notes: {entry.notes || 'None'}</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteEntry(entry.id)}
            >
              <Text style={styles.deleteText}>Delete entry</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <Text style={styles.disclaimer}>
        This diary is for personal tracking and discussion with your care team.
        It does not diagnose or monitor medical emergencies. Seek urgent
        medical help for severe or sudden symptoms.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8F3', padding: 22 },
  title: { fontSize: 26, fontWeight: '700', color: '#244B43', marginTop: 25 },
  subtitle: { color: '#718078', marginTop: 9, marginBottom: 22, lineHeight: 21 },
  card: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 16, marginBottom: 18 },
  heading: { fontSize: 19, fontWeight: '700', color: '#244B43', marginBottom: 14 },
  label: { color: '#244B43', fontWeight: '600', marginBottom: 8 },
  input: { backgroundColor: '#F4F6F1', padding: 14, borderRadius: 10, marginBottom: 14 },
  multiline: { minHeight: 85, textAlignVertical: 'top' },
  button: { backgroundColor: '#315F52', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
  empty: { color: '#718078' },
  entryTitle: { color: '#244B43', fontWeight: '700', fontSize: 17 },
  detail: { color: '#718078', marginTop: 8, lineHeight: 20 },
  deleteButton: { marginTop: 14, alignSelf: 'flex-start' },
  deleteText: { color: '#B44B4B', fontWeight: '600' },
  disclaimer: { color: '#718078', fontSize: 12, lineHeight: 19, marginBottom: 35 },
});
