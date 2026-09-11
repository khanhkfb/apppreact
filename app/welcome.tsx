import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>

        {/* Logo */}
        <View style={s.logoBox}>
          <MaterialCommunityIcons name="note-edit-outline" size={55} color="#fff" />
        </View>

        {/* Title */}
        <Text style={s.title}>Ghi chú cá nhân</Text>
        <Text style={s.subtitle}>Lưu giữ những điều quan trọng{'\n'}trong cuộc sống của bạn</Text>

        {/* Illustration */}
        <Image 
          source={require('../assets/images/icon-note.png')} 
          style={s.illustration} 
          resizeMode="contain" 
        />

        {/* Button */}
        <Pressable style={s.btn} onPress={() => router.push('/login')}>
          <Text style={s.btnText}>Bắt đầu</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 28, justifyContent: 'center', alignItems: 'center' },
  logoBox: { width: 90, height: 90, backgroundColor: '#2196F3', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 28 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 19, marginBottom: 40 },
  illustration: { width: '80%', height: 200, marginBottom: 40 },
  btn: { backgroundColor: '#2196F3', borderRadius: 10, height: 48, paddingHorizontal: 50, justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'row' },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
