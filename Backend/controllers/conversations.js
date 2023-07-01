const supabase = require("../supabase/Supabase_Connect")

module.exports = {

  getMessages: async (req,res) => {
    
    const { id } = req.params

    const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("conversation", id)

    if(error){
      return res.send(error)
    }

    res.send(data)
  },

  sendMessage: async (req,res) => {

    const { sender, conversation, message } = req.body

    const { data, error } = await supabase
    .from("chats")
    .insert([{
      sender: sender,
      conversation: conversation,
      message: message
    }])

    if(error){
      return res.send(error)
    }

    // updating latest message date in conversations
    const { data: date, dateError} = await supabase
    .from("conversations")
    .update({updated_at: new Date()})
    .eq("id", conversation)

    res.send(data)
  },
  
  create: async (req,res) => {
    const { users } = req.body

    // checking if user has already created a conversation with the chosen user
    const { data: checkData, checkError } = await supabase
    .from("conversations")
    .select("*")
    .contains("users", users)

    // if there is a conversation it will return an error
    if(checkData.length){
      return res.send("conversation exists.")
    }

    const { data, error } = await supabase
    .from("conversations")
    .insert([{ users: users }])

    if(error){
      return res.send(error)
    }

    res.send(data)
  }
}
