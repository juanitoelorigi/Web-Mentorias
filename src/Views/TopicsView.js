import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MOCK_TOPICS = [
  { id: '1', name: 'Programación', category: 'Tecnología', level: 'Todos los niveles', mentorsCount: 24 },
  { id: '2', name: 'Matemáticas', category: 'Ciencias Exactas', level: 'Básico - Intermedio', mentorsCount: 18 },
  { id: '3', name: 'Cálculo Vectorial', category: 'Ciencias Exactas', level: 'Avanzado', mentorsCount: 8 },
  { id: '4', name: 'Física', category: 'Ciencias Exactas', level: 'Intermedio', mentorsCount: 12 },
  { id: '5', name: 'Bases de Datos', category: 'Tecnología', level: 'Intermedio - Avanzado', mentorsCount: 15 },
  { id: '6', name: 'Redes e Infraestructura', category: 'Tecnología', level: 'Avanzado', mentorsCount: 7 },
];

export default function TopicsView({ onBack, onNavigateHelp, onNavigateMentors }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#82665A" />
          </TouchableOpacity>
          <Text style={styles.logoText}>MentoWeb</Text>
        </View>
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={onNavigateHelp}>
            <Text style={styles.navText}>Cómo funciona</Text>
          </TouchableOpacity>
          <Text style={[styles.navText, styles.activeNavText]}>Temas</Text>
          <TouchableOpacity onPress={onNavigateMentors}>
            <Text style={styles.navText}>Mentores</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TÍTULO Y BÚSQUEDA */}
      <View style={styles.searchSection}>
        <Text style={styles.pageTitle}>Explora por temas</Text>
        
        <View style={styles.filtersRow}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#82665A" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Buscar materia o categoría"
              placeholderTextColor="#82665A80"
              outlineStyle="none"
            />
          </View>
          
          <View style={styles.dropdownsContainer}>
            {['Categoría', 'Nivel', 'Idioma'].map((filter) => (
              <TouchableOpacity key={filter} style={styles.filterButton}>
                <Text style={styles.filterText}>{filter}</Text>
                <MaterialIcons name="arrow-drop-down" size={20} color="#82665A" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* GRID DE TEMAS */}
      <View style={styles.gridContainer}>
        {MOCK_TOPICS.map((topic) => (
          <View key={topic.id} style={styles.topicCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <MaterialIcons 
                  name={topic.category === 'Tecnología' ? 'computer' : 'functions'} 
                  size={32} 
                  color="#82665A" 
                />
              </View>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{topic.category}</Text>
              </View>
            </View>
            
            <View style={styles.topicInfo}>
              <Text style={styles.topicName}>{topic.name}</Text>
              <View style={styles.detailRow}>
                <MaterialIcons name="school" size={16} color="#82665A" style={{ opacity: 0.7 }} />
                <Text style={styles.detailText}>{topic.level}</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialIcons name="people-outline" size={16} color="#82665A" style={{ opacity: 0.7 }} />
                <Text style={styles.detailText}>{topic.mentorsCount} mentores disponibles</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Ver mentores</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* PAGINACIÓN SIMULADA */}
      <View style={styles.pagination}>
        <Text style={styles.paginationText}>{'<  1  2  3  >'}</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFEFE5' },
  contentContainer: { paddingBottom: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30, paddingTop: 50, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#D4CEC2' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  backButton: { padding: 5 },
  logoText: { fontFamily: 'Poppins_700Bold', fontSize: 24, color: '#82665A', letterSpacing: 1 },
  navLinks: { flexDirection: 'row', gap: 20 },
  navText: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#82665A', opacity: 0.7 },
  activeNavText: { opacity: 1, textDecorationLine: 'underline' },
  searchSection: { paddingHorizontal: 30, paddingTop: 40, paddingBottom: 20 },
  pageTitle: { fontFamily: 'Poppins_700Bold', fontSize: 28, color: '#82665A', marginBottom: 20 },
  filtersRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  searchContainer: { flex: 1, minWidth: 250, flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8E5DA', borderRadius: 8, paddingHorizontal: 15, borderWidth: 1, borderColor: '#D4CEC2' },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 45, fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#82665A' },
  dropdownsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFEFE5', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#D4CEC2' },
  filterText: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#82665A', marginRight: 5 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 30, gap: 20, justifyContent: 'center' },
  topicCard: { backgroundColor: '#E8E5DA', borderRadius: 12, padding: 20, minWidth: 300, flex: 1, maxWidth: 400, borderWidth: 1, borderColor: '#D4CEC2', justifyContent: 'space-between' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  iconContainer: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#D4CEC2', justifyContent: 'center', alignItems: 'center' },
  tagBadge: { backgroundColor: '#EFEFE5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#D4CEC2' },
  tagText: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#82665A' },
  topicInfo: { marginBottom: 25 },
  topicName: { fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#82665A', marginBottom: 12 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  detailText: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#82665A', opacity: 0.9 },
  actionButton: { backgroundColor: '#82665A', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  actionButtonText: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#EFEFE5' },
  pagination: { alignItems: 'center', marginTop: 40 },
  paginationText: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#82665A', letterSpacing: 5 }
});