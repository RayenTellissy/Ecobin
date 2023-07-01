import React from 'react';
import { View, Text, StyleSheet,ScrollView,Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Guide = ({navigation}) => {
  return (
    <View>
      <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon style={styles.headerIcon} name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
     <Text style={styles.title}>GUIDE</Text>
     
    </View>
    <ScrollView>
   
         <View style={styles.container}>
      <Image source={require('../assets/guide.png')} style={styles.image} />
    </View>
    <View style={styles.container}>
      <Text style={styles.heading}>User Guide</Text>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Registration</Text>
        <Text style={styles.guideText}>
          1. Click the "register" button at the bottom of the login page on the Mallsampah application. You can also register using Google or Facebook.
        </Text>
        <Text style={styles.guideText}>
          2. Fill in your data in the provided fields (name, email, password, gender, date, and year of birth).
        </Text>
        <Text style={styles.guideText}>
          3. Submit the registration form.
        </Text>
        <Text style={styles.guideText}>
          4. Check your email to activate your RuntahPedia account.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Garbage Drop Off Guide</Text>
        <Text style={styles.guideText}>
          1. Login to your Mallsampah account.
        </Text>
        <Text style={styles.guideText}>
          2. Make sure you have prepared the waste to be sold, separated by type, with a minimum weight of 1 kg. Pack the waste in plastic or other containers.
        </Text>
        <Text style={styles.guideText}>
          3. Open the RuntahPedia application and select the "Nearby" service to find affiliated waste processing sites.
        </Text>
        <Text style={styles.guideText}>
          4. Open the "Recycle" service and scan the QR Code at the waste processing facility.
        </Text>
        <Text style={styles.guideText}>
          5. Fill out the trash submission form and upload a photo of the submitted trash.
        </Text>
        <Text style={styles.guideText}>
          6. Wait for validation by the officers in the field.
        </Text>
        <Text style={styles.guideText}>
          7. Once successful, the details of the transaction will appear.
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
   top:20,
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  guideText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Guide;