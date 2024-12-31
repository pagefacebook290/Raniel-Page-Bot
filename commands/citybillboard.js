const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'citybillboard',
  description: 'Generates city billboard image',
  usage: 'citybillboard',
  author: 'Your Name',
  async execute(senderId, args, pageAccessToken) {
    await sendMessage(senderId, { text: 'Generating city billboard...' }, pageAccessToken);

    try {
      const fbLink = 'https://www.facebook.com/USER_ID'; // Replace USER_ID
      const fbUserId = fbLink.split('/').pop();
      const apiUrl = `https://api-canvass.vercel.app/city-billboard?userid=${fbUserId}`;
      const response = await axios.get(apiUrl);
      const imageUrl = response.data.image;

      await sendMessage(senderId, {
        attachment: {
          type: 'image',
          payload: { url: imageUrl }
        }
      }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.message);
      await sendMessage(senderId, { text: 'Failed to generate image. Try again later.' }, pageAccessToken);
    }
  }
};