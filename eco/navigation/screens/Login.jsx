import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, Alert, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

// common components imports
import InputField from "../../components/InputField/InputField";
import BackButton from "../../components/BackButton/BackButton";
import AuthButton from "../../components/AuthButton/AuthButton";
import Logo from "../../components/Logo/Logo1";
import LogoBackground from "../../components/Logo/LogoBackground";
import Spinner from "../../components/Spinner/Spinner";

// secret variables imports
import { server_url } from "../../secret";

const Login = () => {

  const navigation = useNavigation()
  const [email,setEmail] = useState("")  // the email the user wrote in the text field
  const [password,setPassword] = useState("") // the email the user wrote in the text field
  const [isLoading,setIsLoading] = useState(false) // loading tracker to activate the activityIndicator when app is loading

  // hiding header
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
},[navigation])


  // login function to set the user's id and token in the localstorage
  const handleSubmit = async () => {
    // regular expressions to check inputs with
    const regexpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // email format checking
    if(!regexpEmail.test(email)){
      return Alert.alert("Login Failed","Please provide a correct email format.")
    }
    
    setIsLoading(true) // Displaying the ActivityIndicator (Spinner)

    // sending an http request to the server to return an id and a token

    const response = await axios.post(`${server_url}/users/login`,{email: email, password: password})
    console.log(response.data)


    // alert if email written is not found in the database
    if(response.data === "auth/user-not-found"){
      Alert.alert("Login Failed","Email doesn't exist.")
    }

    // alert if password written is incorrect
    else if(response.data === "auth/wrong-password"){
      Alert.alert("Login Failed", "Wrong Password.")
    }
   
    else{
      await AsyncStorage.setItem("currentUser",JSON.stringify(response.data)) // storing the id and token in the local storage

      navigation.navigate("MainContainer",{ userData: response.data }) // navigates to Newspage and send it to MainContainer component
      console.log(userData)

    }

    setIsLoading(false) // hiding the ActivityIndicator (Spinner) after the data loads
  }

  return (
    <SafeAreaView>

      <View style={{marginTop: 20}}>

        <LogoBackground login={true}/>

        <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 25}}>

          <BackButton fn={() => navigation.navigate("Home")} style={{marginRight: 270, top: 30}} auth={true}/>

          <View style={{marginTop: 70}}>
            <Logo/>
            <InputField placeholder="Email address" fn={setEmail} styling={{marginTop: 150}}/>
            <InputField placeholder="Password" fn={setPassword} isPassword={true} styling={{marginBottom: 30}}/>
            <AuthButton text="Sign In" fn={handleSubmit} style={{marginTop: 40,width: 300, height: 50.53,borderRadius: 38,}}/>

            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={{marginBottom: 150, marginTop: 10, alignSelf: "center"}}>
            <Text style={{fontFamily: "MontserratRegular", color: "#A1A4B2"}}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

      {isLoading && <Spinner/>}

    </SafeAreaView>
  )
}

export default Login