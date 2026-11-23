
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type Message = {
  role: 'user' | 'assistant';
  text: string;
};

const API_URL = 'http://127.0.0.1:8000/chat';

export default function AICompanion() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function sendMessage(text?: string) {
    const question = (text ?? input).trim();

    if (!question || loading) return;

    setMessages(previous => [
      ...previous,
      { role: 'user', text: question },
    ]);

    setInput('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || `Server error: ${response.status}`);
      }

      if (!data.reply) {
        throw new Error('The backend returned an empty reply.');
      }

      setMessages(previous => [
        ...previous,
        { role: 'assistant', text: data.reply },
      ]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unknown connection error';

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Your AI Companion</Text>
        <Text style={styles.subtitle}>
          Educational support for your cancer care journey
        </Text>
      </View>

      <ScrollView
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
        keyboardShouldPersistTaps="handled"
      >
        {messages.length === 0 && (
          <View style={styles.welcome}>
            <Text style={styles.welcomeTitle}>Hello, I'm here to help.</Text>
            <Text style={styles.welcomeText}>
              Ask general questions about cancer, treatment, wellbeing, and
              preparing for your next doctor's appointment.
            </Text>

            <Text style={styles.sectionTitle}>Suggested questions</Text>

            {[
              'Can you explain common cancer terms?',
              'What questions should I ask my doctor?',
              'How can I prepare for an appointment?',
            ].map(question => (
              <TouchableOpacity
                key={question}
                style={styles.suggestion}
                onPress={() => sendMessage(question)}
              >
                <Text style={styles.suggestionText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.role === 'user' ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <Text style={styles.messageLabel}>
              {message.role === 'user' ? 'You' : 'AI Companion'}
            </Text>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator color="#47796B" />
            <Text style={styles.loadingText}>Preparing your response...</Text>
          </View>
        )}

        {!!error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>Unable to get a response</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              onPress={() => sendMessage(
                messages.filter(m => m.role === 'user').slice(-1)[0]?.text
              )}
            >
              <Text style={styles.retry}>Try again</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.disclaimer}>
          This assistant provides general educational information only. It
          does not diagnose cancer or recommend treatment. Always consult
          your oncology team.
        </Text>
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask a question..."
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => sendMessage()}
          disabled={loading || !input.trim()}
        >
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F1' },
  header: { padding: 22, backgroundColor: '#E8F0E9' },
  title: { fontSize: 25, fontWeight: '700', color: '#24483D' },
  subtitle: { marginTop: 6, color: '#61766B', fontSize: 14 },
  chat: { flex: 1 },
  chatContent: { padding: 18, paddingBottom: 28 },
  welcome: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },
  welcomeTitle: { fontSize: 21, fontWeight: '700', color: '#24483D' },
  welcomeText: { marginTop: 10, color: '#64746B', lineHeight: 22 },
  sectionTitle: {
    marginTop: 22,
    marginBottom: 12,
    fontWeight: '700',
    color: '#24483D',
  },
  suggestion: {
    padding: 13,
    borderRadius: 12,
    backgroundColor: '#EEF4EE',
    marginBottom: 9,
  },
  suggestionText: { color: '#315D4D' },
  message: {
    maxWidth: '88%',
    padding: 14,
    borderRadius: 15,
    marginBottom: 12,
  },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#DDEBE0' },
  aiMessage: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF' },
  messageLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#47796B',
    marginBottom: 6,
  },
  messageText: { color: '#33443B', lineHeight: 22 },
  loading: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  loadingText: { color: '#61766B' },
  errorBox: {
    backgroundColor: '#FCEDEC',
    padding: 14,
    borderRadius: 12,
    marginVertical: 10,
  },
  errorTitle: { fontWeight: '700', color: '#8B3535' },
  errorText: { color: '#8B3535', marginTop: 5 },
  retry: { color: '#47796B', fontWeight: '700', marginTop: 10 },
  disclaimer: {
    fontSize: 11,
    lineHeight: 17,
    color: '#879087',
    marginTop: 20,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    gap: 9,
  },
  input: {
    flex: 1,
    minHeight: 45,
    maxHeight: 100,
    backgroundColor: '#F2F4EF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sendButton: {
    backgroundColor: '#47796B',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 12,
  },
  sendText: { color: '#FFFFFF', fontWeight: '700' },
});
