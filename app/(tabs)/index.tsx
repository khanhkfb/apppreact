import React, { useState } from 'react';
import { FlatList, Image, Pressable, SectionList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FEATURED = [
  { id: '1', title: 'React Native', image: require('@/assets/images/react-logo.png'), tag: 'Hot' },
  { id: '2', title: 'TypeScript', image: require('@/assets/images/partial-react-logo.png'), tag: 'Mới' },
  { id: '3', title: 'UI/UX Design', image: require('@/assets/images/icon.png'), tag: '' },
];

const SECTIONS = [
  {
    title: 'Tin tức', data: [
      { id: 'a', title: 'React Native ', time: '1 giờ trước' },
      { id: 'b', title: 'Expo SDK 54 hỗ trợ React 19', time: '3 giờ trước' },
    ],
  },
  {
    title: 'Nổi bật', data: [
      { id: 'c', title: 'Tối ưu hiệu năng React Native', time: '1 ngày trước' },
      { id: 'd', title: 'Flexbox từ A đến Z', time: '2 ngày trước' },
    ],
  },
];

export default function HomeScreen() {
  const [liked, setLiked] = useState(false);

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.headerTitle}>Trang chủ</Text>
        <Pressable onPress={() => setLiked(l => !l)}>
          <Text style={{ fontSize: 22 }}>{liked ? '❤️' : '🤍'}</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <Image source={require('@/assets/images/splash-icon.png')} style={s.banner} resizeMode="cover" />

        {/* Thông tin chính */}
        <View style={s.infoBox}>
          <Text style={s.infoTitle}>Chào mừng bạn 👋</Text>
          <Text style={s.infoDesc}>Khám phá các khóa học và bài viết mới nhất.</Text>
          <Pressable style={s.btn}><Text style={s.btnText}>Khám phá ngay</Text></Pressable>
        </View>

        {/* FlatList ngang */}
        <Text style={s.groupTitle}>Nổi bật</Text>
        <FlatList
          data={FEATURED}
          keyExtractor={i => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12, marginBottom: 20 }}
          renderItem={({ item }) => (
            <Pressable style={s.card}>
              <Image source={item.image} style={s.cardImg} resizeMode="cover" />
              {item.tag ? <View style={s.tag}><Text style={s.tagText}>{item.tag}</Text></View> : null}
              <Text style={s.cardTitle}>{item.title}</Text>
            </Pressable>
          )}
        />

        {/* SectionList */}
        <Text style={s.groupTitle}>Bài viết</Text>
        <SectionList
          sections={SECTIONS}
          keyExtractor={i => i.id}
          scrollEnabled={false}
          renderSectionHeader={({ section }) => (
            <View style={s.secHeader}><Text style={s.secHeaderText}>{section.title}</Text></View>
          )}
          renderItem={({ item }) => (
            <Pressable style={s.newsItem}>
              <View style={{ flex: 1 }}>
                <Text style={s.newsTitle}>{item.title}</Text>
                <Text style={s.newsTime}>{item.time}</Text>
              </View>
              <Text style={{ fontSize: 20, color: '#ccc' }}>›</Text>
            </Pressable>
          )}
        />
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f6fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a' },
  banner: { width: '100%', height: 180 },
  infoBox: { backgroundColor: '#fff', margin: 16, borderRadius: 12, padding: 16, elevation: 2 },
  infoTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  infoDesc: { fontSize: 14, color: '#666', marginBottom: 14 },
  btn: { backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 15, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  groupTitle: { fontSize: 16, fontWeight: '700', marginLeft: 16, marginBottom: 10 },
  card: { width: 150, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', elevation: 2 },
  cardImg: { width: '100%', height: 90 },
  cardTitle: { fontSize: 13, color: '#333', padding: 8 },
  tag: { position: 'absolute', top: 6, left: 6, backgroundColor: '#FF3B30', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  tagText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  secHeader: { backgroundColor: '#f0f4ff', paddingHorizontal: 16, paddingVertical: 8 },
  secHeaderText: { fontSize: 13, fontWeight: '700', color: '#007AFF' },
  newsItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  newsTitle: { fontSize: 14, color: '#1a1a1a', marginBottom: 4 },
  newsTime: { fontSize: 12, color: 'hsl(318, 66%, 50%)' },
});
