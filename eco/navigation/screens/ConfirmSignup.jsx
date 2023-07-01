import React, { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Alert } from "react-native"
import * as ImagePicker from 'expo-image-picker'
import axios from "axios"
import { v4 as uuidv4 } from "uuid";
import 'react-native-get-random-values';
import { uploadBytes, getDownloadURL, ref } from "firebase/storage"
import AsyncStorage from "@react-native-async-storage/async-storage";

import { app, storage } from "../../firebase/FirebaseApp"
import Camera from "../../components/Camera/Camera";
import InputField from "../../components/InputField/InputField"
import AuthButton from "../../components/AuthButton/AuthButton"
import SignupSuccess from "../../components/SignupSuccess/SignupSuccess"
import Spinner from "../../components/Spinner/Spinner";

// styles imports
import modal from "../../styles/modalBackground.styles"

// secret variables imports
import { server_url } from "../../secret";

// this function will let the user pick an image from his phone to upload as a profile picture
const ConfirmSignup = () => {

  //2nd phase of signing up
  const [imageUrl,setImageUrl] = useState("") // image url that will be retrieved from firebase storage after uploading
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")
  const [selected,setSelected] = useState("basic") // account role that user selected
  const [isLoading,setIsLoading] = useState(false)
  const [signupSuccess,setSignupSuccess] = useState(false)

  const pickImage = async () => {

    // asking for the user's permission to access his image library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(status !== "granted"){
      Alert.alert("Access Denied", "Library access revoked.")
    }

    // allowing the user pick an image as a profile picture
    var result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 0.2
    })

    if (!result.canceled) {
      uploadImage(result.assets[0].uri) // invoking upload function to upload image to firebase storage
    }

  }

  // this function sends a post request to the server to upload the image picked by the user
  const uploadImage = async (imageUri) => {

    setIsLoading(true)

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        console.log(e)
        reject(new TypeError("Network request failed"))
      }
      xhr.responseType = "blob"
      xhr.open("GET", imageUri, true)
      xhr.send(null)
    })
  
    const fileRef = ref(storage, `profile_pictures/${uuidv4()}`)
    const result = await uploadBytes(fileRef, blob)

    blob.close()

    const url = await getDownloadURL(fileRef)
    setImageUrl(url)

    setIsLoading(false)

  }

  const handleSubmit = async () => {

    // returning alert if user did not write needed details
    if(imageUrl === ""){
      return Alert.alert("Signup Failed", "Please choose an image.")
    }
    else if(phone.length < 6){
      return Alert.alert("Signup Failed", "Please type a phone number.")
    }
    else if(address.length === 0){
      return Alert.alert("Signup Failed", "Please type an address.")
    }
    

    const id = await AsyncStorage.getItem("currentUser")

    setIsLoading(true)

    await axios.put(`${server_url}/users/nextSignup`,{
      id: id,
      image: imageUrl,
      phone: phone,
      address: address,
      role: selected
    })

    setIsLoading(false)
    setSignupSuccess(true) // showing sign up success modal
  }

  return (
    <SafeAreaView>
      <View style={{justifyContent: "center", alignItems: "center", marginTop: 50}}>
          <Camera fn={pickImage} image={imageUrl!== null ? imageUrl : null}/>

          <InputField fn={setPhone} placeholder="Phone"/>
          <InputField fn={setAddress} placeholder="Address"/>
          
          <Text style={{fontFamily: "MontserratRegular", fontSize: 18, color: "#A1A4B2", marginTop: 20, marginBottom: 20}}>select an account type</Text>
          
          <TouchableOpacity onPress={() => setSelected("basic")}>
            <View style={selected === "basic" ? styles.selected : styles.unselected}>
              <Text style={{fontFamily: "MontserratRegular", fontSize: 18, color: "white"}}>Basic</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelected("org")}>
            <View style={selected === "org" ? styles.selected : styles.unselected}>
              <Text style={{fontFamily: "MontserratRegular", fontSize: 18, color: "white"}}>Organization</Text>
            </View>
          </TouchableOpacity>

          <AuthButton text="Sign Up" fn={handleSubmit} style={{
              marginBottom: 150,
              width: 300, 
              height: 50.53,
              borderRadius: 38,
            }}/>

      </View>

      {signupSuccess && 
        <>
          <View style={modal.overlay}></View>
          <View style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
          }}
          >
            <SignupSuccess/>
          </View>
        </>
      }

      {isLoading && <Spinner/>}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  selected: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 190,
    height: 41.3,
    borderRadius: 11,
    backgroundColor: "#09E4AF",
    marginBottom: 20
  },
  unselected: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    height: 36.96,
    borderRadius: 11,
    backgroundColor: "#555555",
    marginBottom: 20
  }
})

export default ConfirmSignup