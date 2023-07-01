import { useState } from "react"
import { View, Text, SafeAreaView, TextInput, Alert } from "react-native"
import axios from "axios"
import { useNavigation } from "@react-navigation/native"

// styles imports
import styles from "../../styles/ForgotPassword.styles"
import AuthButton from "../../components/AuthButton/AuthButton"

// secret variables file
import { server_url } from "../../secret"

const ForgotPassword = () => {

  const [email,setEmail] = useState("")
  const navigation = useNavigation()

  const handleSubmit = async () => {
    if(email !== ""){
      const response = await axios.post(`${server_url}/users/reset/${email}`)

      if(response.data === "auth/invalid-email"){
        return Alert.alert("Reset Error", "Invalid email.")
      }
      
      if(response.data === "auth/user-not-found"){
        return Alert.alert("Reset Error", "Email doesn't exist.")
      }

      Alert.alert("Reset Sent", "Please check your email for a reset link.")

      navigation.navigate("Login")
    }
  }

  return (
    <SafeAreaView style={{flex: 1, marginTop: 50}}>

      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          placeholder="Email address"
          style={styles.input}
          onChangeText={setEmail}
        />
        <AuthButton text="Submit" fn={handleSubmit} style={styles.button}/>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword