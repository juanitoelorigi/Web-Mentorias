import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function VideoCallView({ onEndCall, user }) {
  const jitsiContainer = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadJitsiScript = () => {
      let script = document.getElementById('jitsi-script');
      if (!script) {
        script = document.createElement('script');
        script.id = 'jitsi-script';
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;
        script.onload = initJitsi;
        document.body.appendChild(script);
      } else {
        initJitsi();
      }
    };

    const initJitsi = () => {
      if (!jitsiContainer.current) return;
      setIsLoading(false);
      
      const domain = 'meet.jit.si';
      const options = {
        roomName: `MentoWeb-Session-${user?.id || 'invitado'}`,
        width: '100%',
        height: '100%',
        parentNode: jitsiContainer.current,
        userInfo: {
          displayName: user?.name || 'Usuario'
        },
        configOverwrite: {
          disableThirdPartyRequests: true,
          disableDeepLinking: true,
          prejoinPageEnabled: false,
          hideConferenceTimer: true
        },
        interfaceConfigOverwrite: {
          DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
          SHOW_CHROME_EXTENSION_BANNER: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
          TOOLBOX_ALWAYS_VISIBLE: false
        }
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      
      return () => api.dispose();
    };

    if (Platform.OS === 'web') {
        loadJitsiScript();
    } else {
        setIsLoading(false);
    }

  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sesión en curso</Text>
        <TouchableOpacity style={styles.endCallButton} onPress={onEndCall}>
          <MaterialIcons name="call-end" size={24} color="#EFEFE5" />
          <Text style={styles.endCallText}>Salir</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.videoContainer}>
        {Platform.OS === 'web' ? (
           <>
            {isLoading && <ActivityIndicator size="large" color="#82665A" />}
            <div ref={jitsiContainer} style={{ width: '100%', height: '100%' }} />
           </>
        ) : (
            <Text style={styles.notSupportedText}>La videollamada web no está soportada en móvil nativo.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, backgroundColor: '#1F2937' },
  title: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#EFEFE5' },
  endCallButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EF4444', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, gap: 5 },
  endCallText: { fontFamily: 'Poppins_600SemiBold', color: '#EFEFE5' },
  videoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  notSupportedText: { color: '#EFEFE5', fontFamily: 'Poppins_400Regular' }
});