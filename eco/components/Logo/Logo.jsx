import { Image } from 'react-native'
import React from 'react'

import LogoStyles from "../../styles/Logo.styles"

const Logo = () => {
  return (
    <Image source={require("../../assets/logo.png")} style={LogoStyles.container}/>
  )
}

export default Logo