import { useState } from "react"
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import axios from "axios"

// styles imports
import styles from "../../styles/MessageInput.styles"

// secret variables imports
import { server_url } from "../../secret"

const MessageInput = ({ currentUser, conversation, socket }) => {

  const [text,setText] = useState("")

  const sendMessage = async () => {
    if(text !== ""){
      const messageDetails = {
        sender: currentUser,
        conversation: conversation,
        message: text,
        created_at: new Date(Date.now())
      }
      await socket.emit("send_message", messageDetails) // emitting a send event to socket server
      await axios.post(`${server_url}/conversations/send`, messageDetails) // posting message to the database
      setText("") // resetting the text
    }
  }

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Type a message here"
        onChangeText={setText}
        value={text}
      />

      <TouchableOpacity onPress={sendMessage}>
        <Image source={require("../../assets/Send.png")} style={styles.send}/>
      </TouchableOpacity>
    </View>
  )
}

export default MessageInput