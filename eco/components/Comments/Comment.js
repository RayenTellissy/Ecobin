import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { server_url } from '../../secret';






const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    fetchComments();

    const refreshInterval = setInterval(fetchComments, 1000); // Fetch comments every 1 seconds

    return () => clearInterval(refreshInterval); // Clear the interval when the component unmounts
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${server_url}/feeds/${postId}/comments`);
      const data = await response.json();
      // console.log(data);

      if (Array.isArray(data)) {
        const commentsWithUserDetails = await Promise.all(
          data.map(async (comment) => {
            console.log(comment)
            const userResponse = await fetch(`${server_url}/users/user/${comment.userid}`);
            const userData = await userResponse.json();
            return { ...comment, username: userData.name, userImage: userData.image };
          })
        );

        setComments(commentsWithUserDetails);
      } else {
        setComments([]);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
 
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  let visibleComments = comments;
  if (!showAllComments && comments.length > 4) {
    visibleComments = comments.slice(comments.length - 4);
  }

  const remainingCommentsCount = comments.length - visibleComments.length;

  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image
        source={item.userImage ? { uri: item.userImage } : require('../../assets/avatarVide.png')}
        style={styles.profileImage}
      />
      <View style={styles.commentContent}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.commentText}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {comments.length === 0 ? (
        <Text>No comments found.</Text>
      ) : (
        <React.Fragment>
          <FlatList
            data={visibleComments.reverse()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          {remainingCommentsCount > 0 && !showAllComments && (
            <Text style={styles.showMoreText} onPress={toggleShowAllComments} >
              Show more ({remainingCommentsCount} more comments)
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
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#868889',
    // textDecorationLine: 'underline',
  },
});

export default Comments;