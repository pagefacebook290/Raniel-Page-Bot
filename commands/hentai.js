const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'hentai',
  description: 'Send a random hentai image.',
  author: 'Raniel',

  async execute(senderId, args, pageAccessToken) {
    try {
      const apiUrl = 'https://kaiz-apis.gleeze.com/api/hentai?limit=1';
      const response = await axios.get(apiUrl);

      if (response.data && response.data.result && response.data.result.length > 0) {
        const imageUrl = response.data.result[0];

        // Send image attachment only
        const imageMessage = {
          attachment: {
            type: 'image',
            payload: {
              url: imageUrl,
            },
          },
        };
        await sendMessage(senderId, imageMessage, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: '⚠️ Walang nahanap na hentai image. Subukan muli mamaya.',
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error fetching hentai image:', error.message);
      await sendMessage(senderId, {
        text: '⚠️ May error habang kinukuha ang hentai image. Subukan ulit mamaya.',
      }, pageAccessToken);
    }
  },
};
