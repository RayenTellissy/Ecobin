const supabase = require("../supabase/Supabase_Connect")

module.exports = {
  
  // backend function to get all conversations of a certain user
  getContacts: async (req,res) => {

    const { id } = req.params
    
    // fetching all conversations of the user
    const { data: conversations, error } = await supabase
    .from('conversations')
    .select('id, users')
    .contains('users', [id])
    .order("updated_at", { ascending: false })

    if(error){
      return res.send(error)
    }

    // formatting the response to return only the conversation id and the id of the other user

    const contacts = [] // contacts array that will be used in the response

    for(const conversation of conversations){
      // picking out of the array the id of the user that is not the current user
      const userId = conversation.users.find(user => user !== id) 

      // fetching latest chat message details
      const { data: chats, err } = await supabase
      .from("chats")
      .select("created_at, message")
      .eq("conversation", conversation.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

      if(err){
        return res.send(err)
      }

      // fetching the other user's data in the conversation
      const { data, error } = await supabase
      .from("users")
      .select("name, image")
      .eq("id", userId)
      .single()

      if(error){ 
        return res.send(error)
      }

      // pushing all the data fetched
      contacts.push({
        id: conversation.id,
        user: data,
        chat: !chats ? "" : chats
      })
    }

    res.send(contacts)
  },

}