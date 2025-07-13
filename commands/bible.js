const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'bible',
  description: 'Search Bible verses or passages',
  usage: 'bible [verse or passage]',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    const query = args.join(' ');
    if (!query) {
      return sendMessage(senderId, {
        text: "Usage: bible <book chapter:verse>\n\nExample: bible John 3:16",
      }, pageAccessToken);
    }

    try {
      const response = await axios.get('https://kaiz-apis.gleeze.com/api/bible?', {
        params: {
          apikey: '8c0a049d-29a8-474a-b15e-189e42e150fb',
          search: query
        }
      });

      const data = response.data;

      if (data && data.result) {
        await sendMessage(senderId, {
          text: `📖 *${data.result.reference}*\n\n${data.result.text}`,
        }, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: "❌ No verse found. Please check your input and try again.",
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Bible API error:', error.message);
      await sendMessage(senderId, {
        text: "⚠️ An error occurred while fetching the verse. Please try again later.",
      }, pageAccessToken);
    }
  }
};
