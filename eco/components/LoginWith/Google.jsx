import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native"

const Google = ({text}) => {
  return (
    <TouchableOpacity>
      <View style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center", 
        backgroundColor: "transparent", 
        height: 57.27, width: 320,
        borderWidth: 1, 
        borderRadius: 38,

        }}>
        <Image source={require("../../assets/GoogleLogo.png")} style={{marginLeft: 30}}/>
        <Text style={{marginLeft: 30, color: "black", fontFamily: "Montserrat"}}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Google