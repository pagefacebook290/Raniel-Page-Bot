
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'gpt4',
  description: 'Interact with GPT-4 AI',
  usage: 'gpt4 [query]',
  author: 'coffee',

  /**
   * Execute GPT-4 command
   * @param {string} senderId - User ID
   * @param {string[]} args - Command arguments
   * @param {string} pageAccessToken - Page access token
   */
  async execute(senderId, args, pageAccessToken) {
    const query = args.join(' ');
    const uid = 'YOUR_UID'; // Replace with your User ID

    if (!query) {
      return sendMessage(senderId, { text: "Usage: gpt4 <query>" }, pageAccessToken);
    }

    try {
      const response = await axios.get(`https://api.joshweb.click/api/gpt-4o?q=${encodeURIComponent(query)}&uid=${uid}`);
      const responseText = response.data;

      sendMessage(senderId, { text: responseText }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error);
      sendMessage(senderId, { text: 'Error generating response. Try again later.' }, pageAccessToken);
    }
  }
};
