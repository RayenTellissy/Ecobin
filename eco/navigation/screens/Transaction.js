import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { server_url } from '../../secret';
import axios from 'axios'; // Import axios for making HTTP requests
import { useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';

export default function TransactionScreen({ navigation }) {



  const route = useRoute();
  const { userDetails } = route.params;
  const [code, setCode] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserBalance = async () => {
    try {
      const response = await axios.get(`${server_url}/balance/${userDetails.id}`);
      const { balance } = response.data;
      setUserBalance(balance);
    } catch (error) {
      console.log('Error fetching user balance:', error);
    }
  };





  useEffect(() => {
    fetchUserBalance();
  }, []);




  const handleCodeChange = (value) => {
    setCode(value);
  };
console.log(userDetails.id)
  
  const handleSendCode = async (code) => {
    try {
      // Perform the necessary action with the code
      console.log('Sending code:', code);
      setIsLoading(true); // Start the loading state
      // Send the code to the server for confirmation
      const response = await axios.post(`http://10.0.2.2:3000/codes/users/${userDetails.id}/purchase`, {
        code: code,
      });
      console.log(response.data)
      Alert.alert('Purchase Confirmed', 'Your order has been confirmed.', [{ text: 'Done', },
    ]);

    setIsLoading(false); // End the loading state

      const { balance } = response.data;
      console.log(balance)
      setUserBalance(balance);

       // Delete the code from the backend
    await axios.delete(`http://10.0.2.2:3000/codes/code/${code}`);

      // Clear the input field
      setCode('');
    } catch (error) {
      // Alert.alert('Purchase failed', 'Your code is not found ', [{ text: 'Done' }]);
      console.log('Error sending code:', error);
    }
  };


 

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/ciel.jpg')} style={styles.vector} />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={styles.headerIcon} name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>Transaction</Text>
      </View>

      <View style={styles.container2}>
        <Text style={styles.text}>
          Go to nearby recycling center & process affiliated with
          <Text style={{ color: '#6CC51D' }}> EcoBin </Text>and write your code.
        </Text>
     
      </View>
      <View style={styles.container3}>
      <TextInput
          style={styles.input}
          placeholder="Enter your code"
          value={code}
          onChangeText={handleCodeChange}
        />
        
        </View>
        <View style={styles.container4}>
      {/* Your other components */}
      <TouchableOpacity style={styles.button} onPress={() => handleSendCode(code)}>


        <Text style={styles.buttonText}>Send your code</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}


const styles = StyleSheet.create({
  vector: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  headerContainer: {
    width: '100%',
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
    // top: -350,
  },
  headerIcon: {
    left: -100,
  },
  container: {
    // backgroundColor:'white',
    width: '100%',
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
   
    top: 50,
  },
  container2: {
    borderWidth: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 25,
    marginTop:50,
    // top: -300,
    borderColor: 'gray',
  },
  container3:{
   
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 60,
    marginTop:280,
  },
  title: {
    color: '#2DCC70',
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    marginTop:10,
    width: '100%',
    height: 55,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  container4:{
    width:'50%',
   
    flex: 1,
    borderRadius: 60,
    marginTop:300,
    top:-190
  },
  button: {
    width:'100%',
    backgroundColor: '#6CC51D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
