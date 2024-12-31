
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'citybillboard',
  usage: 'citybillboard',
  description: 'Get city billboards.',
  author: 'Raniel',
  async execute(senderId, args, pageAccessToken) {
    try {
      // Construct API URL
      const apiUrl = 'https://api-canvass.vercel.app/city-billboard?userid=4';

      // Fetch billboard data
      const response = await axios.get(apiUrl);
      const billboardData = response.data;

      // Send billboard image
      const message = `Sending city billboard...`;
      await sendMessage(senderId, { text: message }, pageAccessToken);
      const billboardMessage = {
        attachment: {
          type: 'image',
          payload: {
            url: billboardData.image,
          },
        },
      };
      await sendMessage(senderId, billboardMessage, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.message);
      sendMessage(senderId, { text: 'Sorry, Oten. There was an error fetching the billboard.' }, pageAccessToken);
    }
  },
};