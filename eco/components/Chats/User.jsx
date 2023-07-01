import { View, Text, Image, TouchableOpacity } from "react-native"

// styles imports
import styles from "../../styles/User.styles"

const User = ({ id, name, image, startConversation }) => {

  return (
    <TouchableOpacity onPress={() => startConversation(id)} style={styles.container}>
      <Image source={{uri: image}} style={styles.image}/>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  )
}

export default User