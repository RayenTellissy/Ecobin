import { View, Text } from "react-native"
import moment from "moment/moment"

// styles imports
import { currentUserStyles, otherUserStyles } from "../../styles/Message.styles"

const Message = ({ currentUser, sender, message, time }) => {

  const newTime = moment(time).format("LT") // changing the time format to make it readable and user-friendly
  const styles = currentUser === sender ? currentUserStyles : otherUserStyles

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.time}>{newTime}</Text>
    </View>
  )
}

export default Message