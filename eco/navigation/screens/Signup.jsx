import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, Alert, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CheckBox from "@react-native-community/checkbox" // TODO: add a checkbox
import AsyncStorage from "@react-native-async-storage/async-storage";

// common components imports
import InputField from "../../components/InputField/InputField";
import BackButton from "../../components/BackButton/BackButton";
import AuthButton from "../../components/AuthButton/AuthButton";
import LogoBackground from "../../components/Logo/LogoBackground";
import Spinner from "../../components/Spinner/Spinner";

// secret file import
import { server_url } from "../../secret"; 

// styles imports
import ConfirmSignup from "./ConfirmSignup";
import Logo from "../../components/Logo/Logo1";
import styles from "../../styles/Signup.styles"

const Signup = () => {

  const navigation = useNavigation()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isChecked,setIsChecked] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [done,setDone] = useState(false)
  const [hidden,setHidden] = useState(true)
  const regexpName = /[a-z]/gi

  const handleSubmit = async () => {

    if(name.length < 5 || email.len)

    setIsLoading(true)

    // sending an http request to the server to create the account
    const response = await axios.post(`${server_url}/users/signup`, {
      email: email,
      password: password,
      name: name,
    })

    // alert if name format is incorrect
    if(!regexpName.test(name)){
      Alert.alert("Signup Failed", "Please provide a correct name.")
    }
    
    // alert when email format is not correct
    else if(response.data === "auth/invalid-email"){
      Alert.alert("Signup Failed", "Please provide a correct email format.")
    }

    // if the user didn't write a password he will get an alert
    else if(response.data === "auth/missing-password"){
      Alert.alert("Signup Failed", "Please provide a password.")
    }

    // alert when password written is weak
    else if(response.data === "auth/weak-password"){
      Alert.alert("Signup Failed", "Please provide a stronger password.")
    }
    
    else if(response.data === "auth/email-already-in-use"){
      Alert.alert("Signup Failed", "This email is already in use.")
    }
    
    else{
      setDone(true) // changes a state to show the sign up success modal
      await AsyncStorage.setItem("currentUser", response.data)
    }

    setIsLoading(false) // hiding the ActivityIndicator (Spinner) after the data loads

  }

  return (
    <SafeAreaView>
      {!done ?
      
      <>
        <View style={{marginTop: 20}}>

          <LogoBackground signup={true}/>

          <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 25}}>
            <BackButton fn={() => navigation.navigate("Home")} style={{marginRight: 270, top: 30}} auth={true}/>

            <View style={{marginTop: 70}}>
              <Logo/>
              <InputField placeholder="Full Name" fn={setName} styling={{marginTop: 120}}/>
              <InputField placeholder="Email address" fn={setEmail}/>
              <View>
                <InputField placeholder="Password" fn={setPassword} isPassword={hidden}/>
                <TouchableOpacity onPress={() => setHidden(!hidden)} style={{position: "absolute", top: 40, right: 20}}>
                  <Image source={require("../../assets/ShowPassword.png")}/>
                </TouchableOpacity>
              </View>
              <AuthButton text="Sign Up" fn={handleSubmit} style={styles.auth}/>
            </View>

          </View>

        </View>

        {isLoading && <Spinner/>}

      </>

    :

    <ConfirmSignup/>

    }
          
    </SafeAreaView>
  )
}

export default Signup