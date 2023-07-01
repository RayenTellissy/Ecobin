import { View, Text, Image, TouchableOpacity } from "react-native"
import moment from "moment/moment"
import { useNavigation } from "@react-navigation/native"

import styles from "../../styles/Contact.styles"

const Contact = ({ conversation, image, name, message, time }) => {

  const history = moment(time).fromNow() // time indicator for how old the latest message
  const navigation = useNavigation()
  
  const handleClick = () => {
    navigation.navigate("Conversation", {
      conversation: conversation,
      name: name,
      image: image
    })
  }

  return (
    <TouchableOpacity style={{display: "flex", flexDirection: "row", borderBottomColor: "#DADADA", borderBottomWidth: 1}} onPress={handleClick}>

      <View>
        <Image source={{uri: image}} style={styles.image}/>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message} numberOfLines={1}>{message}</Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.time} numberOfLines={1}>{history}</Text>
      </View>

    </TouchableOpacity>
  )
}

export default Contact