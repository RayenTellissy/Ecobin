import { useState } from "react"
import { View, Text, SafeAreaView, TextInput, Alert } from "react-native"
import axios from "axios"

// styles imports
import styles from "../../styles/ChangePassword.styles"

// common components imports
import AuthButton from "../../components/AuthButton/AuthButton"
import Spinner from "../../components/Spinner/Spinner"

// secret variables imports
import { server_url } from "../../secret"

const ChangePassword = () => {

  const [currentPassword,setCurrentPassword] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [isLoading,setIsLoading] = useState(false)

  const handleSubmit = async () => {

    // if user didn't write anything it will return an alert to inform him
    if(currentPassword === "" || newPassword === ""){
      return Alert.alert("Error", "Please fill all the inputs.")
    }

    // if the user has written the same password for the 2 fields this will return an alert
    if(currentPassword === newPassword){
      return Alert.alert("Error", "You have written the same password.")
    }

    setIsLoading(true)

    // sending http request to modify password
    const response = await axios.post(`${server_url}/users/changePassword`,{
      currentPassword: currentPassword,
      newPassword: newPassword
    })
    
    // successful operation's alert
    if(response.data === "password updated."){
      Alert.alert("Success", "Password has been successfully changed.")
    }

    // if current password is incorrect this will return an alert
    else if(response.data === "auth/wrong-password"){
      Alert.alert("Error", "Wrong Password.")
    }

    // if password is weak this will return an alert
    else if(response.data === "auth/weak-password"){
      Alert.alert("Error", "Weak Password.")
    }

    setIsLoading(false)

  }

  return(
    <SafeAreaView style={{flex: 1, marginTop: 50}}>

      <View style={styles.container}>

        <Text style={styles.title}>Change Password</Text>

        <TextInput
          placeholder="Current password"
          onChangeText={setCurrentPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          placeholder="New password"
          onChangeText={setNewPassword}
          secureTextEntry={true}
          style={styles.input}
        />

        <AuthButton text="Submit" fn={handleSubmit} style={styles.button}/>
        
      </View>

      {isLoading && <Spinner/>}
      
    </SafeAreaView>
  )
}

export default ChangePassword