import React, { useEffect, useRef } from 'react';
import { Animated, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LaunchPage = () => {
  const logoRotation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const navigateToMainContainer = () => {
      navigation.navigate('WalkthroughScreen');
    };

    Animated.parallel([
      Animated.timing(logoRotation, {
        toValue: 2,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to MainContainer after animations complete
      setTimeout(navigateToMainContainer, 2000); // Delay navigation by 2 seconds
    });
  }, [navigation, fadeAnimation, logoRotation]);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#9CFFE7' }}>
      <Animated.View
        style={{
          transform: [
            {
              rotate: logoRotation.interpolate({
                inputRange: [0, 2],
                outputRange: ['0deg', '720deg'],
              }),
            },
          ],
        }}
      >
        <Image
          source={require('../assets/img1.png')}
          style={{ width: 200, height: 200 }}
        />
      </Animated.View>
      <Animated.View
        style={{
          opacity: fadeAnimation,
          marginTop: 5,
        }}
      >
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 250, height: 250}}
        />
      </Animated.View>
    </View>
  );
};

export default LaunchPage;
