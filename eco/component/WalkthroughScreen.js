import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import Images from "../assets/image";
import Swiper from "react-native-swiper";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

export default function WalkthroughScreen() {
  const walkthroughtList = [
    {
      id: 1,
      title: "Easy Sale of Waste",
      description:
        "Selling Waste, Dispose of Your Trash at Designated Locations and Earn Rewards",
      image: Images.img1,
      img: Images.vector,
    },
    {
      id: 2,
      title: "Everything Can Be Recycled",
      description:
        "By Recycling, You Contribute to Earth Conservation and Community Well-being",
      image: Images.img2,
      img: Images.vector,
    },
    {
      id: 3,
      title: "Recycle at the Nearest Location",
      description:
        "By recycling, you contribute to the conservation of the Earth and the well-being of society",
      image: Images.img3,
      img: Images.vector,
    },
    {
      id: 4,
      title: "Join Us",
      description:
        "Together, Let's Become Agents of Waste Management Caring for the Future",
      image: Images.img4,
      img: Images.vector,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwiperIndexChanged = (index) => {
    setCurrentIndex(index);
  };
  const navigation = useNavigation();
  const handleGetStarted = () => {
   
    navigation.navigate('Home');
  };
  

  return (
    <View style={styles.container}>
    <ScrollView>
      <View style={styles.imageContainer}>
        <Swiper
          loop={false}
          paginationStyle={{
            position: "absolute",
            bottom: "40%",
          }}
          activeDotColor="#2DCC70"
          activeDotStyle={{ width: 20, height: 8 }}
          onIndexChanged={handleSwiperIndexChanged}
        >
          {walkthroughtList.map((item, index) => (
            <View key={item.id} style={styles.slide}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
              <View style={styles.bottomContent}>
                <Image source={item.img} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    </ScrollView>
    {currentIndex === walkthroughtList.length - 1 && (
      <View
        style={{
          position: "absolute",
          bottom: "7%",
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.buttonStyle} onPress={handleGetStarted}>
          <Text style={styles.textStartedStyle}>Get Started</Text>
        </TouchableOpacity>
       
      </View>
    )}
    
  </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
    paddingBottom: 100,
  },
  image: {
    width: "100%",
    height: "80%",
  },
  title: {
    fontSize: 23,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    width: "80%",
    textAlign: "center",
    marginTop: 5,
    position: "absolute",
    bottom: "90%",
    zIndex: 1,
    color: "#9A9B9B",
  },
  description: {
    fontSize: 14,
    fontFamily: "Montserrat",
    width: "90%",
    textAlign: "center",
    marginTop: 20,
    position: "absolute",
    bottom: "50%",
    zIndex: 1,
    color: "#9A9B9B",
  },
  buttonStyle: {
    backgroundColor: "#2DCC70",
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 20,
  },
  textStartedStyle: {
    fontWeight: "bold",
    color: "white",
    
  },
  bottomContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
