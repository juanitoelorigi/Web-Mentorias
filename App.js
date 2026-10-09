import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import useAuthViewModel from './src/ViewModels/useAuthViewModel';
import useDashboardViewModel from './src/ViewModels/useDashboardViewModel';
import BookingView from './src/Views/BookingView';
import HelpView from './src/Views/HelpView';
import LandingView from './src/Views/LandingView';
import LoginView from './src/Views/LoginView';
import MentorDashboardView from './src/Views/MentorDashboardView';
import MentorsView from './src/Views/MentorsView';
import RegisterView from './src/Views/RegisterView';
import TopicsView from './src/Views/TopicsView';
import VideoCallView from './src/Views/VideoCallView';

export default function App() {
  const authViewModel = useAuthViewModel();
  const dashboardViewModel = useDashboardViewModel();
  const [authScreen, setAuthScreen] = useState('login');
  const [currentScreen, setCurrentScreen] = useState('landing');
  
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#82665A" />
      </View>
    );
  }

  if (!authViewModel.isLoggedIn) {
    return (
      <View style={styles.container}>
        {authScreen === 'login' ? (
          <LoginView viewModel={authViewModel} onNavigateRegister={() => setAuthScreen('register')} />
        ) : (
          <RegisterView viewModel={authViewModel} onNavigateLogin={() => setAuthScreen('login')} />
        )}
      </View>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'videocall':
        return <VideoCallView user={authViewModel.user} onEndCall={() => setCurrentScreen('landing')} />;
      case 'mentors':
        return <MentorsView onBack={() => setCurrentScreen('landing')} onNavigateHelp={() => setCurrentScreen('help')} onNavigateTopics={() => setCurrentScreen('topics')} />;
      case 'topics':
        return <TopicsView onBack={() => setCurrentScreen('landing')} onNavigateHelp={() => setCurrentScreen('help')} onNavigateMentors={() => setCurrentScreen('mentors')} />;
      case 'booking':
        return (
          <BookingView 
            onBack={() => setCurrentScreen('landing')} 
            onBook={(sessionData) => {
              dashboardViewModel.addSession(sessionData);
              setCurrentScreen('landing');
            }}
            sessions={dashboardViewModel.sessions}
            subjects={dashboardViewModel.subjects}
          />
        );
      case 'help':
        return <HelpView onBack={() => setCurrentScreen('landing')} />;
      case 'landing':
      default:
        if (authViewModel.user?.role === 'Mentor') {
          return (
            <MentorDashboardView 
              user={authViewModel.user}
              dashboardViewModel={dashboardViewModel}
              onNavigateLogin={() => {
                authViewModel.logout();
                setCurrentScreen('landing');
                setAuthScreen('login');
              }}
              onNavigateVideoCall={() => setCurrentScreen('videocall')}
            />
          );
        }
        
        return (
          <LandingView 
            dashboardViewModel={dashboardViewModel}
            onNavigateLogin={() => {
              authViewModel.logout();
              setCurrentScreen('landing');
              setAuthScreen('login');
            }} 
            onNavigateMentors={() => setCurrentScreen('mentors')}
            onNavigateTopics={() => setCurrentScreen('topics')}
            onNavigateBooking={() => setCurrentScreen('booking')}
            onNavigateHelp={() => setCurrentScreen('help')}
            onNavigateVideoCall={() => setCurrentScreen('videocall')}
          />
        );
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F0' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F4F0' }
});