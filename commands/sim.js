 
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'sim',
  description: 'Interact with Sim',
  usage: 'sim [your message]',
  author: 'Raniel',
  
  /**
   * Execute Gemini command
   * @param {string} senderId - User ID
   * @param {string[]} args - Command arguments
   * @param {string} pageAccessToken - Page access token
   */
  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    
    if (!prompt) {
      return sendMessage(senderId, { text: "Usage: sim <your message>" }, pageAccessToken);
    }
    
    try {
      const response = await axios.get(`https://hiroshi-api.onrender.com/other/sim?ask=${encodeURIComponent(prompt)}`);
      const geminiResponse = response.data.gemini;
      
      sendMessage(senderId, { text: geminiResponse }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error);
      sendMessage(senderId, { text: 'Error generating response. Try again later.' }, pageAccessToken);
    }
  }
};
