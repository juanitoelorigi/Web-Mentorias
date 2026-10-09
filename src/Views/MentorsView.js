import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FadeInUp, GlassHoverCard } from '../Components/AnimatedUI';
import useMentorsViewModel from '../ViewModels/useMentorsViewModel';

export default function MentorsView({ onBack, onNavigateHelp, onNavigateTopics }) {
  const { mentors, isLoading } = useMentorsViewModel();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#82665A" />
          </TouchableOpacity>
          <Text style={styles.logoText}>MentoWeb</Text>
        </View>
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={onNavigateHelp}><Text style={styles.navText}>Cómo funciona</Text></TouchableOpacity>
          <TouchableOpacity onPress={onNavigateTopics}><Text style={styles.navText}>Temas</Text></TouchableOpacity>
          <Text style={[styles.navText, styles.activeNavText]}>Mentores</Text>
        </View>
      </View>

      <FadeInUp delay={100} style={styles.searchSection}>
        <Text style={styles.pageTitle}>Encuentra a tu experto</Text>
        <View style={styles.filtersRow}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={22} color="#82665A" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Buscar por tecnología, lenguaje o nombre..."
              placeholderTextColor="#82665A80"
              outlineStyle="none"
            />
          </View>
          <View style={styles.dropdownsContainer}>
            {['Especialidad', 'Precio', 'Calificación'].map((filter) => (
              <TouchableOpacity key={filter} style={styles.filterButton}>
                <Text style={styles.filterText}>{filter}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color="#82665A" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </FadeInUp>

      {isLoading ? (
        <ActivityIndicator size="large" color="#82665A" style={{ marginTop: 80 }} />
      ) : (
        <FadeInUp delay={300} style={styles.gridContainer}>
          {mentors.length > 0 ? mentors.map((mentor) => (
            <GlassHoverCard key={mentor.id}>
              <View>
                <View style={styles.cardTop}>
                  <View style={styles.avatarPlaceholder}>
                    <MaterialIcons name="person" size={40} color="#82665A" style={{ opacity: 0.5 }} />
                  </View>
                  <View style={styles.mentorInfo}>
                    <Text style={styles.mentorName} numberOfLines={1}>{mentor.name}</Text>
                    <View style={styles.tagBadge}>
                      <Text style={styles.tagText}>Desarrollo Software</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.statsRow}>
                  <MaterialIcons name="star" size={18} color="#E5A639" />
                  <Text style={styles.statsText}>5.0 (Nuevos ingresos)</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.profileButton}>
                <Text style={styles.profileButtonText}>Ver perfil y horarios</Text>
                <MaterialIcons name="arrow-forward" size={18} color="#82665A" />
              </TouchableOpacity>
            </GlassHoverCard>
          )) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="search-off" size={48} color="#C0C6BA" style={{ marginBottom: 10 }} />
              <Text style={styles.emptyText}>No encontramos mentores con esos filtros.</Text>
            </View>
          )}
        </FadeInUp>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F0' },
  contentContainer: { paddingBottom: 80 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%', paddingTop: 40, paddingBottom: 20 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  backButton: { padding: 10, backgroundColor: 'rgba(130, 102, 90, 0.1)', borderRadius: 12 },
  logoText: { fontFamily: 'Poppins_700Bold', fontSize: 26, color: '#82665A', letterSpacing: -0.5 },
  navLinks: { flexDirection: 'row', gap: 24 },
  navText: { fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: '#82665A', opacity: 0.7 },
  activeNavText: { opacity: 1 },
  searchSection: { paddingHorizontal: '5%', paddingTop: 30, paddingBottom: 30 },
  pageTitle: { fontFamily: 'Poppins_700Bold', fontSize: 36, color: '#82665A', marginBottom: 24 },
  filtersRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  searchContainer: { flex: 1, minWidth: 300, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 20, shadowColor: '#82665A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, height: 60, fontFamily: 'Poppins_500Medium', fontSize: 15, color: '#82665A' },
  dropdownsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(130, 102, 90, 0.05)', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: 'rgba(130, 102, 90, 0.1)' },
  filterText: { fontFamily: 'Poppins_500Medium', fontSize: 14, color: '#82665A', marginRight: 8 },
  
  // EL GRID RESPONSIVO MAGICO
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: '5%', gap: 24, justifyContent: 'flex-start' },
  
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatarPlaceholder: { width: 64, height: 64, borderRadius: 20, backgroundColor: 'rgba(130, 102, 90, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  mentorInfo: { flex: 1 },
  mentorName: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#82665A', marginBottom: 6 },
  tagBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(130, 102, 90, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  tagText: { fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#82665A' },
  divider: { height: 1, backgroundColor: 'rgba(130, 102, 90, 0.1)', marginBottom: 20 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 25 },
  statsText: { fontFamily: 'Poppins_500Medium', fontSize: 14, color: '#82665A', opacity: 0.9, marginTop: 2 },
  profileButton: { flexDirection: 'row', backgroundColor: 'rgba(130, 102, 90, 0.08)', paddingVertical: 14, borderRadius: 14, alignItems: 'center', justifyContent: 'center', gap: 8 },
  profileButtonText: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#82665A' },
  
  emptyState: { width: '100%', alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontFamily: 'Poppins_500Medium', fontSize: 16, color: '#82665A', opacity: 0.8 }
});