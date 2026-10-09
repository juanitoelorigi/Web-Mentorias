import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useMentorsViewModel from '../ViewModels/useMentorsViewModel';

export default function BookingView({ onBack, onBook, sessions = [], subjects = [] }) {
  const { mentors } = useMentorsViewModel();
  
  const [mentor, setMentor] = useState('');
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const upcomingDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  });

  const availableTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '15:00 PM', '16:00 PM', '17:00 PM'];
  const mentorNames = mentors.map(m => m.name);
  const subjectNames = subjects.map(s => s.name);

  const handleBooking = () => {
    setError('');
    if (!mentor || !topic || !date || !time) {
      setError('Por favor completa todos los campos para agendar tu asesoría.');
      return;
    }

    const isMentorBusy = sessions.some(s => s.mentor === mentor && s.date === date && s.time === time);
    
    if (isMentorBusy) {
      setError(`⚠️ ${mentor} ya tiene una sesión ocupada el ${date} a las ${time}. Por favor elige otro horario u otro mentor.`);
      return;
    }

    onBook({ mentor, topic, date, time });
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const DropdownSelector = ({ label, icon, value, options, dropdownName }) => (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity 
        style={[styles.inputContainer, activeDropdown === dropdownName && styles.inputContainerActive]} 
        onPress={() => toggleDropdown(dropdownName)}
      >
        <MaterialIcons name={icon} size={20} color="#82665A" style={styles.inputIcon} />
        <Text style={[styles.inputText, !value && styles.placeholderText]}>
          {value || `Seleccionar`}
        </Text>
        <MaterialIcons name={activeDropdown === dropdownName ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={22} color="#82665A" />
      </TouchableOpacity>
      
      {activeDropdown === dropdownName && (
        <View style={styles.dropdownList}>
          {options.length > 0 ? options.map((opt, i) => (
            <TouchableOpacity 
              key={i} 
              style={styles.dropdownItem} 
              onPress={() => {
                if (dropdownName === 'mentor') setMentor(opt);
                if (dropdownName === 'topic') setTopic(opt);
                if (dropdownName === 'date') setDate(opt);
                if (dropdownName === 'time') setTime(opt);
                setActiveDropdown(null);
                setError('');
              }}
            >
              <Text style={styles.dropdownItemText}>{opt}</Text>
            </TouchableOpacity>
          )) : (
            <View style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>No hay opciones disponibles</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );

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

      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Reserva tu asesoría</Text>
        <Text style={styles.pageSubtitle}>Selecciona a tu experto y asegura tu espacio de aprendizaje.</Text>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>1. Especialista y Materia</Text>
          <DropdownSelector label="Nombre del mentor" icon="person" value={mentor} options={mentorNames} dropdownName="mentor" />
          <DropdownSelector label="Materia o Tema" icon="menu-book" value={topic} options={subjectNames} dropdownName="topic" />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>2. Fecha y Hora</Text>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <DropdownSelector label="Fecha" icon="calendar-today" value={date} options={upcomingDates} dropdownName="date" />
            </View>
            <View style={styles.halfWidth}>
              <DropdownSelector label="Hora" icon="access-time" value={time} options={availableTimes} dropdownName="time" />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Total a pagar:</Text>
          <Text style={styles.summaryPrice}>$15.00 USD</Text>
        </View>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleBooking}>
          <MaterialIcons name="check-circle-outline" size={20} color="#EFEFE5" style={{ marginRight: 10 }} />
          <Text style={styles.submitButtonText}>Confirmar y Reservar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F0' },
  contentContainer: { paddingBottom: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%', paddingTop: 50, paddingBottom: 20 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  backButton: { padding: 10, backgroundColor: 'rgba(130, 102, 90, 0.1)', borderRadius: 12 },
  logoText: { fontFamily: 'Poppins_700Bold', fontSize: 24, color: '#82665A', letterSpacing: 1 },
  pageHeader: { paddingHorizontal: '5%', paddingTop: 30, paddingBottom: 10 },
  pageTitle: { fontFamily: 'Poppins_700Bold', fontSize: 32, color: '#82665A', marginBottom: 5 },
  pageSubtitle: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#82665A', opacity: 0.8 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: '5%', gap: 24, justifyContent: 'flex-start', marginTop: 20 },
  sectionCard: { flex: 1, minWidth: 320, backgroundColor: '#FFFFFF', padding: 25, borderRadius: 24, shadowColor: '#82665A', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 4, zIndex: 1 },
  sectionTitle: { fontFamily: 'Poppins_700Bold', fontSize: 20, color: '#82665A', marginBottom: 20 },
  inputWrapper: { marginBottom: 15, position: 'relative', zIndex: 2 },
  inputLabel: { fontFamily: 'Poppins_500Medium', fontSize: 14, color: '#82665A', marginBottom: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  halfWidth: { flex: 1, minWidth: 120 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F4F0', borderRadius: 16, paddingHorizontal: 15, height: 55, borderWidth: 1, borderColor: 'rgba(130, 102, 90, 0.1)' },
  inputContainerActive: { borderColor: '#82665A', backgroundColor: '#FFFFFF' },
  inputIcon: { marginRight: 10 },
  inputText: { flex: 1, fontFamily: 'Poppins_500Medium', fontSize: 14, color: '#82665A' },
  placeholderText: { color: '#82665A80' },
  dropdownList: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(130, 102, 90, 0.2)', borderRadius: 16, marginTop: 5, paddingVertical: 5, shadowColor: '#82665A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 15 },
  dropdownItemText: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#82665A' },
  errorContainer: { backgroundColor: '#FDECEA', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#D9534F' },
  errorText: { fontFamily: 'Poppins_500Medium', color: '#D9534F', fontSize: 14, textAlign: 'center' },
  summaryContainer: { marginHorizontal: '5%', marginTop: 30, padding: 30, backgroundColor: '#82665A', borderRadius: 24, zIndex: 0 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  summaryText: { fontFamily: 'Poppins_500Medium', fontSize: 18, color: '#EFEFE5' },
  summaryPrice: { fontFamily: 'Poppins_700Bold', fontSize: 28, color: '#EFEFE5' },
  submitButton: { flexDirection: 'row', backgroundColor: '#EFEFE5', height: 60, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  submitButtonText: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#82665A' }
});