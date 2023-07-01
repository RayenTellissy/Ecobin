import React from "react"
import { View, TouchableOpacity, Image } from "react-native"

const Camera = ({fn,image}) => {
  
  return(
    <View>
      {image ? 
        <Image source={{uri: image}} style={{width: 208, height: 208, borderRadius: 100}}/>
      :
        <Image source={require("../../assets/ImageContainer.png")}/>
      
      }

      <TouchableOpacity style={{
        position: "absolute",
        top: 150,
        left: 140
      }}
        onPress={fn}
      >
        <Image source={require("../../assets/camera.png")}/>
      </TouchableOpacity>
    </View>
  )
}

export default Camera