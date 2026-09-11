import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();
  const [hoTen, setHoTen] = useState('');
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [xacNhan, setXacNhan] = useState('');
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [errors, setErrors] = useState({ hoTen: '', email: '', matKhau: '', xacNhan: '' });

  const handleRegister = () => {
    const newErrors = { hoTen: '', email: '', matKhau: '', xacNhan: '' };
    
    if (!hoTen.trim()) {
      newErrors.hoTen = 'Vui lòng nhập họ và tên';
    }
    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!email.includes('@')) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!matKhau.trim()) {
      newErrors.matKhau = 'Vui lòng nhập mật khẩu';
    }
    if (matKhau && xacNhan !== matKhau) {
      newErrors.xacNhan = 'Mật khẩu không khớp';
    }
    
    setErrors(newErrors);
    
    if (!newErrors.hoTen && !newErrors.email && !newErrors.matKhau && !newErrors.xacNhan) {
      console.log('Register success');
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>

          {/* Back button */}
          <Pressable style={s.backBtn} onPress={() => router.push('/login')}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
          </Pressable>

          {/* Header */}
          <Text style={s.title}>Đăng ký</Text>
          <Text style={s.subtitle}>Tạo tài khoản để lưu trữ ghi chú{'\n'}của bạn mọi lúc, mọi nơi</Text>

          {/* Họ và tên */}
          <View style={[s.inputWrap, errors.hoTen && s.inputError]}>
            <MaterialCommunityIcons name="account-outline" size={20} color="#888" />
            <TextInput 
              style={s.input} 
              placeholder="Họ và tên" 
              value={hoTen} 
              onChangeText={(text) => { setHoTen(text); setErrors(e => ({ ...e, hoTen: '' })); }} 
              onBlur={() => { if (!hoTen.trim()) setErrors(e => ({ ...e, hoTen: 'Vui lòng nhập họ và tên' })); }}
            />
          </View>
          {errors.hoTen ? <Text style={s.errorText}>{errors.hoTen}</Text> : null}

          {/* Email */}
          <View style={[s.inputWrap, errors.email && s.inputError]}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#888" />
            <TextInput 
              style={s.input} 
              placeholder="Email" 
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
              secureTextEntry={!showPass1} 
            />
            <Pressable onPress={() => setShowPass1(!showPass1)}>
              <MaterialCommunityIcons name={showPass1 ? 'eye-outline' : 'eye-off-outline'} size={20} color="#888" />
            </Pressable>
          </View>
          {errors.matKhau ? <Text style={s.errorText}>{errors.matKhau}</Text> : null}

          {/* Xác nhận mật khẩu */}
          <View style={[s.inputWrap, errors.xacNhan && s.inputError]}>
            <MaterialCommunityIcons name="lock-outline" size={20} color="#888" />
            <TextInput 
              style={s.input} 
              placeholder="Xác nhận mật khẩu" 
              value={xacNhan} 
              onChangeText={(text) => { setXacNhan(text); setErrors(e => ({ ...e, xacNhan: '' })); }} 
              onBlur={() => { if (matKhau && xacNhan !== matKhau) setErrors(e => ({ ...e, xacNhan: 'Mật khẩu không khớp' })); }}
              secureTextEntry={!showPass2} 
            />
            <Pressable onPress={() => setShowPass2(!showPass2)}>
              <MaterialCommunityIcons name={showPass2 ? 'eye-outline' : 'eye-off-outline'} size={20} color="#888" />
            </Pressable>
          </View>
          {errors.xacNhan ? <Text style={s.errorText}>{errors.xacNhan}</Text> : null}

          {/* Button */}
          <Pressable style={s.btn} onPress={handleRegister}>
            <Text style={s.btnText}>Đăng ký</Text>
          </Pressable>

          {/* Divider */}
          <Text style={s.divider}>Hoặc</Text>

          {/* Footer */}
          <View style={s.footer}>
            <Text style={s.footerText}>Đã có tài khoản? </Text>
            <Pressable onPress={() => router.push('/login')}>
              <Text style={s.link}>Đăng nhập</Text>
            </Pressable>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 32 },
  backBtn: { width: 36, height: 36, justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 },
  subtitle: { fontSize: 13, color: '#888', lineHeight: 19, marginBottom: 28 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 10, paddingHorizontal: 14, height: 50, marginBottom: 6, gap: 10 },
  inputError: { borderWidth: 1, borderColor: '#FF5252' },
  input: { flex: 1, fontSize: 14, color: '#333' },
  errorText: { color: '#FF5252', fontSize: 12, marginBottom: 8, marginLeft: 4 },
  btn: { backgroundColor: '#2196F3', borderRadius: 10, height: 48, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 18 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  divider: { textAlign: 'center', fontSize: 13, color: '#888', marginBottom: 18 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 13, color: '#666' },
  link: { fontSize: 13, color: '#2196F3', fontWeight: '600' },
});
