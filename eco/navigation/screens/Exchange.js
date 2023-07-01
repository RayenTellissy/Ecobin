import React, { useRef, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useRoute, useNavigation } from '@react-navigation/native';

const Exchange = () => {
  const [showGift, setShowGift] = useState(false);
  const opacityValue = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const handleExchange = () => {
    setShowGift(true);
    Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animation completed, reset the values and hide the gift image
      opacityValue.setValue(0);
      rotateValue.setValue(0);
      setShowGift(false);
    });
  };

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
     <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon style={styles.headerIcon} name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
     <Text style={styles.title}>Exchange</Text>
     
    </View>
      
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://img.freepik.com/premium-vector/loyalty-program-banner-with-colored-line-flat-icons-collect-bonuses-get-gifts_108855-3445.jpg?w=2000',
          }}
          style={styles.image}
        />
        <View style={styles.cardContent}>
          <Text style={styles.points}>1000 Points</Text>
          <TouchableOpacity style={styles.button} onPress={handleExchange}>
            <Text style={styles.buttonText}>Exchange</Text>
          </TouchableOpacity>
        </View>
        {showGift && (
          <Animated.Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/008/852/068/original/realistic-3d-white-gift-box-with-green-glossy-ribbon-bow-isolated-on-transparent-background-3d-render-isometric-modern-holiday-surprise-box-realistic-icon-for-present-birthday-or-wedding-banners-png.png' }}
            style={[
              styles.giftImage,
              { opacity: opacityValue, transform: [{ rotateY: rotateInterpolation }] },
            ]}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: 'white',
    elevation: 4, // Add shadow on Android
    shadowColor: '#000000', // Add shadow on iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    top: -200,
  },
  headerIcon:{
    left: -110,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    padding: 20,
  },
  title: {
    color: '#2DCC70',
    fontSize: 25,
    fontWeight: 'bold',
   
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 15,
  },
  image: {
    width: 320,
    height: 170,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333333',
  },
  button: {
    backgroundColor: '#2DCC70',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  giftImage: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -70,
  },
});

export default Exchange;