const supabase = require("../supabase/Supabase_Connect");

const getOneFeed = async (req, res) => {
  const { id } = req.params;

  try {
    const feed = await supabase
      .from('Feeds')
      .select('*')
      .eq('id', id)
      .single();

    if (feed.error) {
      throw new Error(feed.error.message);
    }

    res.status(200).json([feed]); // Wrap the feed object in an array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllComments = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('postid', id);

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json(comments || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






const getAllFeeds = async (req, res) => {
  try {
    const { data: feeds, error } = await supabase.from('Feeds').select('*');

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json(feeds || []); // Return an empty array if feeds is null
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const postComment = async (req, res) => {
  const { id } = req.params;
  const { userId, commentText } = req.body;

  try {
    // Create a new comment object with the required fields
    const newComment = {
      postid: id,
      userid: userId,
      content: commentText,
    };

    // Insert the new comment into the database
    const { data: comment, error } = await supabase
      .from('comments')
      .insert(newComment);

    if (error) {
      throw new Error(error.message);
    }

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const postLike = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  console.log('Received postLike request with id:', id);
  console.log('Received postLike request with userId:', userId);

  try {
    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'userId is required in the request body' });
    }

    // Check if userId is a valid non-empty string
    if (typeof userId !== 'string' || userId.trim() === '') {
      return res.status(400).json({ error: 'userId must be a non-empty string' });
    }

    // Create a new like object with the required fields
    const newLike = {
      postid: id,
      userid: userId,
    };

    console.log('Inserting new like:', newLike);

    // Insert the new like into the database
    const { data: like, error } = await supabase
      .from('likes')
      .insert(newLike)
      .single();

    if (error) {
      console.error(error); // Log the error to the console for debugging
      throw new Error(error.message);
    }

    console.log('Inserted like:', like);

    res.status(201).json(like);
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).json({ error: error.message });
  }
};






const getAllLikesByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    if (!postId) {
      throw new Error('Post ID is required');
    }

    const { data: likes, error } = await supabase
      .from('likes')
      .select('*')
      .eq('postid', postId);

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json(likes || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLike = async (req, res) => {
  const { postId, userId } = req.params;

  console.log('Received deleteLike request with postId:', postId);
  console.log('Received deleteLike request with userId:', userId);

  try {
    // Delete the like from the database
    const { data: likes, error } = await supabase
      .from('likes')
      .delete()
      .match({ postid: postId, userid: userId });

    if (error) {
      console.error(error); // Log the error to the console for debugging
      throw new Error(error.message);
    }

    console.log('Deleted like:', likes);

    res.status(200).json({ message: 'Like deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).json({ error: error.message });
  }
};

const createFeed = async (req, res) => {
  try {
    const { Title, Subtitle, Image, Content, date, likes } = req.body;

    // Insert the new feed into the "Feeds" table
    const { data: feed, error } = await supabase
      .from('Feeds')
      .insert({ Title, Subtitle, Image, Content, date, likes })
      .single();

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json(feed);
    console.log("psted", res)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






module.exports = { getOneFeed, getAllFeeds, postComment, getAllComments, postLike, deleteLike, getAllLikesByPostId,createFeed  }