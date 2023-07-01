import { Image } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <Image 
      source={require("../../assets/logo1.png")}
      style={{width: 290, height: 65}}
    />
  )
}

export default Logo