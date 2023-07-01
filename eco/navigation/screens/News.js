import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../MainContainer';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Comments from '../../components/Comments/Comment';
import Likes from '../../components/like/Likes';
import { server_url } from '../../secret';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function News() {

 
  const userData = useContext(UserContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showlike, setShowlike] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [postId, setPostId] = useState("");
  const [likeStatus, setLikeStatus] = useState({});
  
  useEffect(() => {
    fetchData();
    fetchUserDetails();
   
  }, []);
  



  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${server_url}/users/user/${userData.id}`);
      const data = await response.json();
      // console.log('User details:', data);
      setUserDetails(data);
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${server_url}/feeds`);
    
      setData(response.data);

      const initialLikeStatus = {};
      response.data.forEach((post) => {
        initialLikeStatus[post.id] = false;
      });
      setLikeStatus(initialLikeStatus);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (id) => {
    setShow(true);
    setPostId(id);
  };
  const handleCloselike = () => {
    setShowlike(false);
  };

  const handleShowlike = (id) => {
    setShowlike(true);
    setPostId(id);
  };
 
 
  const handleLike = async (postId) => {
    try {
      // Check if the post is already liked
      if (likeStatus[postId]) {
        // Dislike the post
        await axios.delete(`http://10.0.2.2:3000/likes/${postId}/${userData.id}`);
      } else {
        // Like the post
        await axios.post(`http://10.0.2.2:3000/feeds/${postId}/postLike`, { userId: userData.id });
      }

      // Toggle the like status
      setLikeStatus((prevStatus) => ({
        ...prevStatus,
        [postId]: !prevStatus[postId],
      }));
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };
  
  
  const handlePostComment = async (postId) => {
    setCommentText("");
    try {
      const response = await fetch(`${server_url}/feeds/${postId}/postComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userData.id, commentText }),
      });

      if (!response.ok) {
       


   
        throw new Error('Error posting comment');
      }

      const data = await response.json();
      console.log('Comment posted successfully:', data);
      // Optionally, you can show a success message or navigate to another screen
      
    } catch (error) {
      console.error('Error posting comment:', error);
      // Show an error message to the user
      Alert.alert('Error posting comment', error.message);
    }
  };

  return (
    <View style={styles.container}>
    
      <StatusBar style="auto" />
      <Image source={require('../../assets/logo.png')} style={styles.logoImage} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
       
       

        <View style={styles.newsContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.newsItem}>
              <View style={styles.newsInfo}>
                <Text style={styles.newsTitle}>{item.Title}</Text>
                <Text style={styles.newsSubtitle}>{item.Subtitle}</Text>
                <Text style={styles.newsDate}>{item.date}</Text>
              </View>

              <Image source={{ uri: item.Image }} style={styles.newsImage} />

              <View style={styles.actionsContainer}>
              <View style={styles.commentContainer}>
  <Pressable onPress={() => handleShow(item.id)}  >
    <MaterialCommunityIcons name="comment" size={24} color="black" />
  </Pressable>
</View>

<TouchableOpacity onPress={() => handleLike(item.id)} style={styles.like}>
              <MaterialCommunityIcons
                name={likeStatus[item.id] ? 'thumb-up' : 'thumb-up-outline'}
                size={24}

                color={likeStatus[item.id] ? '#6CC51D' : 'black'}

              />
              <Text style={styles.likeText}>{likeStatus[item.id] ? 'Liked' : 'Like'}</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => handleShowlike(item.id)}>

                  
                  <Image source={require('../../assets/vue.png')} style={styles.vue} />

                </TouchableOpacity>
               
              </View>
            </View>
          ))}
        </View>

        <Modal visible={show} onRequestClose={handleClose} transparent={true}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Comments postId={postId} />
      <View style={styles.comment}>
        <Image
          source={userDetails?.image ? { uri: userDetails?.image } : require('../../assets/avatarVide.png')}
          style={styles.profileImage}
        />
        <Text style={styles.commentText}>{userDetails?.name}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your comment"
          value={commentText}
          onChangeText={setCommentText}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.postButton} onPress={() => handlePostComment(postId)}>
          <Text style={[styles.buttonText, styles.postButtonText]}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

        <Modal visible={showlike} onRequestClose={handleCloselike} transparent={true}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={handleCloselike} style={styles.closeButton}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Likes postId={postId} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloselike}>
          
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  comment:{
    marginBottom: 10,
    left:0,

  }
  ,
  vue:{ top: -3,},
  like: {
    top: -4,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  likeText: {
    marginLeft: 5,
    color: '#6CC51D', // Facebook blue color
    fontWeight: 'bold',
  },
  
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  
  },
  logoImage: {
    width: '100%',
    height: 90,
    backgroundColor: '#9CFFE7',
  },
  newsContainer: {
    top: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  newsItem: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: windowWidth * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newsImage: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  newsInfo: {
    marginTop: 10,
    marginLeft: 20,
  },
  newsDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 20,
    marginTop: 10,
    color: '#808080',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  newsSubtitle: {
    fontSize: 14,
    color: '#808080',
  },
  actionsContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginTop: 10,
  },
  commentIcon: {
    marginRight: 10,
    width: 32,
    height: 32,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: windowWidth * 0.9,
    height: windowHeight * 0.7,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
  postButton: {

    backgroundColor: '#6CC51D',

    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileImage: {
    top: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  commentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    left: 250,
  },
  commentText: {
    top:10,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    
    width: 380,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  modalHeader: {
    alignItems: 'flex-end',
  },
});



export default News;