const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'fbdown',
  description: 'Download Facebook video',
  usage: 'fbdownloader <video link>',
  author: 'Rized',
  execute: async (senderId, args) => {
    const pageAccessToken = token;
    const videoLink = args.join(' ');

    if (!videoLink) {
      return sendMessage(senderId, { text: 'Usage: fbdownloader <video link>' }, pageAccessToken);
    }

    const apiUrl = `https://betadash-search-download.vercel.app/fbdl?url=${encodeURIComponent(videoLink)}`;

    try {
      const response = await axios.get(apiUrl);
      const videoUrl = response.data;

      if (!videoUrl) {
        return sendMessage(senderId, { text: 'Failed to retrieve video.' }, pageAccessToken);
      }

      const videoMessage = {
        attachment: {
          type: 'video',
          payload: {
            url: videoUrl,
            is_reusable: true
          }
        }
      };

      await sendMessage(senderId, { text: `Downloading...` }, pageAccessToken);
      await sendMessage(senderId, videoMessage, pageAccessToken);
    } catch (error) {
      console.error('Error:', error.message);
      sendMessage(senderId, { text: 'An error occurred. Try again later.' }, pageAccessToken);
    }
  }
};