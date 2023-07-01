import React from 'react';
import { View, Text, StyleSheet,ScrollView,Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const FAQ = ({navigation}) => {
  return (
    <View>
     <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon style={styles.headerIcon} name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
     <Text style={styles.title}>FAQ</Text>
     
    </View>
    <ScrollView>
    
         <View style={styles.container}>
      <Image source={require('../assets/faq2.png')} style={styles.image} />
    </View>
    <View style={styles.container}>
      <Text style={styles.heading}>FAQ</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>What is RuntahPedia?</Text>
        <Text style={styles.answer}>
          RuntahPedia is an online waste buying and selling application (Recycling platform). RuntahPedia connects waste producers (households, businesses, and offices) with the nearest local collectors, making it easier to sell waste.
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>How is RuntahPedia different from a Waste Bank or other waste management services?</Text>
        <Text style={styles.answer}>
          RuntahPedia is not a garbage pick-up service company. It aims to provide more value by ensuring that the garbage picked up by their partners gets recycled instead of being thrown into the landfill. RuntahPedia offers trash-selling services and a recycling program where everything gets recycled again.
        </Text>
      </View>

      

    </View>
    </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
    headerContainer: {
        display:'flex',
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
     top:30,
      },
      title: {
        color: '#2DCC70',
        fontSize: 25,
        fontWeight: 'bold',
       
      },
      headerIcon:{
        left: -110,
      },
  container: {
    top:100,
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  answer: {
    fontSize: 16,
  },
});

export default FAQ;