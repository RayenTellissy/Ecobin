import React from "react"
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

const SignupSuccess = () => {

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={{
        backgroundColor: "white",
        width: 279,
        height: 328,
        borderRadius: 29,
        alignItems: "center",
      }}>
        <Text style={{color: "#09E4AF", fontSize: 20, fontFamily: "MontserratBold", marginTop: 30}}>Sign Up Success</Text>
        <Image source={require("../../assets/Checkmark.png")} style={{marginTop: 30}}/>
        <TouchableOpacity 
          style={{
            borderColor: "#6CB28E",
            borderWidth: 2,
            borderRadius: 11,
            width: 218,
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 45
          }}
          onPress={() => navigation.navigate("Login")}
        >
        <Text style={{
          fontFamily: "MontserratBold",
          color: "#6CB28E",
          fontSize: 20
        }}
        >
          Sign In
        </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default SignupSuccess