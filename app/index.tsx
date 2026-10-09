import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import useAuthViewModel from '../src/ViewModels/useAuthViewModel';
import BookingView from '../src/Views/BookingView';
import HelpView from '../src/Views/HelpView';
import LandingView from '../src/Views/LandingView';
import LoginView from '../src/Views/LoginView';
import MentorsView from '../src/Views/MentorsView';
import TopicsView from '../src/Views/TopicsView';

export default function Page() {
  const authViewModel = useAuthViewModel();
  const [currentScreen, setCurrentScreen] = useState('landing');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'mentors':
        return <MentorsView onBack={() => setCurrentScreen('landing')} />;
      case 'topics':
        return <TopicsView onBack={() => setCurrentScreen('landing')} />;
      case 'booking':
        return <BookingView onBack={() => setCurrentScreen('landing')} />;
      case 'help':
        return <HelpView onBack={() => setCurrentScreen('landing')} />;
      case 'landing':
      default:
        return (
          <LandingView 
            onNavigateLogin={authViewModel.logout} 
            onNavigateMentors={() => setCurrentScreen('mentors')}
            onNavigateTopics={() => setCurrentScreen('topics')}
            onNavigateBooking={() => setCurrentScreen('booking')}
            onNavigateHelp={() => setCurrentScreen('help')}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {!authViewModel.isLoggedIn ? (
        <LoginView viewModel={authViewModel} />
      ) : (
        renderScreen()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFE5',
  },
});