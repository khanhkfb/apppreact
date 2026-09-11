import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [ghiNho, setGhiNho] = useState(false);
  const [errors, setErrors] = useState({ email: '', matKhau: '' });

  const handleLogin = () => {
    const newErrors = { email: '', matKhau: '' };
    
    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!email.includes('@')) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!matKhau.trim()) {
      newErrors.matKhau = 'Vui lòng nhập mật khẩu';
    }
    
    setErrors(newErrors);
    
    if (!newErrors.email && !newErrors.matKhau) {
      // Đăng nhập thành công
      console.log('Login success');
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView style={s.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        {/* Back button */}
        <Pressable style={s.backBtn} onPress={() => router.push('/welcome')}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </Pressable>

        {/* Header */}
        <Text style={s.title}>Đăng nhập</Text>
        <Text style={s.subtitle}>Chào mừng trở lại! Vui lòng đăng nhập{'\n'}để tiếp tục.</Text>

        {/* Email */}
        <View style={[s.inputWrap, errors.email && s.inputError]}>
          <MaterialCommunityIcons name="email-outline" size={20} color="#888" />
          <TextInput 
            style={s.input} 
            placeholder="Email hoặc số điện thoại" 
            value={email} 
            onChangeText={(text) => { setEmail(text); setErrors(e => ({ ...e, email: '' })); }} 
            onBlur={() => { 
              if (!email.trim()) {
                setErrors(e => ({ ...e, email: 'Vui lòng nhập email' }));
              } else if (!email.includes('@')) {
                setErrors(e => ({ ...e, email: 'Email không hợp lệ' }));
              }
            }}
            keyboardType="email-address" 
            autoCapitalize="none" 
          />
        </View>
        {errors.email ? <Text style={s.errorText}>{errors.email}</Text> : null}

        {/* Mật khẩu */}
        <View style={[s.inputWrap, errors.matKhau && s.inputError]}>
          <MaterialCommunityIcons name="lock-outline" size={20} color="#888" />
          <TextInput 
            style={s.input} 
            placeholder="Mật khẩu" 
            value={matKhau} 
            onChangeText={(text) => { setMatKhau(text); setErrors(e => ({ ...e, matKhau: '' })); }} 
            onBlur={() => { if (!matKhau.trim()) setErrors(e => ({ ...e, matKhau: 'Vui lòng nhập mật khẩu' })); }}
            secureTextEntry={!showPass} 
          />
          <Pressable onPress={() => setShowPass(!showPass)}>
            <MaterialCommunityIcons name={showPass ? 'eye-outline' : 'eye-off-outline'} size={20} color="#888" />
          </Pressable>
        </View>
        {errors.matKhau ? <Text style={s.errorText}>{errors.matKhau}</Text> : null}

        {/* Remember & Forgot */}
        <View style={s.row}>
          <Pressable style={s.checkRow} onPress={() => setGhiNho(!ghiNho)}>
            <View style={[s.checkbox, ghiNho && s.checkboxActive]}>
              {ghiNho ? <MaterialCommunityIcons name="check" size={14} color="#fff" /> : null}
            </View>
            <Text style={s.checkText}>Ghi nhớ đăng nhập</Text>
          </Pressable>
          <Pressable>
            <Text style={s.link}>Quên mật khẩu?</Text>
          </Pressable>
        </View>

        {/* Button */}
        <Pressable style={s.btn} onPress={handleLogin}>
          <Text style={s.btnText}>Đăng nhập</Text>
        </Pressable>

        {/* Divider */}
        <Text style={s.divider}>Hoặc</Text>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>Chưa có tài khoản? </Text>
          <Pressable onPress={() => router.push('/register')}>
            <Text style={s.link}>Đăng ký</Text>
          </Pressable>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  backBtn: { width: 36, height: 36, justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 },
  subtitle: { fontSize: 13, color: '#888', lineHeight: 19, marginBottom: 28 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 10, paddingHorizontal: 14, height: 50, marginBottom: 6, gap: 10 },
  inputError: { borderWidth: 1, borderColor: '#FF5252' },
  input: { flex: 1, fontSize: 14, color: '#333' },
  errorText: { color: '#FF5252', fontSize: 12, marginBottom: 8, marginLeft: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: 24 },
  checkRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 18, height: 18, borderWidth: 2, borderColor: '#ccc', borderRadius: 4, marginRight: 8, justifyContent: 'center', alignItems: 'center' },
  checkboxActive: { backgroundColor: '#2196F3', borderColor: '#2196F3' },
  checkText: { fontSize: 13, color: '#333' },
  link: { fontSize: 13, color: '#2196F3', fontWeight: '600' },
  btn: { backgroundColor: '#2196F3', borderRadius: 10, height: 48, justifyContent: 'center', alignItems: 'center', marginBottom: 18 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  divider: { textAlign: 'center', fontSize: 13, color: '#888', marginBottom: 18 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 13, color: '#666' },
});
