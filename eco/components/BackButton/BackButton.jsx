import React from "react";
import { Image, TouchableOpacity } from "react-native"

const BackButton = ({ fn, style, auth }) => {
  return (
    <TouchableOpacity onPress={fn}>
      {auth ?

      <Image source={require("../../assets/whiteback.png")} style={style}/>
      
      :

      <Image source={require("../../assets/BackButton.png")} style={style}/>

      }
    </TouchableOpacity>
  )
}

export default BackButton