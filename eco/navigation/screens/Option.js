import React, { useContext, useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { UserContext } from '../MainContainer';
import { useRoute } from '@react-navigation/native';
import { server_url } from "../../secret";

export default function OptionScreen({ navigation }) {
  const userData = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(null);
  const route = useRoute();
  
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${server_url}/users/user/${userData.id}`);
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userDetails]);

  
  const handleGuide = () => {
    navigation.navigate('Guide');
  };
  const handleRecycle = () => {
    navigation.navigate('Recycle');
  };
  
  const handleExchange = () => {
    navigation.navigate('Exchange', { userId: userData.id });
  };
  const handleFAQ = () => {
    navigation.navigate('FAQ');
  };
  const handleNearby= () => {
    navigation.navigate('Nearby', { userId: userData.id });
  };

  const handleShopping = () => {
    navigation.navigate('shopping', {  userId: userData.id, balance:userDetails.balance });
  };
  
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/nature.jpg')} style={styles.backgroundImage} />
      <View style={styles.header}>
        <Image
          source={
            userDetails?.image
              ? { uri: userDetails.image }
              : require('../../assets/avatarVide.png')
          }
          style={styles.image}
        />

        <View>
          <Text style={styles.name}>Hello, {userDetails && userDetails.name}</Text>
          <Text style={styles.subText}>Let's recycle your waste.</Text>
        </View>
      </View>

      <View >
      
      </View>

      <View style={styles.group}>
      
      <Image source={require('../../assets/vector.png')} style={styles.vector} />
      <View style={styles.balance}>
      <Text style={styles.text1}>Selection</Text>
      
      <Text style={styles.text2}>
          <FontAwesome name="dollar" size={20} color="#6CC51D" />{userDetails && userDetails.balance} ECOBIN Points
        </Text>
</View>
        <View style={styles.firstRow}>
        <TouchableOpacity onPress={handleExchange}>
        <Image source={require('../../assets/Exchange.png')} style={styles.imageOption} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRecycle}>
          <Image source={require('../../assets/Recycle(1).png')} style={styles.imageOption} />
          </TouchableOpacity>
        <TouchableOpacity onPress={handleNearby}>
          <Image source={require('../../assets/Nearby.png')} style={styles.imageOption} />
          </TouchableOpacity>
          
         
        </View>
        
        <View style={styles.secondRow}>
        <TouchableOpacity onPress={handleFAQ}>
          <Image source={require('../../assets/FAQ.png')} style={styles.imageOption}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShopping}>
            <Image source={require('../../assets/cat4.png')} style={styles.imageOption} />
          </TouchableOpacity>


          <TouchableOpacity onPress={handleGuide}>
            <Image source={require('../../assets/cat5.png')} style={styles.imageOption} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  header: {
    position: 'absolute',
    backgroundColor: 'white',
    top: '10%',
    left: '40%',
    transform: [{ translateX: -100 }],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
 text1:{
    alignItems: 'center',
    color: '#6CC51D',
    marginTop:40,
    
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  text2:{
    alignItems: 'center',
    color: '#6CC51D',
    
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  balance:{
    justifyContent: 'center',
    
    justifyContent: 'space-between',
    alignItems: 'center',
    top:-70,
    fontSize: 30,
    fontWeight: 'bold',
    
  },
  image: {
    width: 60,
    height: 60,
    borderRadius:20,
  },
  imageOption:{
    marginRight: 10,
    borderRadius: 20,
  },
  name: {
    
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  group: {
    
    alignItems: 'center',
    marginTop: 350,
    backgroundColor:'#F2F3F7',
  },
  firstRow: {
    top:-60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  secondRow: {
    marginVertical:30,
    top:-60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  vector:{
   position: 'absolute',
   top:-120,
  }
});
