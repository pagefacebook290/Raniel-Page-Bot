const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'quotes',
  description: 'Get a random quotes',
  usage: 'quotes',
  author: 'Raniel',

  /**
   * Execute Quote command
   * @param {string} senderId - User ID
   * @param {string[]} args - Command arguments
   * @param {string} pageAccessToken - Page access token
   */
  async execute(senderId, args, pageAccessToken) {
    try {
      // Set the API key
      const apikey = 'l9XyRltWQxQyajzNuoIaow==CjHbxrmBpwHyJtHt';

      // Make the request with API key in the header
      const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
        headers: { 'X-Api-Key': apikey },
      });

      // Check if the response has a quote
      if (response.data && response.data.length > 0) {
        const quoteData = response.data[0]; // Assuming the API returns an array
        const quoteText = quoteData.quote;
        const quoteAuthor = quoteData.author;

        // Construct the message
        const message = `"${quoteText}" - ${quoteAuthor}`;

        // Send the message
        await sendMessage(senderId, { text: message }, pageAccessToken);
      } else {
        // In case no quote is found
        sendMessage(senderId, { text: 'Sorry, no quote found. Try again later.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error:', error);
      sendMessage(senderId, { text: 'Error fetching quote. Try again later.' }, pageAccessToken);
    }
  }
};
