
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';

const terms = [
  { term: 'Biopsy', meaning: 'A procedure in which a small tissue sample is taken for examination.' },
  { term: 'Benign', meaning: 'Not cancerous. A benign growth does not invade nearby tissue.' },
  { term: 'Malignant', meaning: 'Cancerous. Malignant cells can invade nearby tissue.' },
  { term: 'Metastasis', meaning: 'The spread of cancer from its original location to another part of the body.' },
  { term: 'Chemotherapy', meaning: 'Treatment that uses medicines to destroy or slow the growth of cancer cells.' },
  { term: 'Immunotherapy', meaning: 'Treatment that helps the immune system recognize and fight cancer.' },
  { term: 'Radiotherapy', meaning: 'Treatment that uses radiation to damage cancer cells.' },
  { term: 'Remission', meaning: 'A decrease or disappearance of signs and symptoms of cancer.' },
  { term: 'Oncologist', meaning: 'A doctor who specializes in cancer care.' },
  { term: 'Pathology', meaning: 'The examination of tissue or cells to help identify disease.' },
];

export default function MedicalDictionary() {
  const [search, setSearch] = useState('');

  const filtered = terms.filter((item) =>
    item.term.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Medical Dictionary</Text>
      <Text style={styles.subtitle}>Understand common cancer-related terms.</Text>

      <TextInput
        style={styles.search}
        placeholder="Search a medical term..."
        value={search}
        onChangeText={setSearch}
      />

      {filtered.map((item) => (
        <View style={styles.card} key={item.term}>
          <Text style={styles.term}>{item.term}</Text>
          <Text style={styles.meaning}>{item.meaning}</Text>
        </View>
      ))}

      {filtered.length === 0 && (
        <Text style={styles.empty}>No matching terms found.</Text>
      )}

      <Text style={styles.disclaimer}>
        Definitions are simplified for education. Ask your healthcare team
        about what a term means in your individual situation.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8F3', padding: 22 },
  title: { fontSize: 27, fontWeight: '700', color: '#244B43', marginTop: 25 },
  subtitle: { color: '#718078', marginTop: 9, marginBottom: 20 },
  search: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 18,
  },
  card: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 14, marginBottom: 12 },
  term: { color: '#244B43', fontSize: 17, fontWeight: '700', marginBottom: 7 },
  meaning: { color: '#718078', fontSize: 14, lineHeight: 21 },
  empty: { color: '#718078', marginTop: 15 },
  disclaimer: { color: '#718078', fontSize: 12, lineHeight: 19, marginTop: 15, marginBottom: 35 },
});
