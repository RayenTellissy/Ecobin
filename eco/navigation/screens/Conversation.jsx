import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native"
import io from "socket.io-client"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// secret variables file import
import { server_url, socket_url } from "../../secret"

// styles imports
import styles from "../../styles/Conversation.styles"

// common components imports
import Message from "../../components/Chats/Message"
import MessageInput from "../../components/Chats/MessageInput"
import Spinner from "../../components/Spinner/Spinner"

const Conversation = (props) => {

  const socket = io.connect(socket_url)
  const { conversation, name, image } = props.route.params
  const [messages,setMessages] = useState([])
  const [currentUser,setCurrentUser] = useState({})
  const navigation = useNavigation()
  const scrollViewRef = useRef()
  const [isLoading,setIsLoading] = useState(false)
  const [fetched,setFetched] = useState(false)

  useEffect(() => {
    socket.emit("join_room", conversation)
    getMessages() // message fetching function getting invoked when user joins the socket conversation
  },[])

  useEffect(() => {
    // watching for message with socket to re-render messages if a new message gets received
    socket.on("receive_message", data => {
      setMessages(prevMessages => [...prevMessages, data]) // adding the new message to the messages array
    })
  },[socket])

  // function that fetched all the messages of a conversation that user pressed on
  const getMessages = async () => {

    setCurrentUser(JSON.parse(await AsyncStorage.getItem("currentUser")))
    
    setIsLoading(true)

    const response = await axios.get(`${server_url}/conversations/getMessages/${conversation}`) // fetching messages from database
    setMessages(response.data)

    setFetched(true)
    setIsLoading(false)
  }

  return(
    <SafeAreaView style={{flex: 1, marginTop: 50}}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Contacts")}>
          <Image source={require("../../assets/ChatBack.png")}/>
        </TouchableOpacity>
        <Image source={{uri: image}} style={styles.image}/>
        <Text style={styles.name}>{name}</Text>
      </View>

      <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        {messages.map((e,i) => {
          return <Message key={i} currentUser={currentUser.id} sender={e.sender} message={e.message} time={e.created_at}/>
        })}
        {fetched && !messages.length && <Text style={styles.noMessages}>Say Hi to <Text style={styles.noMessageName}>{name}</Text></Text>}
      </ScrollView>

      <View style={styles.inputContainer}>
        <MessageInput currentUser={currentUser.id} conversation={conversation} socket={socket}/>
      </View>

      {isLoading && <Spinner/>}

    </SafeAreaView>
  )

}

export default Conversation