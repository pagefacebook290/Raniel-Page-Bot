
const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'cupid',
  description: 'Generates Cupid image',
  usage: 'cupid',
  author: 'Your Name',
  async execute(senderId, args, pageAccessToken) {
    await sendMessage(senderId, { text: 'Generating Cupid image...' }, pageAccessToken);

    try {
      const fbUserId = senderId; // Use sender's Facebook user ID
      const apiUrl = `https://api-canvass.vercel.app/cupid?userid=${fbUserId}`;
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