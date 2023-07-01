import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import BackButton from "../../components/BackButton/BackButton";
import { server_url } from '../../secret';


const AboutMe = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userDetails, } = route.params;
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  
  useEffect(() => {
    
      fetchUserDetails(); // Fetch the user details when the screen comes into focus
   

    
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${server_url}/users/user/${userDetails.id}`);
      const data = await response.json();
      setName(data.name);
      setPhone(data.phone);
      setAddress(data.address);
      setEmail(data.email);
     
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  const handleSaveSettings = async () => {
    const updatedUser = {
      name: name,
      address: address,
      email: email,
      phone: phone
    };

    try {
      setIsLoading(true);
      const response = await fetch(`${server_url}/users/updateUser/${userDetails.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setName(updatedData.name);
        setPhone(updatedData.phone);
        setAddress(updatedData.address);
        setEmail(updatedData.email);
        console.log(updatedUser)

        Alert.alert('Success', 'Settings saved successfully', [
          {
            text: 'OK',
            onPress: async () => {
              await fetchUserDetails(); // Fetch the updated user details
              navigation.goBack({ // Pass the updated user details when navigating back
                params: {
                  updatedUser: updatedData,
                },
              });
            },
          },
        ]);
      } else {
        throw new Error('Failed to save user settings');
      }
    } catch {
      Alert.alert('Success', 'Settings saved successfully', [
        {
          text: 'OK',
          onPress: async () => {
           ;
           navigation.goBack({ // Pass the updated user details when navigating back
              params: {
                updatedUser: {
                  name,
                  address,
                  email,
                  phone,
                },
              },
            });
          },
        },
      ]);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <BackButton style={{ top: -80 }} fn={() => navigation.goBack()} />

        <View style={styles.personInfo}>
          <Text style={styles.title}>
            <FontAwesome name="user" size={18} color="black" /> Personal Information
          </Text>
          <View style={styles.group1}>
            <View style={styles.inputContainer}>
              <FontAwesome name="user-circle-o" size={16} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome name="phone" size={16} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome name="address-card-o" size={16} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={16} color="black" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
        </View>

        <View style={styles.changePassword}>
          <Text style={styles.title}>
            <FontAwesome name="lock" size={18} color="black" /> Change Password
          </Text>
          {/* Password input fields */}
        </View>

        <View style={styles.saveButton}>
          <TouchableOpacity onPress={handleSaveSettings}>
            <Text style={styles.saveButtonText}>Save Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    position: 'absolute',
    backgroundColor: '#F4F5F9',
    top: 0,
  },
  group1: {
    position: 'absolute',
    left: 0,
    width: 380,
    top: 50,
    height: 197.63,
  },
  container: {
    position: 'absolute',
    width: 396.34,
    top: 152,
    left: 15,
    height: 748,
  },
  personInfo: {
    position: 'absolute',
    left: 0,
    top: 90,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    left: 15,
    width: 350,
    height: 35,
  },
  icon: {
    color: 'gray',
    left: 10,
    marginRight: 8,
  },
  input: {
    left: 20,
    flex: 1,
  },
  saveButton: {
    position: 'absolute',
    width: 380,
    height: 60,
    top: 630,
    backgroundColor: '#6CC51D',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  changePassword: {
    position: 'absolute',
    width: 396.34,
    left: 0,
    top: 330,
    height: 259.08,
  },
});

export default AboutMe;
