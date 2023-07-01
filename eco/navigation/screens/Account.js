import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { UserContext } from '../MainContainer';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { app, storage } from '../../firebase/FirebaseApp';
import { server_url } from '../../secret';

import modal from '../../styles/modalBackground.styles';
import SpinnerStyles from '../../styles/ActivityIndicator.styles';

const ProfileDetails = () => {
  const [imageUrl, setImageUrl] = useState(''); // image url that will be retrieved from firebase storage after uploading
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateImage,setUpdateImage] = useState(false)
  const userData = useContext(UserContext);
  // const [updatedUser, setUpdatedUser] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
 

  const pickImage = async () => {
    // asking for the user's permission to access his image library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Access Denied', 'Library access revoked.');
    }

    // allowing the user to pick an image as a profile picture
    var result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.cancelled) {
      uploadImage(result.uri); // invoking upload function to upload image to firebase storage
    }
 
  };

  // this function sends a post request to the server to upload the image picked by the user
  const uploadImage = async (imageUri) => {
    setIsLoading(true);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
       
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageUri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, `profile_pictures/${uuidv4()}`);
    const result = await uploadBytes(fileRef, blob);

    blob.close();

    const url = await getDownloadURL(fileRef);
    setImageUrl(url);
    const id = await AsyncStorage.getItem("currentUser")

    await axios.put(`${server_url}/users/updateUser/${id}`,{
      id: id,
      image: imageUrl,
    })

    setUpdateImage(true)

    setIsLoading(false);
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${server_url}/users/user/${userData.id}`);
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };





  const handleAboutMePress = () => {
    navigation.navigate('AboutMe', {
      userDetails: {
        id: userDetails?.id,
      },
      // Add the updatedUser parameter
    });
  };




  const handleSignOut = () => {
    setUserDetails(null);

    navigation.navigate('Home');
  };



  useEffect(() => {
    fetchUserDetails();
  }, [userDetails]);

  const handleTransaction = () => {
    navigation.navigate('Transaction', {
      userDetails: {
        id: userDetails?.id,
      },
      // Add the updatedUser parameter
    });
  };


  return (
    <View style={styles.container}>
      <View>
        <View style={styles.profileImageContainer}>
        <Image
          source={
            updateImage // Use 'updateImage' state instead of 'imageUrl'
              ? { uri: imageUrl }
              : userDetails?.image
              ? { uri: userDetails.image }
              : require('../../assets/avatarVide.png')
          }
          style={styles.profileImage}
        />
          <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
            <FontAwesome name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userDetails?.name}</Text>
        <Text style={styles.bio}>
          <FontAwesome name="dollar" size={20} color="#6CC51D" /> {userDetails?.balance} ECOBIN
          Points
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <MaterialIcons name="person" size={24} color="gray" />
          <Text style={styles.infoTitle}>About Me</Text>
          <TouchableOpacity style={styles.infoButton} onPress={handleAboutMePress}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <MaterialIcons name="attach-money" size={24} color="gray" />
          <Text style={styles.infoTitle}>transaction</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={handleTransaction}
          >
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <MaterialIcons name="shopping-cart" size={24} color="gray" />
          <Text style={styles.infoTitle}>My Orders</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => console.log('onPressMyOrders')}
          >
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <MaterialIcons name="notifications" size={24} color="gray" />
          <Text style={styles.infoTitle}>Notifications</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => console.log('onPressNotifications')}
          >
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.signOutContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Feather style={styles.signOutButtonText} name="log-out" size={20} color="black" />
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 430,
    backgroundColor: '#F2F3F7',
  },
  profileImageContainer: {
    top: 50,
    position: 'relative',
    width: 114,
    height: 117,
    alignSelf: 'center',
    marginTop: 16,
  },
  profileImage: {
    borderRadius: 50,
    width: 114,
    height: 117,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#28B446',
    borderRadius: 12,
    padding: 4,
  },
  name: {
    top: 60,
    alignSelf: 'center',
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
  },
  bio: {
    top: 80,
    alignSelf: 'center',
    marginTop: 8,
    color: '#6CC51D',
    fontSize: 20,
  },
  infoContainer: {
    position: 'absolute',
    top: 347,
    backgroundColor: 'white',
    width: 430,
    height: 200,
  },
  info: {
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 10,
    left: 0,
  },
  infoTitle: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '600',
  },
  infoButton: {
    width: 50,
    marginLeft: 8,
  },
  signOutContainer: {
    position: 'absolute',
    width: 430,
    top: 610,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 8,
  },
  signOutButtonText: {
    left: 20,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default ProfileDetails;
