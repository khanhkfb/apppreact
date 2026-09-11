import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NOTES = [
  { id: '1', title: 'Mua sắm cuối tuần', content: 'Sữa, bánh mì, trứng, rau củ...', time: '10:30' },
  { id: '2', title: 'Ý tưởng dự án', content: 'Xây dựng app ghi chú với React Native', time: 'Hôm qua' },
  { id: '3', title: 'Lịch họp', content: 'Họp nhóm lúc 9h sáng thứ 2', time: 'Hôm qua' },
  { id: '4', title: 'Học React Native', content: 'Ôn lại FlatList, SectionList, StyleSheet', time: '28/8' },
  { id: '5', title: 'Ghi nhớ', content: 'Uống đủ nước, tập thể dục mỗi ngày', time: '27/8' },
];

export default function HomeScreen() {
  const [notes] = useState(NOTES);

  return (
    <SafeAreaView style={s.safe}>

      {/* Header */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          <Image source={require('@/assets/images/icon.png')} style={s.logo} resizeMode="contain" />
          <View>
            <Text style={s.appName}>NoteApp</Text>
            <Text style={s.headerSub}>{notes.length} ghi chú</Text>
          </View>
        </View>
        <Pressable style={s.addBtn}>
          <Text style={s.addBtnText}>+ Thêm</Text>
        </Pressable>
      </View>

      {/* Danh sách ghi chú */}
      <FlatList
        data={notes}
        keyExtractor={i => i.id}
        contentContainerStyle={s.list}
        renderItem={({ item }) => (
          <Pressable style={s.card}>
            <View style={s.cardTop}>
              <Text style={s.cardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={s.cardTime}>{item.time}</Text>
            </View>
            <Text style={s.cardContent} numberOfLines={2}>{item.content}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0F4FF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#D0D9F0' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 40, height: 40, borderRadius: 10 },
  appName: { fontSize: 17, fontWeight: 'bold', color: '#007AFF' },
  headerSub: { fontSize: 12, color: '#888', marginTop: 2 },
  addBtn: { backgroundColor: '#007AFF', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  list: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 14, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1a1a1a', flex: 1, marginRight: 8 },
  cardTime: { fontSize: 12, color: '#888' },
  cardContent: { fontSize: 13, color: '#666', lineHeight: 18 },
});
