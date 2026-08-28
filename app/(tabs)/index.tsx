import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StudentForm() {
  const [hoTen, setHoTen] = useState('');
  const [maSV, setMaSV] = useState('');
  const [email, setEmail] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const blur = (field: string) => setTouched(p => ({ ...p, [field]: true }));

  const hoTenErr = touched.hoTen && !hoTen.trim() ? 'Họ tên không được để trống' : '';
  const emailErr = touched.email && !email.trim() ? 'Email không được để trống' : '';

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>Thông tin sinh viên</Text>

        <Text style={styles.label}>Họ và tên</Text>
        <TextInput style={[styles.input, hoTenErr && styles.inputErr]} placeholder="Nhập họ và tên" value={hoTen} onChangeText={setHoTen} onBlur={() => blur('hoTen')} autoCapitalize="words" />
        {hoTenErr ? <Text style={styles.errText}>⚠ {hoTenErr}</Text> : null}

        <Text style={styles.label}>Mã sinh viên</Text>
        <TextInput style={styles.input} placeholder="Nhập mã sinh viên" value={maSV} onChangeText={setMaSV} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={[styles.input, emailErr && styles.inputErr]} placeholder="Nhập email" value={email} onChangeText={setEmail} onBlur={() => blur('email')} keyboardType="email-address" autoCapitalize="none" />
        {emailErr ? <Text style={styles.errText}>⚠ {emailErr}</Text> : null}

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput style={styles.input} placeholder="Nhập số điện thoại" value={soDienThoai} onChangeText={setSoDienThoai} keyboardType="numeric" />

        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput style={styles.input} placeholder="Nhập mật khẩu" value={matKhau} onChangeText={setMatKhau} secureTextEntry />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, color: '#1a1a1a' },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: { height: 48, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 14, marginBottom: 4, backgroundColor: '#f5f5f5', fontSize: 15 },
  inputErr: { borderColor: '#e53935' },
  errText: { color: '#e53935', fontSize: 13, marginBottom: 12 },
});
