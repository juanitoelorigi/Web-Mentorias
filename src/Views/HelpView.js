import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const STEPS = [
  { id: '1', icon: 'search', title: '1. Encuentra tu tema', desc: 'Explora nuestro catálogo por materia o busca directamente al profesional.' },
  { id: '2', icon: 'event-available', title: '2. Selecciona horario', desc: 'Elige la fecha y hora que mejor se adapte a tu disponibilidad.' },
  { id: '3', icon: 'payment', title: '3. Reserva y paga', desc: 'Completa los detalles de tu duda y realiza el pago seguro.' },
  { id: '4', icon: 'videocam', title: '4. Conéctate a la llamada', desc: 'Únete a la videollamada de 20 minutos en la fecha programada.' },
];

export default function HelpView({ onBack }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#82665A" />
          </TouchableOpacity>
          <Text style={styles.logoText}>MentoWeb</Text>
        </View>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.pageTitle}>¿Cómo funciona?</Text>
        <Text style={styles.pageSubtitle}>Aprende a programar tu primera asesoría en 4 sencillos pasos.</Text>
      </View>

      <View style={styles.gridContainer}>
        {STEPS.map((step) => (
          <View key={step.id} style={styles.stepCard}>
            <View style={styles.iconContainer}>
              <MaterialIcons name={step.icon} size={32} color="#82665A" />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.supportSection}>
        <Text style={styles.supportTitle}>¿Aún tienes dudas?</Text>
        <Text style={styles.supportDesc}>Nuestro equipo está listo para ayudarte con cualquier problema.</Text>
        <TouchableOpacity style={styles.supportButton}>
          <MaterialIcons name="chat-bubble-outline" size={20} color="#EFEFE5" style={{ marginRight: 10 }} />
          <Text style={styles.supportButtonText}>Contactar Soporte</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F0' },
  contentContainer: { paddingBottom: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%', paddingTop: 50, paddingBottom: 20 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  backButton: { padding: 10, backgroundColor: 'rgba(130, 102, 90, 0.1)', borderRadius: 12 },
  logoText: { fontFamily: 'Poppins_700Bold', fontSize: 24, color: '#82665A', letterSpacing: 1 },
  heroSection: { paddingHorizontal: '5%', paddingTop: 40, paddingBottom: 20, alignItems: 'center' },
  pageTitle: { fontFamily: 'Poppins_700Bold', fontSize: 36, color: '#82665A', marginBottom: 10, textAlign: 'center' },
  pageSubtitle: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#82665A', opacity: 0.8, textAlign: 'center', maxWidth: 500 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: '5%', gap: 24, justifyContent: 'center', marginTop: 20 },
  stepCard: { flex: 1, minWidth: 280, maxWidth: 400, flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 30, borderRadius: 24, shadowColor: '#82665A', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 4 },
  iconContainer: { width: 64, height: 64, borderRadius: 20, backgroundColor: 'rgba(130, 102, 90, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  stepInfo: { flex: 1 },
  stepTitle: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#82665A', marginBottom: 10 },
  stepDesc: { fontFamily: 'Poppins_400Regular', fontSize: 15, color: '#82665A', opacity: 0.8, lineHeight: 22 },
  supportSection: { marginHorizontal: '5%', marginTop: 50, padding: 40, backgroundColor: 'rgba(130, 102, 90, 0.1)', borderRadius: 24, alignItems: 'center' },
  supportTitle: { fontFamily: 'Poppins_700Bold', fontSize: 24, color: '#82665A', marginBottom: 10 },
  supportDesc: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#82665A', textAlign: 'center', marginBottom: 25, maxWidth: 400 },
  supportButton: { flexDirection: 'row', backgroundColor: '#82665A', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 16, alignItems: 'center' },
  supportButtonText: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#EFEFE5' }
});