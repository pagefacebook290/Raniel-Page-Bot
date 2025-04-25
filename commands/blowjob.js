const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'blowjob',
  description: 'Get a random blowjob image.',
  author: 'Raniel', 
  
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const response = await axios.get('https://kaiz-apis.gleeze.com/api/blowjob');
      const imageUrl = response.data?.url;

      if (!imageUrl) {
        throw new Error('Walang image na nakuha mula sa API.');
      }

      await sendMessage(senderId, {
        attachment: {
          type: 'image',
          payload: {
            url: imageUrl,
            is_reusable: true
          }
        }
      }, pageAccessToken);

    } catch (error) {
      console.error('Error fetching blowjob image:', error);
      await sendMessage(senderId, {
        text: 'May error habang kinukuha ang image. Paki-try ulit mamaya.'
      }, pageAccessToken);
    }
  }
};
