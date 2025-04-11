import express from 'express';
import {
  startNewChat,
  addMessageToChat,
  getChatsByUserId
} from '../Controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.post('/new', startNewChat);                       
chatRouter.post('/:chatId/message', addMessageToChat);       
chatRouter.get('/user/:userId', getChatsByUserId);          

export default chatRouter;

