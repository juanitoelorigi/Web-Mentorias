import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LandingView({ 
  dashboardViewModel,
  onNavigateLogin, 
  onNavigateMentors, 
  onNavigateTopics, 
  onNavigateBooking, 
  onNavigateHelp,
  onNavigateVideoCall
}) {
  const { sessions, isLoading } = dashboardViewModel;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.logoText}>MentoWeb</Text>
        <View style={styles.navLinks}>
          <TouchableOpacity style={styles.navButton} onPress={onNavigateTopics}><Text style={styles.navText}>Temas</Text></TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={onNavigateMentors}><Text style={styles.navText}>Mentores</Text></TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={onNavigateLogin}><MaterialIcons name="logout" size={20} color="#82665A" /></TouchableOpacity>
        </View>
      </View>

      <View style={styles.heroSection}>
        <View style={styles.heroTextContainer}>
          <View style={styles.badge}><Text style={styles.badgeText}>🚀 Plataforma de aprendizaje</Text></View>
          <Text style={styles.heroTitle}>Resuelve tu duda en 20 minutos</Text>
          <Text style={styles.heroSubtitle}>Conéctate con expertos en tecnología y destraba tu código hoy mismo.</Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity style={styles.primaryButton} onPress={onNavigateBooking}><Text style={styles.primaryButtonText}>Programar asesoría</Text></TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={onNavigateHelp}><Text style={styles.secondaryButtonText}>Cómo funciona</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.heroImageContainer}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop' }} style={styles.heroImage} />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#82665A" style={styles.loader} />
      ) : (
        <View style={styles.meetingsSection}>
          <Text style={styles.sectionTitle}>Tus próximas reuniones</Text>
          {sessions && sessions.length > 0 ? (
            <View style={styles.gridContainer}>
              {sessions.map(session => (
                <View key={session.id} style={styles.widgetCard}>
                  <View style={styles.widgetHeader}>
                    <Text style={styles.widgetTopic} numberOfLines={1}>{session.topic}</Text>
                    <View style={styles.iconContainer}><MaterialIcons name="event" size={20} color="#82665A" /></View>
                  </View>
                  <View style={styles.widgetDetails}>
                    <View style={styles.detailRow}><MaterialIcons name="person" size={18} color="#82665A" /><Text style={styles.detailText}>{session.mentor}</Text></View>
                    <View style={styles.detailRow}><MaterialIcons name="schedule" size={16} color="#82665A" /><Text style={styles.detailText}>{session.date} • {session.time}</Text></View>
                  </View>
                  <TouchableOpacity style={styles.joinButton} onPress={onNavigateVideoCall}>
                    <MaterialIcons name="videocam" size={18} color="#EFEFE5" style={{ marginRight: 8 }} />
                    <Text style={styles.joinButtonText}>Unirse a videollamada</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <MaterialIcons name="event-busy" size={48} color="#C0C6BA" style={{ marginBottom: 10 }} />
              <Text style={styles.emptyStateText}>Aún no tienes asesorías programadas.</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F0' },
  contentContainer: { paddingBottom: 80 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%', paddingTop: 40, paddingBottom: 20 },
  logoText: { fontFamily: 'Poppins_700Bold', fontSize: 26, color: '#82665A', letterSpacing: -0.5 },
  navLinks: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  navButton: { paddingVertical: 8, paddingHorizontal: 10 },
  navText: { fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: '#82665A' },
  logoutButton: { marginLeft: 10, padding: 10, backgroundColor: 'rgba(130, 102, 90, 0.1)', borderRadius: 12 },
  heroSection: { flexDirection: 'row', flexWrap: 'wrap-reverse', justifyContent: 'center', alignItems: 'center', paddingHorizontal: '5%', paddingVertical: 60, gap: 40 },
  heroTextContainer: { flex: 1, minWidth: 320, maxWidth: 600 },
  badge: { alignSelf: 'flex-start', backgroundColor: 'rgba(130, 102, 90, 0.1)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginBottom: 20 },
  badgeText: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, color: '#82665A' },
  heroTitle: { fontFamily: 'Poppins_700Bold', fontSize: 48, color: '#82665A', lineHeight: 56, marginBottom: 20 },
  heroSubtitle: { fontFamily: 'Poppins_400Regular', fontSize: 18, color: '#82665A', marginBottom: 40, opacity: 0.8, lineHeight: 28 },
  heroButtons: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  primaryButton: { backgroundColor: '#82665A', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  primaryButtonText: { fontFamily: 'Poppins_600SemiBold', color: '#EFEFE5', fontSize: 16 },
  secondaryButton: { backgroundColor: 'transparent', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 14, borderWidth: 2, borderColor: '#82665A', justifyContent: 'center', alignItems: 'center' },
  secondaryButtonText: { fontFamily: 'Poppins_600SemiBold', color: '#82665A', fontSize: 16 },
  heroImageContainer: { flex: 1, minWidth: 320, maxWidth: 500, alignItems: 'center' },
  heroImage: { width: '100%', aspectRatio: 4/3, borderRadius: 32 },
  loader: { marginTop: 60 },
  meetingsSection: { paddingHorizontal: '5%', marginTop: 20 },
  sectionTitle: { fontFamily: 'Poppins_700Bold', fontSize: 24, color: '#82665A', marginBottom: 24 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 24, justifyContent: 'flex-start' },
  widgetCard: { flex: 1, minWidth: 320, backgroundColor: '#FFFFFF', padding: 25, borderRadius: 24, shadowColor: '#82665A', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 4 },
  widgetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  widgetTopic: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#82665A', flex: 1, paddingRight: 10 },
  iconContainer: { backgroundColor: 'rgba(130, 102, 90, 0.1)', padding: 10, borderRadius: 12 },
  widgetDetails: { gap: 12, marginBottom: 25 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  detailText: { fontFamily: 'Poppins_500Medium', fontSize: 15, color: '#82665A', opacity: 0.9 },
  joinButton: { flexDirection: 'row', backgroundColor: '#82665A', paddingVertical: 14, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  joinButtonText: { fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: '#EFEFE5' },
  emptyStateContainer: { padding: 40, backgroundColor: '#FFFFFF', borderRadius: 24, alignItems: 'center' },
  emptyStateText: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#82665A' }
});