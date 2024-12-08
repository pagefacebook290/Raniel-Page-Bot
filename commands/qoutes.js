
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'quote',
  description: 'Get a random quote',
  usage: 'quote',
  author: 'coffee',

  /**
   * Execute Quote command
   * @param {string} senderId - User ID
   * @param {string[]} args - Command arguments
   * @param {string} pageAccessToken - Page access token
   */
  async execute(senderId, args, pageAccessToken) {
    try {
      const response = await axios.get('https://api.joshweb.click/quotes');
      const quoteData = response.data;
      
      const quoteText = quoteData.quote;
      const quoteAuthor = quoteData.author;
      
      const message = `"${quoteText}" - ${quoteAuthor}`;
      
      sendMessage(senderId, { text: message }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error);
      sendMessage(senderId, { text: 'Error fetching quote. Try again later.' }, pageAccessToken);
    }
  }
};
