import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FadeInUp } from '../Components/AnimatedUI';

export default function RegisterView({ viewModel, onNavigateLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ImageBackground 
      source={require('../../assets/images/fondo.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <FadeInUp delay={100} style={styles.formWrapper}>
          <BlurView intensity={80} tint="light" style={styles.glassCard}>
            
            <View style={styles.header}>
              <Text style={styles.title}>Crea tu cuenta</Text>
              <Text style={styles.subtitle}>Únete y comienza tu camino</Text>
            </View>

            <View style={styles.roleContainer}>
              <TouchableOpacity 
                style={[styles.roleButton, role === 'Alumno' && styles.roleButtonActive]} 
                onPress={() => setRole('Alumno')}
              >
                <MaterialIcons name="school" size={20} color={role === 'Alumno' ? '#EFEFE5' : '#82665A'} />
                <Text style={[styles.roleText, role === 'Alumno' && styles.roleTextActive]}>Aprender</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.roleButton, role === 'Mentor' && styles.roleButtonActive]} 
                onPress={() => setRole('Mentor')}
              >
                <MaterialIcons name="co-present" size={20} color={role === 'Mentor' ? '#EFEFE5' : '#82665A'} />
                <Text style={[styles.roleText, role === 'Mentor' && styles.roleTextActive]}>Ser Mentor</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="person-outline" size={20} color="#82665A" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Nombre completo" 
                placeholderTextColor="#82665A80"
                value={name}
                onChangeText={setName}
                outlineStyle="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="alternate-email" size={20} color="#82665A" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Correo electrónico" 
                placeholderTextColor="#82665A80"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                outlineStyle="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="lock-outline" size={20} color="#82665A" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Contraseña" 
                placeholderTextColor="#82665A80"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                outlineStyle="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="#82665A80" />
              </TouchableOpacity>
            </View>

            {viewModel.error ? <Text style={styles.errorText}>{viewModel.error}</Text> : null}

            <TouchableOpacity 
              style={styles.button} 
              onPress={() => viewModel.register(name, email, password, role)}
              disabled={viewModel.isLoading}
            >
              {viewModel.isLoading ? (
                <ActivityIndicator color="#EFEFE5" />
              ) : (
                <Text style={styles.buttonText}>Registrarse</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={onNavigateLogin}>
                <Text style={styles.footerLink}>Inicia sesión</Text>
              </TouchableOpacity>
            </View>

          </BlurView>
        </FadeInUp>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: 'rgba(239, 239, 229, 0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  formWrapper: { width: '100%', maxWidth: 440 },
  glassCard: { borderRadius: 32, padding: 35, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)', backgroundColor: 'rgba(255,255,255,0.45)', shadowColor: '#82665A', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  header: { marginBottom: 25, alignItems: 'center' },
  title: { fontFamily: 'Poppins_700Bold', fontSize: 30, color: '#82665A', marginBottom: 5 },
  subtitle: { fontFamily: 'Poppins_400Regular', fontSize: 15, color: '#82665A', opacity: 0.8 },
  roleContainer: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  roleButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(130, 102, 90, 0.2)', backgroundColor: 'rgba(255,255,255,0.6)', gap: 8 },
  roleButtonActive: { backgroundColor: '#82665A', borderColor: '#82665A' },
  roleText: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#82665A' },
  roleTextActive: { color: '#EFEFE5' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 16, paddingHorizontal: 18, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)' },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, height: 58, fontFamily: 'Poppins_400Regular', fontSize: 15, color: '#82665A' },
  eyeIcon: { padding: 8 },
  errorText: { fontFamily: 'Poppins_500Medium', color: '#D9534F', fontSize: 13, marginBottom: 15, textAlign: 'center' },
  button: { backgroundColor: '#82665A', height: 58, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 10, shadowColor: '#82665A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
  buttonText: { fontFamily: 'Poppins_600SemiBold', color: '#EFEFE5', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { fontFamily: 'Poppins_400Regular', color: '#82665A', fontSize: 14 },
  footerLink: { fontFamily: 'Poppins_600SemiBold', color: '#82665A', fontSize: 14 }
});