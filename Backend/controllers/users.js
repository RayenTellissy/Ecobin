const { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider
} = require("firebase/auth")

const { app, storage } = require("../firebase/FirebaseApp")
const supabase = require("../supabase/Supabase_Connect")

module.exports = {
  
  
  // method to retrieve all users in the database
  getAll: async (req,res) => {
    const { data, error } = await supabase
    .from("users")
    .select("*")
    
    res.send(data)
  }, 
  updateUserById: async (req, res) => {
    const { id } = req.params;
  
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);
  
    if (fetchError) {
      res.status(500).send(fetchError);
    } else {
      if (existingUser.length === 1) {
        const updatedUser = { ...existingUser[0], ...req.body }; // Update the user object with the new data from req.body
  
        const updatedFields = {
          name: updatedUser.name,
          address: updatedUser.address,
          email: updatedUser.email,
          phone: updatedUser.phone
        };
  
        const { data: updatedData, error: updateError } = await supabase
          .from("users")
          .update(updatedFields)
          .eq("id", id);
  
        if (updateError) {
          res.status(500).send(updateError);
        } else {
          if (updatedData && updatedData.length > 0) {
            res.send(updatedData[0]); // Return the updated user object
          } else {
            res.status(500).send("Failed to update user"); // Handle the case where the update operation did not return any data
          }
        }
      } else if (existingUser.length === 0) {
        res.status(404).send("User not found");
      } else {
        res.status(500).send("Multiple users found"); // Handle the case of multiple users with the same ID
      }
    }
  }
  
  
  
  ,
  

getUserById: async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id);

  if (error) {
    res.status(500).send(error);
  } else {
    if (data.length === 1) {
      res.send(data[0]); // Return the single user object
    } else if (data.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(500).send("Multiple users found"); // Handle the case of multiple users with the same ID
    }
  }
},
  // method to create a user in the database
  signUp: async (req,res) => {
    try{

      const { email, password, name } = req.body
      const auth = getAuth()

      // creating and storing the user in firebase auth
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user

      // inserting a row with the new user with the id that firebase returned
      const { data, error } = await supabase
      .from("users")
      .insert({
        id: user.uid,
        name: name,
        email: email,
      })
      
      res.send(user.uid)
    }

    catch(error) {
      const errorCode = error.code
      res.send(errorCode)
    }
  },

  // 2nd phase of signup
  nextSignUp: async (req,res) => {
    
    const { id, image, phone, address, role } = req.body

    const { data, error } = await supabase
    .from("users")
    .update({
      image: image, 
      phone: phone, 
      address: address,
      role: role
    })
    .eq("id", id)
    
    res.send(`updated user ${id}`)
  },

  // login function to return the id and a token
  login: async (req,res) => {
    
    try{

      const { email, password } = req.body
      const auth = getAuth()

      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user
      const id = user.uid
      const token = user.stsTokenManager.accessToken
      res.send({id, token})

    }
    catch(error){
      const errorCode = error.code
      res.send(errorCode)
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
  
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);
  
    if (error) {
      res.status(500).send(error);
    } else {
      if (data.length === 1) {
        res.send(data[0]); // Return the single user object
      } else if (data.length === 0) {
        res.status(404).send("User not found");
      } else {
        res.status(500).send("Multiple users found"); // Handle the case of multiple users with the same ID
      }
    }
  },

  // a search for users used to look for contacts in the messaging feature
  search: async (req,res) => {
    const { query } = req.query

    const { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("name", `%${query}%`)
    .limit(20)

    if(error){
      return res.send(error)
    }

    res.send(data)
  },

  // a backend function to send a reset password link to the user's email, in case the user forgot his password
  reset: async (req,res) => {

    try {
      const { email } = req.params
  
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
  
      res.send("email sent.")
    }

    catch(error){
      const errorCode = error.code
      res.send(errorCode)
    }
  },

  // backend function to change a user's password
  changePassword: async (req,res) => {

    try{
      const { currentPassword, newPassword } = req.body
  
      const user = getAuth().currentUser
      const credentials = EmailAuthProvider.credential(user.email, currentPassword)
  
      // reauthenticating the user with the credentials given
      await reauthenticateWithCredential(user, credentials)
  
      // updating the password
      await updatePassword(user, newPassword)

      res.send("password updated.")
    }
    catch(error){
      const errorCode = error.code
      res.send(errorCode)
    }
  }

}