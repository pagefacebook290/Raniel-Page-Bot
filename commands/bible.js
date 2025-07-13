const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'bible',
  description: 'Get a random Bible verse or search by reference',
  usage: 'bible [book chapter:verse]',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    const query = args.join(' ');

    try {
      const params = {
        apikey: '8c0a049d-29a8-474a-b15e-189e42e150fb',
      };

      // Include search if user provided a query
      if (query) {
        params.search = query;
      }

      const response = await axios.get('https://kaiz-apis.gleeze.com/api/bible', { params });
      const data = response.data;

      if (data && data.result && data.result.text) {
        await sendMessage(senderId, {
          text: `📖 *${data.result.reference}*\n\n${data.result.text}`,
        }, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: `❌ No verse found. You searched: "${query || 'random'}". Please check the input or try again.`,
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
