import express from 'express';
import {
  startNewChat,
  addMessageToChat,
  getChatsByUserId,
  getChatsById
} from '../Controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.post('/new', startNewChat);                       
chatRouter.post('/:chatId/message', addMessageToChat);       
chatRouter.get('/user/:userId', getChatsByUserId);          
chatRouter.get('/:id', getChatsById);          

export default chatRouter;

