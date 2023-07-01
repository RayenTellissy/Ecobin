import React from "react";
import { TextInput } from "react-native"

const InputField = ({fn,placeholder,isPassword,styling}) => {
  
  return (
    <TextInput 
      placeholder={placeholder}
      onChangeText={fn}
      secureTextEntry={isPassword}
      style={{
        marginTop: 20,
        backgroundColor: "#ECECEC",
        borderRadius: 15, 
        width: 300, 
        height: 50.53,
        paddingLeft: 20,
        fontFamily: "MontserratMedium",
        ...styling
      }}
    />
  )
}

export default InputField