const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'bible',
  description: 'Get a random Bible verse',
  usage: 'bible',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    try {
      const { data } = await axios.get('https://kaiz-apis.gleeze.com/api/bible', {
        params: {
          apikey: '72f8161d-50d4-4177-a3b4-bd6891de70ef'
        }
      });

      if (data?.result) {
        await sendMessage(senderId, {
          text: `📖 *${data.result.reference}*\n\n${data.result.text}`,
        }, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: "❌ Failed to retrieve a verse.",
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Bible API error:', error.message);
      await sendMessage(senderId, {
        text: "⚠️ Error fetching random verse. Try again later.",
      }, pageAccessToken);
    }
  }
};
