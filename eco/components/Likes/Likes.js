import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';

const Likes = ({ postId }) => {
  const [likes, setlikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlllikes, setShowAlllikes] = useState(false);
  const [count,setCount]=useState(0)

  useEffect(() => {
    fetchlikes();

    const refreshInterval = setInterval(fetchlikes, 1000); // Fetch likes every 1 seconds

    return () => clearInterval(refreshInterval); // Clear the interval when the component unmounts
  }, []);

  const fetchlikes = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/likes/post/${postId}`);
      const data = await response.json();
      console.log(  'datalikes',data);
      console.log(  'count',data.length);
      setCount(data.length)
    

      if (Array.isArray(data)) {
        const likesWithUserDetails = await Promise.all(
          data.map(async (like) => {
            const userResponse = await fetch(`http://10.0.2.2:3000/users/${like.userid}`);
            const userData = await userResponse.json();
            return { ...like, username: userData.name, userImage: userData.image };
          })
        );

        setlikes(likesWithUserDetails);

      } else {
        setlikes([]);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  const toggleShowAlllikes = () => {
    setShowAlllikes(!showAlllikes);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  let visiblelikes = likes;
  if (!showAlllikes && likes.length > 4) {
    visiblelikes = likes.slice(likes.length - 4);
  }

  const remaininglikesCount = likes.length - visiblelikes.length;
  
  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image
        source={item.userImage ? { uri: item.userImage } : require('../../assets/avatarVide.png')}
        style={styles.profileImage}
      />
      <View style={styles.commentContent}>
        <Text style={styles.username}>{item.username}</Text>
       
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      {likes.length === 0 ? (
        <Text>No Likes found.</Text>
      ) : (
        <React.Fragment>
          <FlatList
            data={visiblelikes.reverse()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          {remaininglikesCount > 0 && !showAlllikes && (
            <Text style={styles.showMoreText} onPress={toggleShowAlllikes}>
              Show more ({remaininglikesCount} more likes)
            </Text>
          )}
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
  },
  showMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Likes;

