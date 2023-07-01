import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native"

const Facebook = ({text}) => {
  return (
    <TouchableOpacity>
      <View style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center", 
        backgroundColor: "#3B5998", 
        height: 57.27, width: 320, 
        borderRadius: 38}}>
        <Image source={require("../../assets/FacebookLogo.png")} style={{marginLeft: 35}}/>
        <Text style={{marginLeft: 45, color: "white", fontFamily: "Montserrat"}}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Facebook