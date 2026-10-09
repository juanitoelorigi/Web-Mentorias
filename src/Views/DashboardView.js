import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useDashboardViewModel from '../ViewModels/useDashboardViewModel';

export default function DashboardView({ user, onLogout }) {
  const { sessions, isLoading } = useDashboardViewModel();

  const renderSession = ({ item }) => (
    <BlurView intensity={60} tint="light" style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.topicTitle}>{item.topic}</Text>
        <MaterialIcons name="chevron-right" size={24} color="#111" />
      </View>
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <MaterialIcons name="person-outline" size={18} color="#495057" />
          <Text style={styles.detailText}>{item.mentor}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="calendar-today" size={16} color="#495057" style={{marginLeft: 1}} />
          <Text style={styles.detailText}>{item.date} • {item.time}</Text>
        </View>
      </View>
    </BlurView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola,</Text>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <MaterialIcons name="logout" size={22} color="#111" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Próximas Mentorías</Text>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#111" />
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={item => item.id.toString()}
          renderItem={renderSession}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 70, paddingBottom: 25, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E9ECEF' },
  greeting: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#6C757D' },
  userName: { fontFamily: 'Poppins_700Bold', fontSize: 24, color: '#111', letterSpacing: -0.5 },
  logoutButton: { backgroundColor: '#F8F9FA', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#E9ECEF' },
  sectionTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#212529', marginHorizontal: 25, marginTop: 30, marginBottom: 20 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: { paddingHorizontal: 25, paddingBottom: 40 },
  card: { backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 24, padding: 25, marginBottom: 16, borderWidth: 1, borderColor: '#E9ECEF', overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  topicTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 17, color: '#111', flex: 1 },
  cardDetails: { gap: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  detailText: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#495057' }
});