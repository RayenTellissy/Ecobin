import { Text, View, TextInput, Image } from "react-native"

const TextInputWithImage = ({ placeholder, image, style, fn }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center"}}>
      <TextInput
        onChangeText={fn}
        placeholder={placeholder}
        style={{paddingLeft: 40, ...style}}
      />
      <Image source={image} style={{ left: 25, position: "absolute"}}/>
    </View>
  )
}

export default TextInputWithImage