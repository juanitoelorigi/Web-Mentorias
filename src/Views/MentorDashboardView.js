import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MentorDashboardView({ user, dashboardViewModel, onNavigateLogin, onNavigateVideoCall }) {
  const [activeTab, setActiveTab] = useState('perfil');
  const [newSubject, setNewSubject] = useState('');
  const { subjects, addSubject, sessions } = dashboardViewModel;

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      addSubject({ name: newSubject, level: 'Todos los niveles' });
      setNewSubject('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Panel de Mentor</Text>
            <Text style={styles.userName}>Hola, {user?.name}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={onNavigateLogin}>
            <MaterialIcons name="logout" size={20} color="#82665A" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tabButton, activeTab === 'sesiones' && styles.tabButtonActive]} onPress={() => setActiveTab('sesiones')}>
            <Text style={[styles.tabText, activeTab === 'sesiones' && styles.tabTextActive]}>Mis Asesorías</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabButton, activeTab === 'perfil' && styles.tabButtonActive]} onPress={() => setActiveTab('perfil')}>
            <Text style={[styles.tabText, activeTab === 'perfil' && styles.tabTextActive]}>Mi Perfil y Materias</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'sesiones' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Próximas Sesiones</Text>
            <View style={styles.gridContainer}>
              {sessions.length > 0 ? sessions.map(session => (
                <View key={session.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTopic}>{session.topic}</Text>
                    <MaterialIcons name="event" size={24} color="#82665A" />
                  </View>
                  <View style={styles.cardDetails}>
                    <View style={styles.detailRow}><MaterialIcons name="calendar-today" size={16} color="#82665A" /><Text style={styles.detailText}>{session.date} • {session.time}</Text></View>
                  </View>
                  <TouchableOpacity style={styles.actionButton} onPress={onNavigateVideoCall}>
                    <MaterialIcons name="videocam" size={18} color="#EFEFE5" style={{ marginRight: 8 }} />
                    <Text style={styles.actionButtonText}>Iniciar Videollamada</Text>
                  </TouchableOpacity>
                </View>
              )) : (
                <View style={styles.emptyStateContainer}>
                  <Text style={styles.emptyStateText}>Aún no tienes alumnos agendados.</Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mis Materias</Text>
            </View>

            <View style={styles.addSubjectRow}>
              <View style={styles.inputContainer}>
                <MaterialIcons name="library-books" size={20} color="#82665A" style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Añadir nueva materia..." placeholderTextColor="#82665A80" value={newSubject} onChangeText={setNewSubject} outlineStyle="none" />
              </View>
              <TouchableOpacity style={styles.addButton} onPress={handleAddSubject}>
                <MaterialIcons name="add" size={24} color="#EFEFE5" />
              </TouchableOpacity>
            </View>

            <View style={styles.gridContainer}>
              {subjects.map(subject => (
                <View key={subject.id} style={styles.cardSmall}>
                  <Text style={styles.cardTopic}>{subject.name}</Text>
                  <Text style={styles.detailText}>{subject.level}</Text>
                  <View style={styles.cardActions}>
                    <TouchableOpacity><MaterialIcons name="delete-outline" size={20} color="#D9534F" /></TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F0' },
  contentContainer: { paddingBottom: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%', paddingTop: 50, paddingBottom: 20 },
  greeting: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#82665A', opacity: 0.8 },
  userName: { fontFamily: 'Poppins_700Bold', fontSize: 26, color: '#82665A', letterSpacing: -0.5 },
  logoutButton: { padding: 10, backgroundColor: 'rgba(130, 102, 90, 0.1)', borderRadius: 12 },
  tabsContainer: { flexDirection: 'row', marginHorizontal: '5%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 6, shadowColor: '#82665A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, marginTop: 20, marginBottom: 30 },
  tabButton: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 12 },
  tabButtonActive: { backgroundColor: '#82665A' },
  tabText: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#82665A' },
  tabTextActive: { color: '#EFEFE5' },
  section: { paddingHorizontal: '5%' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontFamily: 'Poppins_700Bold', fontSize: 24, color: '#82665A' },
  addSubjectRow: { flexDirection: 'row', gap: 10, marginBottom: 25 },
  inputContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 15, shadowColor: '#82665A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 55, fontFamily: 'Poppins_400Regular', fontSize: 15, color: '#82665A' },
  addButton: { backgroundColor: '#82665A', width: 55, height: 55, borderRadius: 16, justifyContent: 'center', alignItems: 'center', shadowColor: '#82665A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, justifyContent: 'flex-start' },
  card: { flex: 1, minWidth: 300, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 25, shadowColor: '#82665A', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 4, marginBottom: 15 },
  cardSmall: { flex: 1, minWidth: 220, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, shadowColor: '#82665A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  cardTopic: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#82665A', flex: 1 },
  cardDetails: { gap: 8, marginBottom: 20 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  detailText: { fontFamily: 'Poppins_400Regular', fontSize: 15, color: '#82665A', opacity: 0.9 },
  cardActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15 },
  actionButton: { flexDirection: 'row', backgroundColor: '#82665A', paddingVertical: 14, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  actionButtonText: { fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: '#EFEFE5' },
  emptyStateContainer: { padding: 30, backgroundColor: '#FFFFFF', borderRadius: 20, alignItems: 'center', flex: 1 },
  emptyStateText: { fontFamily: 'Poppins_400Regular', color: '#82665A', opacity: 0.8 }
});