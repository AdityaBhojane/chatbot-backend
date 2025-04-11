import Chat from "../Model/chat.js";

// POST /api/chat/new
export const startNewChat = async (req, res) => {
    try {
      const { userId, title } = req.body;
        console.log(req.body)
      const newChat = new Chat({
        user: userId,
        title: title || 'New Chat',
        conversation: []
      });
  
      await newChat.save();
  
      res.status(201).json({ message: "New chat session started", chat: newChat });
    } catch (err) {
      res.status(500).json({ message: "Error starting new chat", error: err.message });
    }
  };
  



  // POST /api/chat/:chatId/message
export const addMessageToChat = async (req, res) => {
    try {
      const { chatId } = req.params;
      const { question, response } = req.body;
  
      const chat = await Chat.findById(chatId);
      if (!chat) return res.status(404).json({ message: "Chat not found" });
  
      chat.conversation.push({ question, response });
      await chat.save();
  
      res.status(200).json({ message: "Message added", chat });
    } catch (err) {
      res.status(500).json({ message: "Error adding message", error: err.message });
    }
  };
  


  // GET /api/chat/user/:userId
export const getChatsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const chats = await Chat.find({ user: userId }).sort({ createdAt: -1 });
  
      res.status(200).json(chats);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving chats", error: err.message });
    }
  };

export const getChatsById = async (req, res) => {
    try {
      const { id } = req.params;
      const chats = await Chat.find({_id:id}).sort({ createdAt: -1 });
      res.status(200).json(chats);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving chats", error: err.message });
    }
  };
  