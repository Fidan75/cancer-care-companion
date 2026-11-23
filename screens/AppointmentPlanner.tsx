
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppointmentPlanner() {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const saved = await AsyncStorage.getItem('appointments');
        if (saved) setAppointments(JSON.parse(saved));
      } catch {
        Alert.alert('Error', 'Could not load saved appointments.');
      } finally {
        setLoaded(true);
      }
    };

    loadAppointments();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(
      'appointments',
      JSON.stringify(appointments)
    ).catch(() => {
      Alert.alert('Error', 'Could not save appointments.');
    });
  }, [appointments, loaded]);

  const addAppointment = () => {
    if (!doctor.trim() || !date.trim()) {
      Alert.alert('Missing information', 'Enter a doctor or clinic and a date.');
      return;
    }

    setAppointments((current) => [
      ...current,
      {
        doctor: doctor.trim(),
        date: date.trim(),
        time: time.trim(),
        notes: notes.trim(),
        id: Date.now(),
      },
    ]);

    setDoctor('');
    setDate('');
    setTime('');
    setNotes('');
  };

  const deleteAppointment = (id: number) => {
    setAppointments((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Appointment Planner</Text>
      <Text style={styles.subtitle}>
        Keep your medical appointments organized.
      </Text>

      <View style={styles.card}>
        <Text style={styles.heading}>New appointment</Text>

        <TextInput
          style={styles.input}
          placeholder="Doctor or clinic"
          value={doctor}
          onChangeText={setDoctor}
        />

        <TextInput
          style={styles.input}
          placeholder="Date (e.g. 25 Nov 2026)"
          value={date}
          onChangeText={setDate}
        />

        <TextInput
          style={styles.input}
          placeholder="Time"
          value={time}
          onChangeText={setTime}
        />

        <TextInput
          style={[styles.input, styles.notes]}
          placeholder="Questions or notes for your doctor"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={addAppointment}>
          <Text style={styles.buttonText}>Save appointment</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Your appointments</Text>

      {appointments.length === 0 ? (
        <Text style={styles.empty}>
          Your saved appointments will appear here.
        </Text>
      ) : (
        appointments.map((item) => (
          <View style={styles.appointment} key={item.id}>
            <Text style={styles.doctor}>{item.doctor}</Text>
            <Text style={styles.detail}>{item.date} {item.time}</Text>
            {item.notes ? (
              <Text style={styles.detail}>{item.notes}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteAppointment(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
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
    fontSize: 28,
    fontWeight: '700',
    color: '#244B43',
    marginTop: 25,
  },
  subtitle: {
    color: '#718078',
    marginTop: 8,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    marginBottom: 28,
  },
  heading: {
    fontSize: 19,
    fontWeight: '700',
    color: '#244B43',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#F4F6F1',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 15,
  },
  notes: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#315F52',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  empty: {
    color: '#89948D',
    marginTop: 5,
  },
  appointment: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },
  doctor: {
    color: '#244B43',
    fontSize: 17,
    fontWeight: '700',
  },
  detail: {
    color: '#718078',
    marginTop: 8,
  },
  deleteButton: {
    marginTop: 14,
    alignSelf: 'flex-start',
  },
  deleteText: {
    color: '#B44B4B',
    fontWeight: '600',
  },
});
