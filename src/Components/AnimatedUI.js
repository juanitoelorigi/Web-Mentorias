import { BlurView } from 'expo-blur';
import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text } from 'react-native';

export const FadeInUp = ({ children, delay = 0, style }) => {
  const animY = useRef(new Animated.Value(30)).current;
  const animOp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animY, { toValue: 0, duration: 700, delay, useNativeDriver: true }),
      Animated.timing(animOp, { toValue: 1, duration: 700, delay, useNativeDriver: true })
    ]).start();
  }, []);

  return (
    <Animated.View style={[style, { opacity: animOp, transform: [{ translateY: animY }] }]}>
      {children}
    </Animated.View>
  );
};

export const GlassHoverCard = ({ children, style, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverIn = () => {
    setIsHovered(true);
    Animated.spring(scale, { toValue: 1.03, friction: 6, useNativeDriver: true }).start();
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={Platform.OS === 'web' ? handleHoverIn : null}
      onHoverOut={Platform.OS === 'web' ? handleHoverOut : null}
      onPressIn={() => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start()}
      onPressOut={() => Animated.spring(scale, { toValue: isHovered ? 1.03 : 1, useNativeDriver: true }).start()}
      style={{ flex: 1, minWidth: 280, maxWidth: 380 }}
    >
      <Animated.View style={[
        styles.glassWrapper, 
        isHovered && styles.glassHovered,
        { transform: [{ scale }] }, 
        style
      ]}>
        <BlurView intensity={60} tint="light" style={styles.blurContainer}>
          {children}
        </BlurView>
      </Animated.View>
    </Pressable>
  );
};

export const HoverButton = ({ title, onPress, primary = true, icon }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={Platform.OS === 'web' ? () => setIsHovered(true) : null}
      onHoverOut={Platform.OS === 'web' ? () => setIsHovered(false) : null}
      onPressIn={() => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start()}
      onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
    >
      <Animated.View style={[
        styles.buttonBase,
        primary ? styles.buttonPrimary : styles.buttonSecondary,
        isHovered && primary && { backgroundColor: '#6B5349' },
        isHovered && !primary && { backgroundColor: 'rgba(130, 102, 90, 0.1)' },
        { transform: [{ scale }] }
      ]}>
        {icon}
        <Text style={[styles.buttonText, primary ? styles.textPrimary : styles.textSecondary]}>
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  glassWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#82665A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  glassHovered: {
    borderColor: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    shadowOpacity: 0.12,
    shadowRadius: 20,
  },
  blurContainer: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between'
  },
  buttonBase: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonPrimary: {
    backgroundColor: '#82665A',
    shadowColor: '#82665A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#82665A',
  },
  buttonText: { fontFamily: 'Poppins_600SemiBold', fontSize: 16 },
  textPrimary: { color: '#EFEFE5' },
  textSecondary: { color: '#82665A' }
});